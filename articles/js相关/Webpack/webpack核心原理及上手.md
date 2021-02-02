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
  entry: main: './src/main.js',
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

其实等同于
```javascript
new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") })
```

在业务中区分环境
```javascript
if(process.env.NODE_ENV === 'development'){
    //开发环境 do something
}else{
    //生产环境 do something
}
```