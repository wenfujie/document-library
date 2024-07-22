## 红宝书

该部分摘录自 《JavaScript 高级程序设计》。

### 垃圾回收

常用回收策略有两种，`标记清理` 和 `引用计数` ，其中 `标记清理` 更常使用。

#### 标记清理

垃圾回收程序运行时，会标记（标记方式见下方）所有变量，然后会将处于运行上下文的变量及被引用的变量的标记去除，最后回收剩下被标记的变量值及内存。

给变量加标记的方式

- 变量进入上下文时反转其某一位
- 维护 `上下文中` 和 `上下文外` 两个列表

#### 引用计数

对每个值都记录它被引用的次数，每次回收所有引用次数为 0 的变量。该方式存在循环引用问题（下文会说明）

引用计数执行流程

定义一个变量并赋引用值时，该值引用数为 1。当该值被其他变量引用时引用数每次+1，反之引用被覆盖时则-1，当引用数为 0 时，变量无法在被获取到，变量会被回收程序下一次回收。

循环引用问题

```js
function problem() {
  let a = {};
  let b = {};

  // 循环引用
  a.b = b;
  b.a = a;
}
```

示例中 a 和 b 的引用数都为 2，但由于循环引用导致引用计数永远无法变为 0 ，a 和 b 就一直无法释放，函数若被多次执行，就会有内存占用过大的问题。

### 数组

#### sort

为数组排序

```js
let arr = [3, 4, 1, 2];
// 升序
arr.sort((a, b) => a - b); // [1,2,3,4]
// 降序
arr.sort((a, b) => b - a); // [4,3,2,1]
// 源被改变
console.log(arr); // [4,3,2,1]
```

#### concat

设置被拼接数组不被拉平

```js
let arr = [1];
let targetArr = [2];
targetArr[Symbol.isConcatSpreadable] = false;
arr.concat(targetArr); // [1,[2]]
```

#### lastIndexOf

查找目标元素最后出现的位置

```js
let arr = [1, 2, 3, 1];
arr.lastIndexOf(1); // 3
```

#### 查找对象

Item[] 下，直接用 itme 进行查找，而不是 item.id

```js
let arr = [{ id: 1 }, { id: 2 }];
let currItem = arr[1];
arr.indexOf(currItem); // 1
arr.includes(currItem); // true
arr.findIndex((item) => item === currItem); // 1
```

#### reduce、reduceRight

归并方法。支持两个参数，第一个为归并函数，第二个为归并起点值（可选）。

reduceRight 与 reduce 用法相同，不同的是它从数组末尾开始遍历。

不设定归并起点值（不传第二个参数），数组会从第二项开始遍历，归并起点值为 arr[0]。

```js
let arr = [1, 2, 3];
arr.reduce((pre, item) => {
  console.log("打印：", pre, item);
  return pre + item;
});
// 打印： 1 2
// 打印： 3 3
```

设定归并起点值，数组从第一项开始遍历，归并起点值为 0 。

```js
let arr = [1, 2, 3];
arr.reduce((pre, item) => {
  console.log("打印：", pre, item);
  return pre + item;
}, 0);
// 打印： 0 1
// 打印： 1 2
// 打印： 3 3
```

#### slice

截取数组。

```js
let arr = [1, 2, 3, 4];
// 索引2至末尾
arr.slice(2); // [3,4]
// 索引2至3（不含3）
arr.slice(2, 3); // [3]
// 为负数时，使其加上数组长度后再计算
// 转化为 arr.slice(2, 3)
arr.slice(-2, -1); // [3]
```
