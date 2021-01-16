
# 实现防抖和节流

## 防抖

短时间多次触发函数，仅取最后一次触发执行。

例子：输入框模糊查询、监听滚动条滚动结束事件

```javascript
  const debounce = (function () {
    let interval;

    return (fn, time) => {
      if (interval) {
        clearInterval(interval);
      }
      interval = setTimeout(() => {
        fn();
      }, time);
    };
  })();

  // 使用
  debounce(() => console.log("test"), 500);
```

## 节流

限制函数在指定间隔时间内仅触发一次。

例子：快速且多次点击按钮，3s内仅触发一次函数

```javascript
  const throttle = (function () {
    let touchTimestamp = 0;

    return (fn, time) => {
      let nowTimestamp = Date.now();
      if (touchTimestamp + time < nowTimestamp) {
        touchTimestamp = nowTimestamp;
        fn();
      }
    };
  })();

  // 使用
  throttle(() => console.log("test throttle"), 3000);
```