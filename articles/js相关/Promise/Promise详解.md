- [优缺点](#优缺点)
- [Promise常用方法](#promise常用方法)
  - [Promise.all](#promiseall)
  - [Promise.allSettled](#promiseallsettled)
  - [Promise.race](#promiserace)
- [20行代码实现简版Promise](#20行代码实现简版promise)

## 优缺点

**缺点**

1. 无法取消Promise,一旦新建它就会立即执行，无法中途取消。
2. 如果不设置回调函数，promise内部抛出的错误，不会反应到外部。
3. 当处于pending状态时，无法得知目前进展到哪一个阶段

**优点**

1. 解决回调地狱
2. 代码结构更清晰
3. 代码异常更容易捕获
4. 提供并发相关api

## Promise常用方法

### Promise.all
all用于 **监听多个Promise全部都执行成功的回调。**

假设有三个Promise：resolveP、resolveP2会成功执行，而rejectP会执行失败。
```javascript
  let resolveP = new Promise((res, rej) => {
    setTimeout(() => {
      res('resolve1')
    }, 1000)
  })

  let resolveP2 = new Promise((res, rej) => {
    res('resolve2')
  })

  let rejectP = new Promise((res, rej) => {
    rej('error')
  })
```

**情景一：所有Promise都执行成功**
```javascript
  Promise.all([resolveP, resolveP2]).then(res => {
    console.log(res); // ["resolve1", "resolve2"]
  })
```

**情景二：存在执行失败的Promise**
```javascript
  Promise.all([resolveP, rejectP]).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err); // error
  })
```

注意：只要有一个Promise失败了，就会马上触发catch，其他Promise仍然会继续执行。

### Promise.allSettled
allSettled用于 **监听所有Promise都执行完成的回调，不管执行结果是成功或失败。** 

还是用上面那三个Promise举例

**情景一：所有Promise都执行成功**
```javascript
  Promise.allSettled([resolveP, resolveP2]).then(res => {
    console.log(res);
  })

  /**
    [
      {"status":"fulfilled","value":"resolve1"},
      {"status":"fulfilled","value":"resolve2"}
    ]
  */
```

**情景二：存在执行失败的Promise**

```javascript
  Promise.allSettled([resolveP, rejectP]).then(res => {
    console.log(JSON.stringify(res));
  })

  /**
    [
      {"status":"fulfilled","value":"resolve1"},
      {"status":"rejected","reason":"error"}
    ]
  */
```

### Promise.race
race用于 **监听多个Promise中，最先完成的Promise，不管执行结果是成功还是失败**

```javascript
  Promise.race([rejectP, resolveP2, resolveP]).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err); // error
  })
```

注意：race中的Promise执行顺序是以接收的数组参数从左往右执行，所以调换顺序会影响结果

```javascript
  Promise.race([resolveP2, rejectP, resolveP]).then(res => {
    console.log(res); // resolve2
  }).catch(err => {
    console.log(err);
  })
```

## 20行代码实现简版Promise

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