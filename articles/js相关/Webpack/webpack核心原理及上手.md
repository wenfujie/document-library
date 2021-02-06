## Webpack 主要功能
- `打包` 将多文件打包成一个文件，减少请求次数和下载带宽，起到降低服务器压力的作用。
- `转换` 将预编译语言转换成浏览器可识别语言。
- `优化` 性能优化

## 核心概念
### 入口 entry

`entry` 属性，用于告诉 webpack 从哪个文件开始构建，支持 string | object 。

**单入口**
```javascript
module.exports = {
  entry: './index.js'
};
```
**多入口**
```javascript
// 场景一：分离 应用程序(app) 和 第三方库(vendor) 入口
module.exports = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```

```javascript
// 场景二：多页面应用程序，告诉 webpack 需要 3 个独立分离的依赖图
module.exports = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};
```

### 出口 output
`output` 属性用于告诉 webpack 打包后文件在哪里输出，以及输出文件名称格式。

**单出口**
```javascript
const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

**多出口**
```javascript
const path = require('path');

module.exports = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

### loader
webpack 默认只能打包 javascript 文件， `loader` 能将其他文件转化为 webpack 能有效识别的模块。

**注意**：`loader` 无需引入。
```javascript
// 安装 loader
npm install --save-dev css-loader
```
```javascript
module.exports = {
  module: {
    rules: [{ 
        test: /\.css$/, 
        use: ['style-loader', 'css-loader']
    }]
  }
};

// 或

 module.exports = {
  module: {
    rules: [{ 
        test: /\.css$/, 
        use: ['style-loader', {
            loader: 'css-loader',
            options: {
                modules: true
            }
        }]
    }]
  }
};
```

**特性**：逆向编译，链式传递

```javascript
module.exports = {
  module: {
    rules: [{ 
        test: /\.css$/, 
        use: ['style-loader', 'css-loader', 'postcss-loader']
    }]
  }
};

// 如上，css 文件编译顺序依次为：postcss-loader ---> css-loader ---> style-loader
// 编译过程中，第一个loader的值 传递给下一个loader，依次传递；最后一个loader编译完成后，将预期值传递给 webpack
```

### 插件 plugin
`plugin` 属性用于引入插件，可以处理各种任务比如：打包优化、代码压缩、定义环境变量等等。

**注意**：
- 所有插件需在文件中使用 `require` 引入才能使用。
- 有些插件是内置插件，无需下载安装。

```bash
npm i html-webpack-plugin -D
```

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html'
    })
  ]
};
```

**插件内部实现**

webpack 插件其实就是一个具有 `apply` 方法的对象。

`apply` 属性会被 webpack `compiler` 调用，并且 `compiler` 对象可在整个编译生命周期访问。
```javascript
// ConsoleLogOnBuildWebpackPlugin.js

const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.run.tap(pluginName, compilation => {
            console.log("webpack 构建过程开始！");
        });
    }
}
```

### mode
webpack4 新增属性，用于区分环境，有以下可选值：
- development
- production
- none

**使用**

在配置文件中
```javascript
module.exports = {
  mode: 'production'
};
```

执行命令时
```bash
webpack --mode=production
```

| 选项 | 描述 |
| :----: | :----: |
|development|	会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin
|production|	会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 TerserPlugin。
|none|	没有任何默认优化选项


在业务中区分环境
```javascript
if(process.env.NODE_ENV === 'development'){
    //开发环境 do something
}else{
    //生产环境 do something
}
```

## 拓展
### 模拟实现一个loader
loader 也是一个 node 模块，它导出一个函数，该函数的参数是 require 的源模块，处理 source 后把返回值交给下一个 loader。所以它的 “模版” 应该是这样的：

```javascript
module.exports = function (source) {
    // 处理 source ...
    return handledSource;
}
```

如果是最后一个执行的loader，该loader需返回一个node可执行的 javascript 脚本（用字符串储存）。
```javascript
// 处理顺序排在最后的 loader
module.exports = function (source) {
    // 这个 loader 的功能是把源模块转化为字符串交给 require 的调用方
    return 'module.exports = ' + JSON.stringify(source);
}
```

**模拟写一个脚本**

```bash
# 安装所需依赖
npm i html-loader minimize  -D
```

```javascript
// src/loaders/html-minify-loader.js

var Minimize = require('minimize');

module.exports = function(source) {
    var minimize = new Minimize();
    return minimize.parse(source);
};
```

```javascript
// webpack.config.js

const path = require('path')
module.exports = {
  entry: path.resolve(__dirname, './index.html'),
  output: {
    filename: 'index.html',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader', 'html-minify-loader'] // 处理顺序 html-minify-loader => html-loader => webpack
      }
    ]
  },
  resolveLoader: {
    // 因为 html-loader 是开源 npm 包，所以这里要添加 'node_modules' 目录
    modules: [path.join(__dirname, './src/loaders'), 'node_modules']
  }
}
```
**开始打包**
```bash
npx webpack --config webpack.config.js
```