// 导入WebSocket模块:
// const WebSocket = require('ws')

// // 实例化:
// const wss = new WebSocket.Server({
//   port: 3000
// })

// wss.on('connection', function (ws) {
//   ws.on('message', function (message) {
//     console.log(`服务器接收到数据: ${message}`)
//     ws.send('服务器发送给前端的数据', (err) => {
//       if (err) {
//         console.log('数据发送失败')
//       }
//     })
//   })
// })

// console.log(a)
// var a = 1
// function a() {}

// console.log(a)

// var a = (function () {
//   return 1
// })()

// // console.log(a)

// var s1 = new String('hello')
// var s2 = new String('hello')

// console.log(s1 === s2)
// console.log(s1 == s2)
// console.log(s2)
// console.log(s2.toString())

const time = (timer) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, timer)
  })
}
const ajax1 = () =>
  time(2000).then(() => {
    console.log(1)
    return 1
  })
const ajax2 = () =>
  time(1000).then(() => {
    console.log(2)
    return 2
  })
const ajax3 = () =>
  time(1000).then(() => {
    console.log(3)
    return 3
  })

function mergePromise(promiseList) {
  return new Promise((resolve) => {
    let result = []
    const loop = (arr) => {
      arr
        .shift()()
        .then((res) => {
          result.push(res)
          arr.length ? loop(arr) : resolve(result)
        })
    }
    loop(promiseList.concat())
  })
}

// mergePromise([ajax1, ajax2, ajax3]).then((data) => {
//   console.log('done')
//   console.log(data) // data 为 [1, 2, 3]
// })

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]

// ------- 用Promise封装一个异步加载图片的方法 --------

// function loadImg(url) {
//   return new Promise((resolve, reject) => {
//     const img = new Image()
//     img.onload = () => {
//       resolve()
//     }
//     img.onerror = () => {
//       reject()
//     }
//     img.src = src
//   })
// }

// loadImg(
//   'https://c-ssl.duitang.com/uploads/item/201502/22/20150222104908_fN4va.jpeg'
// )

// ---- 实现Promise -----

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

// new MyPromise((resolve) => {
//   setTimeout(() => {
//     resolve(1)
//   }, 500)
// })
//   .then((res) => {
//     console.log(res)
//     return new MyPromise((resolve) => {
//       setTimeout(() => {
//         resolve(2)
//       }, 500)
//     })
//   })
//   .then(console.log)

console.log(222)
if (22 == '22') {
}
