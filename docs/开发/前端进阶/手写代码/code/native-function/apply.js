// use

var obj = {
  value: 1,
};
function bar(name, age) {
  console.log(this.value);
  return name + age;
}
// console.log(bar.apply(obj, ["wfj", 18])); // 1 wfj18

/** 
 * 实现分析
 * 1.apply接收2个参数，apply调用则bar会调用
 * 2.bar的this指向apply的第一个参数
 * 3.apply的第二个参数是数组，解构后作为bar的参数
 */

function _apply (context, args) {
  context._fn = this
  var result = context._fn(...args)
  delete context._fn
  return result
}
Function.prototype._apply = _apply

// test
console.log(bar._apply(obj, ["wfj", 18])); // 1 wfj18
