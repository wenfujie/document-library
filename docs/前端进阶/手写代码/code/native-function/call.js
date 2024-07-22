
// use
var obj = {
  value: 1
}
function bar (name) {
  console.log(this.value);
  return name
}

// console.log(bar.call(obj, 'wfj')); // 1 wfj

/**
 * 实现分析
 * 1.执行call时bar被执行，this 指向call的第一个参数
 * 2.call除第一个以外的参数都传递给bar
 */

function _call (context, ...args) {
  context._fn = this
  var result = context._fn(...args)
  delete context._fn
  return result
}

Function.prototype._call = _call

console.log(bar._call(obj, 'wfj')); // 1 wfj
