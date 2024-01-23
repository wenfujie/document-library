// bind 简单使用
var foo = {
  value: 1,
};

function bar(name, age) {
  console.log(this.value);
  console.log(name);
  console.log(age);
  return name + age;
}

// var bindFoo = bar.bind(foo, 'daisy');
// console.log(bindFoo('18')) // 1 daisy 18 daisy18


/**
 * 实现 bind 分析
 * 1. 返回一个函数
 * 2. 返回函数的 this 指向 bind 的首个参数
 * 3. bind的其他参数会作为返回函数的参数
 * 4. 返回函数执行时可以继续传参
 * 实现解释：...为es6语法，可用 Array.prototype.slice.call(arguments) 代替
 */

function _bind(context, ...args) {
  var _this = this;
  return function (...args2) {
    return _this.call(context, ...args, ...args2);
  };
}

Function.prototype._bind = _bind;

// test
var _bindFoo = bar._bind(foo, "daisy");
console.log(_bindFoo("18"))  // 1 daisy 18 daisy18


