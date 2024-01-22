// 接受2个参数，第一个参数是callback函数拥有4个参数（初始值/上个函数返回值，数组项，索引，调用reduce的数组），
// 第二个参数作为首次调用callback函数第一个参数的值，若不存在则默认为数组首个元素
function _reduce(callback, initVal) {
  var array = this;
  if (typeof callback !== "function")
    throw new TypeError("callback not function");
  if (!array || !array.length) throw new TypeError("can not be empty array");

  var len = array.length;
  var key = 0;
  var value = arguments.length >= 2 ? initVal : array[0];
  while (key < len) {
    value = callback(value, array[key], key, array);
    key++;
  }
  return value;
}

Object.defineProperty(Array.prototype, "_reduce", {
  value: _reduce,
});

// test
[1,2,3,4,5]._reduce((count, item) => {
  return count + item
}, 0) // 15