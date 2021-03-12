- [前言](#前言)
- [热更新实现原理](#热更新实现原理)
  - [1\. webpack-dev-server启动本地服务](#1-webpack-dev-server启动本地服务)
  - [2\. 修改webpack.config.js的entry配置](#2-修改webpackconfigjs的entry配置)
  - [3\. 监听webpack编译结束](#3-监听webpack编译结束)
  - [4\. webpack监听文件变化](#4-webpack监听文件变化)
  - [5\. 浏览器接收到热更新的通知](#5-浏览器接收到热更新的通知)
  - [6\. HotModuleReplacementPlugin](#6-hotmodulereplacementplugin)
  - [7\. moudle.hot.check 开始热更新](#7-moudlehotcheck-开始热更新)
  - [8\. hotApply 热更新模块替换](#8-hotapply-热更新模块替换)
    - [①删除过期的模块，就是需要替换的模块](#删除过期的模块就是需要替换的模块)
    - [②将新的模块添加到 modules 中](#将新的模块添加到-modules-中)
    - [③通过\_\_webpack\_require__执行相关模块的代码](#通过__webpack_require__执行相关模块的代码)
- [总结](#总结)
- [写在最后](#写在最后)
- [参考链接](#参考链接)
- [原文](#原文)

## 前言

>Hot Module Replacement，简称HMR，无需完全刷新整个页面的同时，更新模块。HMR的好处，在日常开发工作中体会颇深：节省宝贵的开发时间、提升开发体验。

通常我们可以通过 `HotModuleReplacementPlugin` 或 启动指令增加参数 `--hot` 来启用热更新。

如果不关心细节只想知道热更新的大概流程，请直接拉到文章末尾 `总结` 。

**HMR是如何实现热更新的呢？下面一步步拆分介绍**

## 热更新实现原理

### 1\. webpack-dev-server启动本地服务

我们根据`webpack-dev-server`的`package.json`中的`bin`命令，可以找到命令的入口文件`bin/webpack-dev-server.js`。

```javascript
  // node_modules/webpack-dev-server/bin/webpack-dev-server.js
  
  // 生成webpack编译主引擎 compiler
  let compiler = webpack(config);
  
  // 启动本地服务
  let server = new Server(compiler, options, log);
  server.listen(options.port, options.host, (err) => {
      if (err) {throw err};
  });
```
本地服务代码：
```javascript
    // node_modules/webpack-dev-server/lib/Server.js
    class Server {
        constructor() {
            this.setupApp();
            this.createServer();
        }
        
        setupApp() {
            // 依赖了express
        	this.app = new express();
        }
        
        createServer() {
            this.listeningApp = http.createServer(this.app);
        }
        listen(port, hostname, fn) {
            return this.listeningApp.listen(port, hostname, (err) => {
                // 启动express服务后，启动websocket服务
                this.createSocketServer();
            }
        }                                   
    }
```
这一小节代码主要做了三件事：

*   启动`webpack`，生成`compiler`实例。`compiler`上有很多方法，比如可以启动 `webpack` 所有**编译**工作，以及**监听**本地文件的变化。
*   使用`express`框架启动本地`server`，让浏览器可以请求本地的**静态资源**。
*   本地`server`启动之后，再去启动`websocket`服务，如果不了解`websocket`，建议简单了解一下[websocket速成](https://www.ruanyifeng.com/blog/2017/05/websocket.html)。通过`websocket`，可以建立本地服务和浏览器的双向通信。这样就可以实现当本地文件发生变化，立马告知浏览器可以热更新代码啦！

上述代码主要干了三件事，但是源码在启动服务前又做了很多事，接下来便看看`webpack-dev-server/lib/Server.js`还做了哪些事？

### 2\. 修改webpack.config.js的entry配置

启动本地服务前，调用了`updateCompiler(this.compiler)`方法。这个方法中有 2 段关键性代码。一个是获取`websocket`客户端代码路径，另一个是根据配置获取`webpack`热更新代码路径。
```javascript
    // 获取websocket客户端代码
    const clientEntry = `${require.resolve(
        '../../client/'
    )}?${domain}${sockHost}${sockPath}${sockPort}`;
    
    // 根据配置获取热更新代码
    let hotEntry;
    if (options.hotOnly) {
        hotEntry = require.resolve('webpack/hot/only-dev-server');
    } else if (options.hot) {
        hotEntry = require.resolve('webpack/hot/dev-server');
    }
```

修改后的`webpack`入口配置如下：
```javascript
    // 修改后的entry入口
    { entry:
        { index: 
            [
                // 上面获取的clientEntry
                'xxx/node_modules/webpack-dev-server/client/index.js?http://localhost:8080',
                // 上面获取的hotEntry
                'xxx/node_modules/webpack/hot/dev-server.js',
                // 开发配置的入口
                './src/index.js'
        	],
        },
    }      
```

为什么要新增了 2 个文件？在入口默默增加了 2 个文件，那就意味会一同打包到`bundle`文件中去，也就是线上运行时。

**（1）webpack-dev-server/client/index.js**

首先这个文件用于`websocket`的，因为`websoket`是双向通信，如果不了解`websocket`，建议简单了解一下[websocket速成](https://www.ruanyifeng.com/blog/2017/05/websocket.html)。我们在第 1 步 `webpack-dev-server`初始化 的过程中，启动的是本地服务端的`websocket`。那客户端也就是我们的浏览器，浏览器还没有和服务端通信的代码呢？总不能让开发者去写吧hhhhhh。因此我们需要把`websocket`客户端通信代码偷偷塞到我们的代码中。客户端具体的代码后面会在合适的时机细讲哦。

**（2）webpack/hot/dev-server.js**

这个文件主要是用于检查更新逻辑的，这里大家知道就好，代码后面会在合适的时机（**第5步**）细讲。

### 3\. 监听webpack编译结束

修改好入口配置后，又调用了`setupHooks`方法。这个方法是用来注册监听事件的，监听每次`webpack`编译完成。
```javascript
    // node_modules/webpack-dev-server/lib/Server.js
    // 绑定监听事件
    setupHooks() {
        const {done} = compiler.hooks;
        // 监听webpack的done钩子，tapable提供的监听方法
        done.tap('webpack-dev-server', (stats) => {
            this._sendStats(this.sockets, this.getStats(stats));
            this._stats = stats;
        });
    };
```

当监听到一次`webpack`编译结束，就会调用`_sendStats`方法通过`websocket`给浏览器发送通知，`ok`和`hash`事件，这样浏览器就可以拿到最新的`hash`值了，做检查更新逻辑。
```javascript
    // 通过websoket给客户端发消息
    _sendStats() {
        this.sockWrite(sockets, 'hash', stats.hash);
        this.sockWrite(sockets, 'ok');
    }
```

### 4\. webpack监听文件变化

每次修改代码，就会触发编译。说明我们还需要监听本地代码的变化，主要是通过`setupDevMiddleware`方法实现的。

这个方法主要执行了`webpack-dev-middleware`库。很多人分不清`webpack-dev-middleware`和`webpack-dev-server`的区别。其实就是因为`webpack-dev-server`只负责启动服务和前置准备工作，所有文件相关的操作都抽离到`webpack-dev-middleware`库了，主要是本地文件的**编译**和**输出**以及**监听**，无非就是职责的划分更清晰了。

那我们来看下`webpack-dev-middleware`源码里做了什么事:
```javascript
    // node_modules/webpack-dev-middleware/index.js
    compiler.watch(options.watchOptions, (err) => {
        if (err) { /*错误处理*/ }
    });
    
    // 通过“memory-fs”库将打包后的文件写入内存
    setFs(context, compiler); 
```

（1）调用了`compiler.watch`方法，在第 1 步中也提到过，`compiler`的强大。这个方法主要就做了 2 件事：

*   首先对本地文件代码进行编译打包，也就是`webpack`的一系列编译流程。
*   其次编译结束后，开启对本地文件的监听，当文件发生变化，重新编译，编译完成之后继续监听。

为什么代码的改动保存会自动编译，重新打包？这一系列的重新检测编译就归功于`compiler.watch`这个方法了。监听本地文件的变化主要是通过**文件的生成时间**是否有变化，这里就不细讲了。

（2）执行`setFs`方法，这个方法主要目的就是将编译后的文件打包到内存。这就是为什么在开发的过程中，你会发现`dist`目录没有打包后的代码，因为都在内存中。原因就在于访问内存中的代码比访问文件系统中的文件更快，而且也减少了代码写入文件的开销，这一切都归功于`memory-fs`。

### 5\. 浏览器接收到热更新的通知

我们已经可以监听到文件的变化了，当文件发生变化，就触发重新编译。同时还监听了每次编译结束的事件。当监听到一次`webpack`编译结束，`_sendStats`方法就通过`websoket`给浏览器发送通知，检查下是否需要热更新。下面重点讲的就是`_sendStats`方法中的`ok`和`hash`事件都做了什么。

那浏览器是如何接收到`websocket`的消息呢？回忆下第 2 步骤增加的入口文件，也就是`websocket`客户端代码。

    'xxx/node_modules/webpack-dev-server/client/index.js?http://localhost:8080'
    

这个文件的代码会被打包到`bundle.js`中，运行在浏览器中。来看下这个文件的核心代码吧。
```javascript
    // webpack-dev-server/client/index.js
    var socket = require('./socket');
    var onSocketMessage = {
        hash: function hash(_hash) {
            // 更新currentHash值
            status.currentHash = _hash;
        },
        ok: function ok() {
            sendMessage('Ok');
            // 进行更新检查等操作
            reloadApp(options, status);
        },
    };
    // 连接服务地址socketUrl，?http://localhost:8080，本地服务地址
    socket(socketUrl, onSocketMessage);
    
    function reloadApp() {
    	if (hot) {
            log.info('[WDS] App hot update...');
            
            // hotEmitter其实就是EventEmitter的实例
            var hotEmitter = require('webpack/hot/emitter');
            hotEmitter.emit('webpackHotUpdate', currentHash);
        } 
    }
```

`socket`方法建立了`websocket`和服务端的连接，并注册了 2 个监听事件。

*   `hash`事件，更新最新一次打包后的`hash`值。
*   `ok`事件，进行热更新检查。

热更新检查事件是调用`reloadApp`方法。比较奇怪的是，这个方法又利用`node.js`的`EventEmitter`，发出`webpackHotUpdate`消息。这是为什么？为什么不直接进行检查更新呢？

个人理解就是为了更好的维护代码，以及职责划分的更明确。`websocket`仅仅用于客户端（浏览器）和服务端进行通信。而真正做事情的活还是交回给了`webpack`。

那`webpack`怎么做的呢？再来回忆下第 2 步。入口文件还有一个文件没有讲到，就是：

    'xxx/node_modules/webpack/hot/dev-server.js'
    

这个文件的代码同样会被打包到`bundle.js`中，运行在浏览器中。这个文件做了什么就显而易见了吧！先瞄一眼代码：
```javascript
    // node_modules/webpack/hot/dev-server.js
    var check = function check() {
        module.hot.check(true)
            .then(function(updatedModules) {
                // 容错，直接刷新页面
                if (!updatedModules) {
                    window.location.reload();
                    return;
                }
                
                // 热更新结束，打印信息
                if (upToDate()) {
                    log("info", "[HMR] App is up to date.");
                }
        })
            .catch(function(err) {
                window.location.reload();
            });
    };
    
    var hotEmitter = require("./emitter");
    hotEmitter.on("webpackHotUpdate", function(currentHash) {
        lastHash = currentHash;
        check();
    });
```

这里`webpack`监听到了`webpackHotUpdate`事件，并获取最新了最新的`hash`值，然后终于进行检查更新了。检查更新呢调用的是`module.hot.check`方法。那么问题又来了，`module.hot.check`又是哪里冒出来了的！答案是`HotModuleReplacementPlugin`搞得鬼。这里留个疑问，继续往下看。

### 6\. HotModuleReplacementPlugin

前面好像一直是`webpack-dev-server`做的事，那`HotModuleReplacementPlugin`在热更新过程中又做了什么伟大的事业呢？

首先你可以对比下，配置热更新和不配置时`bundle.js`的区别。内存中看不到？直接执行`webpack`命令就可以看到生成的`bundle.js`文件啦。不要用`webpack-dev-server`启动就好了。

（1）没有配置的。

![](https://user-gold-cdn.xitu.io/2019/12/1/16ec0c9e8fd12349?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

（2）配置了`HotModuleReplacementPlugin`或`--hot`的。

![](https://user-gold-cdn.xitu.io/2019/12/1/16ec0c90092fa0ac?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

哦~ 我们发现`moudle`新增了一个属性为`hot`，再看`hotCreateModule`方法。 这不就找到`module.hot.check`是哪里冒出来的。

![](https://user-gold-cdn.xitu.io/2019/12/1/16ec0dc36018973f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

经过对比打包后的文件，`__webpack_require__`中的`moudle`以及代码行数的不同。我们都可以发现`HotModuleReplacementPlugin`原来也是默默的塞了很多代码到`bundle.js`中呀。这和第 2 步骤很是相似哦！为什么，因为检查更新是在浏览器中操作呀。这些代码必须在运行时的环境。

你也可以直接看浏览器`Sources`下的代码，会发现`webpack`和`plugin`偷偷加的代码都在哦。在这里调试也很方便。

`HotModuleReplacementPlugin`如何做到的？这里我就不讲了，因为这需要你对`tapable`以及`plugin`机制有一定了解，可以看下我写的文章[Webpack插件机制之Tapable-源码解析](https://juejin.im/post/6844904004435050503)。当然你也可以选择跳过，只关心热更新机制即可，毕竟信息量太大。

### 7\. moudle.hot.check 开始热更新

通过第 6 步，我们就可以知道`moudle.hot.check`方法是如何来的啦。那都做了什么？之后的源码都是`HotModuleReplacementPlugin`塞入到`bundle.js`中的哦，我就不写文件路径了。

*   利用上一次保存的`hash`值，调用`hotDownloadManifest`发送`xxx/hash.hot-update.json`的`ajax`请求；
*   请求结果获取热更新模块，以及下次热更新的`Hash` 标识，并进入热更新准备阶段。
```javascript
    hotAvailableFilesMap = update.c; // 需要更新的文件
    hotUpdateNewHash = update.h; // 更新下次热更新hash值
    hotSetStatus("prepare"); // 进入热更新准备状态
```

*   调用`hotDownloadUpdateChunk`发送`xxx/hash.hot-update.js` 请求，通过`JSONP`方式。
```javascript
    function hotDownloadUpdateChunk(chunkId) {
        var script = document.createElement("script");
        script.charset = "utf-8";
        script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
        if (null) script.crossOrigin = null;
        document.head.appendChild(script);
     }
```

这个函数体为什么要单独拿出来，因为这里要解释下为什么使用`JSONP`获取最新代码？主要是因为`JSONP`获取的代码可以直接执行。为什么要直接执行？我们来回忆下`/hash.hot-update.js`的代码格式是怎么样的。

新编译后的代码是在一个`webpackHotUpdate`函数体内部的。也就是要立即执行`webpackHotUpdate`这个方法。

再看下`webpackHotUpdate`这个方法。
```javascript
    window["webpackHotUpdate"] = function (chunkId, moreModules) {
        hotAddUpdateChunk(chunkId, moreModules);
    } ;
```

*   `hotAddUpdateChunk`方法会把更新的模块`moreModules`赋值给全局全量`hotUpdate`。
*   `hotUpdateDownloaded`方法会调用`hotApply`进行代码的替换。
```javascript
    function hotAddUpdateChunk(chunkId, moreModules) {
        // 更新的模块moreModules赋值给全局全量hotUpdate
        for (var moduleId in moreModules) {
            if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
    	    hotUpdate[moduleId] = moreModules[moduleId];
            }
        }
        // 调用hotApply进行模块的替换
        hotUpdateDownloaded();
    }
```

### 8\. hotApply 热更新模块替换

热更新的核心逻辑就在`hotApply`方法了。 `hotApply`代码有将近 400 行，还是挑重点讲了

#### ①删除过期的模块，就是需要替换的模块

通过`hotUpdate`可以找到旧模块
```javascript
var queue = outdatedModules.slice();
while (queue.length > 0) {
    moduleId = queue.pop();
    // 从缓存中删除过期的模块
    module = installedModules[moduleId];
    // 删除过期的依赖
    delete outdatedDependencies[moduleId];
    
    // 存储了被删掉的模块id，便于更新代码
    outdatedSelfAcceptedModules.push({
        module: moduleId
    });
}
```

#### ②将新的模块添加到 modules 中
```javascript
appliedUpdate[moduleId] = hotUpdate[moduleId];
for (moduleId in appliedUpdate) {
    if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
        modules[moduleId] = appliedUpdate[moduleId];
    }
}
```

#### ③通过\_\_webpack\_require__执行相关模块的代码
```javascript
    for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
        var item = outdatedSelfAcceptedModules[i];
        moduleId = item.module;
        try {
            // 执行最新的代码
            __webpack_require__(moduleId);
        } catch (err) {
            // ...容错处理
        }
    }
```
    

`hotApply`的确比较复杂，知道大概流程就好了，这一小节，要求你对webpack打包后的文件如何执行的有一些了解，大家可以自去看下。

## 总结

**webpack热更新原理概述**

分为两大步骤来实现

第一步：启动一个本地服务运行webpack。

第二步：增加打包入口配置，打包bundle文件并在浏览器上运行。

1. webpack通过compiler.watch方法监听文件改动，并用compiler实例编译相关文件
2. webpack同时会监听编译完成的钩子，在回调中通过websocket发送消息到浏览器，通知浏览器更新资源。
3. 浏览器收到消息后发起请求获取新资源，删除旧的资源，将新资源添加到modules上，最后利用__webpack_require__执行新资源代码

**具体实现步骤**

- 一、使用webpack-dev-server启动本地服务
    1. 启动webpack生成compiler实例，compiler主要用于监听本地文件变化和编译工作
    2. 启动本地服务，让浏览器可访问本地静态资源，主要依赖express库
    3. 启动websocket服务，建立浏览器和本地服务的双向通信

- 二、监听编译结束
    1. 利用`compiler.hooks`提供的`done`钩子来监听编译结束
    2. 利用websocket通知浏览器编译结束，并传递新的hash值，浏览器做检查更新逻辑

- 三、使用webpack-dev-middleware库编译、输出、监听本地文件
    1. 调用`compiler.watch`方法，对本地代码进行编译，结束后开启对本地文件的监听，当文件发生变化，重新编译，编译完成后继续监听
    2. 代码编译后，会使用memory-fs库将编译好的文件存放在内存中，这是因为访问内存中的代码比访问系统文件更快，同时也减少了写入文件的开销

- 四、浏览器接收热更新通知
    1. webpack会在entry增加入口，打包webpack运行时代码到`bundle.js`中，该部分代码运行在浏览器
    2. bundle.js代码就是将HotModuleReplacementPlugin插件的代码塞进去
    3. 浏览器通过bundle.js发送ajax请求，请求需要更新的文件和hash值
    4. 通过HotModuleReplacementPlugin中的hotApply方法实现热更新模块替换。主要流程：删除过期模块、将新的模块添加module中、使用__webpack_require__执行相关模块代码

下面是以阅读源码的形式画的图，①-④的小标记，是文件发生变化的一个流程。

![](https://user-gold-cdn.xitu.io/2019/12/1/16ec13499800dfce?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 写在最后

本次是以阅读源码的方式讲解原理，是因为觉得热更新这块涉及的知识量比较多。所以知识把关键性代码拿出来，因为每一个块细节说起来都能写一篇文章了，大家可以自己对着源码再理解下。

还是建议提前了解以下知识会更好理解热更新：

*   **websocket**：[websocket基础知识了解](https://www.ruanyifeng.com/blog/2017/05/websocket.html)
*   打包后的`bundle`文件如何运行的。
*   `webpack`启动流程，`webpack`生命周期。
*   **tapable**: [Webpack插件机制之Tapable-源码解析](https://juejin.im/post/6844904004435050503)

参考链接
----

*   [Webpack Hot Module Replacement 的原理解析](https://github.com/Jocs/jocs.github.io/issues/15)
*   [看完这篇，面试再也不怕被问 Webpack 热更新](https://juejin.im/post/6844903953092591630)

原文
----

https://juejin.cn/post/6844904008432222215#heading-0