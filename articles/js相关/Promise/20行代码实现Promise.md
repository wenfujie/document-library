
```javascript
/**
 * 两个函数为核心：
    new Primise(fn) 中的fn
    .then(fn) 中的fn
 */

function MyPromise(fn) {
  // 存储回调集合
  this.cbs = [];

  // 该方法为new Promise(fn)时，fn的第一个参数 resolve ，主要用于触发回调方法
  const resolve = (value) => {
    setTimeout(() => {
      this.data = value;
      this.cbs.forEach((cb) => cb(value));
    });
  };

  fn(resolve.bind(this));
}

// 实现链式调用
MyPromise.prototype.then = function (onResolved) {
  return new MyPromise((resolve) => {
    this.cbs.push(() => {
      const res = onResolved(this.data);
      if (res instanceof MyPromise) {
        res.then(resolve);
      } else {
        resolve(res);
      }
    });
  });
};

// 使用案例：500ms后打印1，再500ms后打印2
new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 500);
})
  .then((res) => {
    console.log(res);
    return new MyPromise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, 500);
    });
  })
  .then(console.log);

```