/**
 * generator 使用示例
 */
function *test(){
  yield 'test1'
  yield 'test2'
}

const testInstance = test()
console.log(testInstance.next())
console.log(testInstance.next())
console.log(testInstance.next())

// { value: 'test1', done: false }
// { value: 'test2', done: false }
// { value: undefined, done: true }

/**
 * 实现
 * 分析：
    1. 函数需返回一个对象，包含next方法
    2. 调用next方法，返回对象{value, done}
 */

function makeIterator(data) {
  let index = 0;
  return {
    next() {
      return index >= data.length
        ? { value: data[index++], done: true }
        : { value: data[index++], done: false };
    },
  };
}

const iterator = makeIterator([1, 2]);

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
