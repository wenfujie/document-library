/**
 * 打包
 * 1.进到code目录
 * 2.npx webpack --config build.js
 */

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
