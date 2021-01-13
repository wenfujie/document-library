/**
 * 两个函数为核心：
    new Primise(fn) 中的fn
    .then(fn) 中的fn
 */

/**
 * Promise 规则
1.Promise是构造函数，new 出来的实例有then方法。
2.new Promise时，传递一个参数，这个参数是函数，又被称为执行器函数(executor)， 并执行器会被立即调用，也就是上面结果中start最先输出的原因。
3.executor是函数，它接受两个参数 resolve reject ，同时这两个参数也是函数。
4.new Promise后的实例具有状态， 默认状态是等待，当执行器调用resolve后， 实例状态为成功状态， 当执行器调用reject后，实例状态为失败状态。
5.promise翻译过来是承诺的意思，实例的状态一经改变，不能再次修改，不能成功再变失败，或者反过来也不行。
6.每一个promise实例都有方法 then ，then中有两个参数 ，我习惯把第一个参数叫做then的成功回调，把第二个参数叫做then的失败回调，这两个参数也都是函数，
  当执行器调用resolve后，then中第一个参数函数会执行。当执行器调用reject后，then中第二个参数函数会执行。

 */

function Promise(fn) {
  // 存储回调集合
  this.cbs = [];

  // 该方法在 new Primise(fn) 中 fn 执行的时候作为参数传入
  const resolve = (value) => {
    setTimeout(() => {
      this.data = value;
      this.cbs.forEach((cb) => cb(value));
    });
  };

  fn(resolve.bind(this));
}

Promise.prototype.then = function (onResolved) {
  return new Promise((resolve) => {
    this.cbs.push(() => {
      const res = onResolved(this.data);
      if (res instanceof Promise) {
        res.then(resolve);
      } else {
        resolve(res);
      }
    });
  });
};

const p1 = new Promise((resolve) => {
  console.log(123);
  setTimeout(() => {
    resolve();
  }, 1000);
});

p1.then((res) => {
  console.log(456);
});
