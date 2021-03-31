// 实现防抖函数
function debounce(fn, await) {
  let timer
  return function (...arg) {
    clearTimeout(timer)
    timer = setTimeout(_=>fn(...arg), await)
  }
}

let test = debounce((msg)=>console.log(msg), 3000)
// test('hello')

function throttle(f, wait) {
  let timer
  return (...args) => {
    if (timer) return
    timer = setTimeout(() => {
      f(...args)
      timer = null
    }, wait)
  }
}