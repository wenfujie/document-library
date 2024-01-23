// pipe(f, g, h)是个函数流水线，会从左到右依次执行函数，每次执行函数时会将上次函数结果作为参数传入。
// 即：pipe(f, g, h) => h(g(f(p)))
// pipe 是个柯里化函数，返回一个新函数，该函数接受一个参数作为运行 funcs 的初始值。

function pipe(...funcs) {
  return function (value) {
    return funcs.reduce((acc, fn) => fn(acc), value);
  };
}


// test
const countLine = pipe(
  (a) => a + 1,
  (b) => b * b,
  (c) => c * 2
);
console.log(countLine(5)); // 72
