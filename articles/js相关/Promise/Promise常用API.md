
## all、allSettled、rece方法

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