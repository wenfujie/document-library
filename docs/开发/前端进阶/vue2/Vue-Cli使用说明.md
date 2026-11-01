<!--
 * @Date: 2021-11-11 09:59:12
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-11-12 11:17:33
-->

- [前言](#前言)
  - [关闭 eslint 校验](#关闭-eslint-校验)
  - [打包多页面](#打包多页面)
  - [devServer.proxy 解决本地开发跨域](#devserverproxy-解决本地开发跨域)
  - [使用 optimization.splitChunks 分包](#使用-optimizationsplitchunks-分包)
    - [理解 chunks](#理解-chunks)
    - [理解 maxInitialRequests](#理解-maxinitialrequests)
    - [理解 maxAsyncRequests](#理解-maxasyncrequests)
    - [理解 minChunks](#理解-minchunks)
    - [理解 minSize](#理解-minsize)
    - [理解 cache groups](#理解-cache-groups)
    - [将组件库 element-ui 分割](#将组件库-element-ui-分割)

# 前言
[Vue Cli 官方文档](https://cli.vuejs.org/zh/)写的很好了，本文仅提取比较重要的一些配置进行详细些的说明。

## 关闭 eslint 校验

```js
// vue.config.js
module.exports = {
  lintOnSave: false
}
```

## 打包多页面
```js
// vue.config.js

module.exports = {
	...
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html"
    },
    // 增加英文页面打包
    en: {
      entry: "public/common.js",
      template: "public/en.html",
      filename: "en.html"
    }
  }
  ...
};
```

## devServer.proxy 解决本地开发跨域

```js
module.exports = {
  devServer: {
    proxy: {
      // 请求地址匹配到 "/activity/v1/" 时，替换host为 target
      // 修改请求头的 host 为 target（仅服务器才能看到）
      "/activity/v1/": {
        target: "http://192.168.5.200:31282/",
        changeOrigin: true
      }
    }
  }
```

## 使用 optimization.splitChunks 分包

`splitChunks` 主要用于去重和分离 chunk 。

`splitChunks` 拥有默认配置：

```js
splitChunks: {
    // 表示选择哪些 chunks 进行分割，可选值有：async，initial和all
    chunks: "async",
    // 表示新分离出的chunk必须大于等于minSize，默认为30000，约30kb。
    minSize: 30000,
    // 用于界定至少重复多少次的模块才会被提取。默认为1。
    minChunks: 1,
    // 表示按需加载文件时，并行请求的最大数目。默认为5。
    maxAsyncRequests: 5,
    // 表示加载入口文件时，并行请求的最大数目。默认为3。
    maxInitialRequests: 3,
    // 表示拆分出的chunk的名称连接符。默认为~。如chunk~vendors.js
    automaticNameDelimiter: '~',
    // 设置chunk的文件名。默认为true。当为true时，splitChunks基于chunk和cacheGroups的key自动命名。
    name: true,
    // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块，就分配到该组。模块可以被多个组引用，但最终会根据priority来决定打包到哪个组中。默认将所有来自 node_modules目录的模块打包至vendors组，将两个以上的chunk所共享的模块打包至default组。
    cacheGroups: {
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
        },
        //
    default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
        }
    }
}
```

### 理解 chunks

`chunks: "async"` 表示分离动态引入的代码，一般我们采用 `import()` 实现。

**我们看下具体效果**

先在 about.vue 页面添加异步代码，

```js
  // about.vue
  async mounted() {
    const _ = await import('loadsh')
    console.log(_.chunk(["a", "b", "c", "d"], 2), "=====");
  }
```

执行 `npm run build` 进行打包

入口文件会打一个文件：dist/js/app.cdf71e7f.js 。

由于配置了 `cacheGroups.vendors` ，并且 `test` 为 `/[\\/]node_modules[\\/]/` ，所以 node_modules 下的相关依赖会打一个文件：dist/js/chunk-vendors.13f7e9b8.js

异步加载的代码 `import('loadsh')` 会独立打一个文件：`dist/js/chunk-2d0dae77.7c80b53f.js` ，里头包含 loadsh 代码。

### 理解 maxInitialRequests

maxInitialRequests 表示初始化时最大请求数，分包前会判断若分包后后是否会超过初始化最大请求数，如果超过是不会继续分包的。

在入口文件 main.js 输入代码：

```js
import "vue";
```

并且执行 `npm run build` ，可看到打包目录如下

```js
dist
  |_js
     |_app.c2f85149.js
     |_chunk-vendors.53220558.js
```

在初始化页面时会同时请求 `app.c2f85149.js` 和 `chunk-vendors.53220558.js` 所以初始化最大请求数为 2 。

修改 vue.config.js 配置

```js
module.exports = {
    optimization: {
      splitChunks: {
        maxInitialRequests: 1
      }
    }
  }
};
```

设置了 maxInitialRequests ，限制了初始化最大请求数为 1 。

打包目录：

```js
dist | _js | _app.c2f85149.js;
```

可以看到仅剩一个入口 app 的文件，这是因为如果额外再打一个 vendors 文件，那初始化页面就必须要发起两个请求，违反了 maxInitialRequests 的限制。

### 理解 maxAsyncRequests

maxAsyncRequests 表示最大并行请求数。

修改代码

```js
// main.js

import("./a");
```

```js
// a.js

import "vue";
console.log("a");
```

打包后目录

```js
dist/js/chunk-vendors.53eb89b1.js     30.25 KiB
dist/js/app.54e638fb.js               2.46 KiB
dist/js/chunk-2d0dae77.8e321018.js    0.14 KiB
```

修改 vue.config.js 配置

```js
module.exports = {
    optimization: {
      splitChunks: {
        maxAsyncRequests: 1
      }
    }
  }
};
```

打包后目录

```js
dist/js/chunk-vendors.53eb89b1.js     30.25 KiB
dist/js/app.54e638fb.js               2.46 KiB
```

异步代码不再单独打包，因为会超过最大并发请求数。

### 理解 minChunks

minChunks 用于界定至少重复多少次的模块才会被提取。默认为 1。

### 理解 minSize

过滤掉大小小于 minSize 的代码块。

### 理解 cache groups

cacheGroups 继承 splitChunks 的所有属性并且可以覆盖它，它还有自己的特有属性：`test、priority 、reuseExistingChunk` 。

通过 cacheGroups 可以自定义 chunk 组，通过 test 对模块进行过滤，符合条件的模块会被分配到相同组下。

通过默认配置，我们可了解到 `cacheGroups` 有两个默认组：一个是 vendors，将所有来自 node_modules 目录的模块；一个 default，包含了由两个以上的 chunk 所共享的模块。

比如，通过 name 属性覆盖 vendors 包命名：

```js
// vue.config.js
module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "customName",
            priority: -10,
          },
        },
      },
    },
  },
};
```

打包目录：

```js
dist/js/customName.ddab3536.js    28.11 KiB
dist/js/app.fc3491de.js           1.62 KiB
```

priority 属性越大，表示优先级越高，当命中多个 chunk 组时仅会打包到 priority 最大的那个组。

### 将组件库 element-ui 分割

修改配置

```js
// vue.config.js

module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          "element-ui": {
            test: /[\\/]node_modules[\\/](element-ui|axios)/,
            chunks: "all",
            priority: -5,
          },
        },
      },
    },
  },
};
```

打包后目录：
```js
  dist/js/element-ui~app.c38ed862.js    670.67 KiB
  dist/js/chunk-vendors.dd038038.js     135.18 KiB
  dist/js/app.4702c3b7.js               1.68 KiB
```

可看到 element-ui 被单独打包出来了。