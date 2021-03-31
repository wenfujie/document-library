
## 防抖

短时间多次触发函数，仅取最后一次触发执行。

例子：输入框模糊查询、监听滚动条滚动结束事件

```javascript
// 实现防抖函数
function debounce(fn, await) {
  let timer
  return function (...arg) {
    clearTimeout(timer)
    timer = setTimeout(_=>fn(...arg), await)
  }
}

let test = debounce((msg)=>console.log(msg), 3000)
test('hello') // 3s 后打印 'hello'
```

## 节流

限制函数在指定间隔时间内仅触发一次。

例子：快速且多次点击按钮，3s内仅触发一次函数

```javascript
// 实现节流函数
function throttle(f, wait) {
  let timer
  return (...args) => {
    if (timer) return
    f(...args)
    timer = setTimeout(() => {
      timer = null
    }, wait)
  }
}
```

以上实现方式，首次调用目标函数会立即触发，若要延迟触发仅需将 `f(...args)` 移入 `setTimeout` 中。