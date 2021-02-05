const path = require('path')
module.exports = {
  entry: path.resolve(__dirname, './index.js'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
