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

var a = (function () {
  return 1
})()

// console.log(a)

var s1 = new String('hello')
var s2 = new String('hello')

console.log(s1 === s2)
console.log(s1 == s2)
console.log(s2)
console.log(s2.toString())
