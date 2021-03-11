- [优缺点](#优缺点)
- [Promise常用方法](#promise常用方法)
  - [Promise.all](#promiseall)
  - [Promise.allSettled](#promiseallsettled)
  - [Promise.race](#promiserace)
- [傻瓜式分解实现简版Promise](#傻瓜式分解实现简版promise)

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

## 傻瓜式分解实现简版Promise

该分解教程仅考虑 then 方法，catch、finally方法的实现不考虑，主要让大家快速了解实现原理，所以一些边界情况也不考虑。

 **分析**
 1. new Promise((resolve)=>{}), Promise是构造函数，接收一个回调函数，该函数会接收一个叫 resolve 的函数做为参数。
 2. 执行new Promise(fn)时, 函数 fn 会马上执行

```javascript
function MyPromise(fn) {
  const resolve = () => {}

  fn(resolve)
}
```

**继续分析**
1. 构造函数Promise的实例支持调用then方法，如 p.then(fn) ，then方法接收一个回调函数fn
2. fn会接收一个回调参数，回调参数值为实例 p 中执行 resolve(val) 时的 val 。

```javascript
function MyPromise(fn) {
  this.cbs = []
  const resolve = (res) => {
    this.cbs.forEach((fun) => fun(res))
  }

  fn(resolve)
}

MyPromise.prototype.then = function (fn) {
  this.cbs.push(fn)
}
```

到这里，已经能执行创建 MyPromise 实例，以及支持使用 then 回调了

```javascript
new MyPromise((resolve) => {
  setTimeout(resolve, 1000)
}).then((res) => {
  console.log('test')
})

// 1秒后打印 'test'
```

**继续分析**
前面虽然支持 then 回调，但并不支持类似 `.then(fn).then(fn)` 链式调用
1. 只有 Promise 的实例能调用 then，要想支持链式调用，then 方法必须返回 Promise 的实例

```javascript
function MyPromise(fn) {
  this.cbs = []
  const resolve = (res) => {
    this.cbs.forEach((fun) => {
      fun(res)
    })
  }

  fn(resolve)
}
MyPromise.prototype.then = function (fn) {
  return new MyPromise((resolve) => {
    this.cbs.push((res) => {
      let result = fn(res)
      result instanceof MyPromise ? result.then(resolve) : resolve(result)
    })
  })
}
```

**测试**

```javascript
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
