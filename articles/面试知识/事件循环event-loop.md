
## 前言
面试常会问，**为什么js是单线程？为什么需要异步？**

1. 假设js是多线程，我们让process1删除元素a，同时让process2编辑元素a，下达两个矛盾的命令，浏览器不知该如何执行，所以js是单线程。

2. 如果没有异步，代码是自上而下执行，如果上一行解析用时很长，就会造成阻塞，导致用户体验很差；使用异步，也可以做一些延时任务。

## 任务队列和事件循环 （Event Loop）
**js内部是如何实现异步的？**

主要是以 `任务队列` 和 `事件循环` 的概念来实现异步。

### 任务队列

广义上划分，所有任务可以分成两种，一种是**同步任务（synchronous）**，另一种是**异步任务（asynchronous）**。

>同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务。

>异步任务指的是，不进入主线程、而进入"任务队列"（task
queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

总结： **只要主线程空了，就会去读取"任务队列"，这就是JavaScript的运行机制** 。

### 事件循环 Event Loop

除了广义的同步任务和异步任务，js 对任务还有更精细的定义：
- macro-task(宏任务)：包括整体代码script，setTimeout，setInterval
- micro-task(微任务)：Promise.then、Promise.catch、finally

**注意**

setTimeout、setInterval宏任务会在下一次宏任务时执行。

**执行规则**

js会先执行整体的同步代码（宏任务），执行过程中，遇到宏任务将宏任务添加到下一个宏任务队列，遇到微任务将微任务添加到微任务队列，直到同步代码执行完。同步代码执行完后，会优先执行微任务队列中的任务，再执行宏任务队列的任务，如此循环。

主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。

![](images/事件循环机制.png)

## 练习题

习题一

```javascript
const first = () => new Promise((resolve, reject) => {
    console.log(3)
    let p = new Promise((resolve, reject) => {
        console.log(7)
        setTimeout(() => {
            console.log(5)
        })
        resolve(1)
    })
    resolve(2)
    p.then((arg) => {
        console.log(arg)
    })
})
 
first().then((arg) => {
    console.log(arg)
})
console.log(4) 

// 3 7 4 1 2 5
```

习题二

```javascript
setTimeout(()=>{
    console.log("0")
})
new Promise((resolve,reject)=>{
    console.log("1")
    resolve();
}).then(()=>{
    console.log("2")
    new Promise((resolve,reject)=>{
        console.log("3")
        resolve()
    }).then(()=>{
        console.log("4")
    }).then(()=>{
        console.log("5")
    })
}).then(()=>{
    console.log("6")
})

new Promise((resolve,reject)=>{
    console.log("7")
    resolve()
}).then(()=>{
    console.log("8")
}) 

// 1 7 2 3 8 4 6 5 0
 
// 关键点:每次.then() 都会new Promise()
```