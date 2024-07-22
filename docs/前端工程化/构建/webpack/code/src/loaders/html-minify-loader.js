var Minimize = require('minimize')

module.exports = function (source) {
  var minimize = new Minimize()
  return minimize.parse(source)
}
