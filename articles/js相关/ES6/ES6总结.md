- [let、const](#letconst)
- [变量结构赋值](#变量结构赋值)
- [字符串的扩展](#字符串的扩展)
  - [能被 `for of` 遍历](#能被-for-of-遍历)
  - [\`\` 字符串模板](#-字符串模板)
  - [新增方法includes、startsWith、endsWith](#新增方法includesstartswithendswith)
- [数值的扩展](#数值的扩展)
  - [Number上新增方法isFinite、isNaN、parseInt, parseFloat](#number上新增方法isfiniteisnanparseint-parsefloat)
  - [Math对象新增方法：trunc()去除小数部分，sign()判断是正数还是负数，cbrt()计算立方根](#math对象新增方法trunc去除小数部分sign判断是正数还是负数cbrt计算立方根)
- [函数扩展](#函数扩展)
  - [默认参数](#默认参数)
  - [rest参数](#rest参数)
  - [箭头函数](#箭头函数)
- [数组的扩展](#数组的扩展)
  - [...扩展运算符](#扩展运算符)
  - [Array.from()](#arrayfrom)
  - [copyWithin()](#copywithin)
  - [find()、findIndex()](#findfindindex)
  - [includes()](#includes)
  - [flat()、flatMap()](#flatflatmap)
- [对象的扩展](#对象的扩展)
  - [属性简写](#属性简写)
  - [属性名表达式](#属性名表达式)
  - [属性的遍历](#属性的遍历)
  - [解构](#解构)
  - [链判断运算符 ?.](#链判断运算符-)
  - [null判断运算符 ??](#null判断运算符-)
  - [Object.is](#objectis)
  - [Object.assign](#objectassign)
  - [keys() values() entries()](#keys-values-entries)
- [Module](#module)
- [新增数据类型Symbol、Map、Set](#新增数据类型symbolmapset)
- [proxy数据劫持](#proxy数据劫持)
- [Promise](#promise)
- [Generator](#generator)
- [async await](#async-await)
- [Class](#class)
- [总结](#总结)
- [阮一峰的ES6入门教程](#阮一峰的es6入门教程)
## let、const

**`let`**

1. 不会变量提升
2. 不允许重复声明
3. 块级作用域
4. 暂时性死区
   只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
    ```js
    var tmp = 123;

    if (true) {
      tmp = 'abc'; // ReferenceError
      let tmp;
    }
    ```

**`const`**

1. 不会变量提升
2. 声明时必须赋值
3. 声明后无法修改，除非是对象修改某个属性
4. 暂时性死区

## 变量结构赋值

```js
let [a,b,c] = [1,2,3]
let { foo,bar } = {foo:'a',bar: 'b'}

// 默认值
let [x, y = 'b'] = ['a']; // x='a', y='b'
```

## 字符串的扩展

### 能被 `for of` 遍历
```js
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"
```

### \`\` 字符串模板

### 新增方法includes、startsWith、endsWith
   - includes()：返回布尔值，表示是否找到了参数字符串。
   - startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
   - endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。

```js
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true

// 三个方法都支持第二个参数，endsWith表示从0-n，其他两个方法表示开始搜索的位置。
```

repeat方法返回一个新字符串，表示将原字符串重复n次。
```js
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
```

padStart、padEnd。补全字符串
  
```js
'x'.padStart(5, 'ab') // 'ababx'
'x'.padEnd(5, 'ab') // 'xabab'
```
trimStart、trimEnd。消除收或尾空格
```js
const s = '  abc  ';

s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"
```
replaceAll。替换所有匹配
```js
'aabbcc'.replaceAll('b', '_') // 'aa__cc'
// 类似
'aabbcc'.replace(/b/g, '_')
```

## 数值的扩展
### Number上新增方法isFinite、isNaN、parseInt, parseFloat
1. isFinite、isNaN
```js
/**
 * 判断是否为有限数值
 * 1.类型不为number，统一返回false
 */
Number.isFinite(15) // true
Number.isFinite(Infinity); // false

/**
 * 检查是否为NaN
 * 1.类型不为NaN，统一返回false
 */
Number.isNaN(NaN) // true
Number.isNaN(15) // false
```

他们与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断。

2. Number.parseInt(), Number.parseFloat()
ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。

3. Number.isInteger。判断数值是否为整数
```js
Number.isInteger() // false
Number.isInteger(null) // false
Number.isInteger('15') // false
Number.isInteger(true) // false
Number.isInteger(25) // true
Number.isInteger(25.0) // true
```

### Math对象新增方法：trunc()去除小数部分，sign()判断是正数还是负数，cbrt()计算立方根

```js
// 去除一个数的小数部分，返回整数部分。
Math.trunc(4.1) // 4

// 判断一个数到底是正数、负数、还是零
Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN

// 计算立方根
Math.cbrt(-1) // -1
Math.cbrt(0)  // 0
Math.cbrt(1)  // 1
Math.cbrt(2)  // 1.2599210498948732
```

## 函数扩展

### 默认参数

```js
function log(x, y = 'World') {
  console.log(x, y);
}

// 指定默认值的参数length会失真
log.length // 1
```

### rest参数

```js
/**
 * ...items，只能是最后一个参数，否则报错
 * 1.items是一个数组，可以使用数组方法
 * 2.函数的length包括rest参数
 */
function push(array, ...items) {}
```

### 箭头函数

```js
var f = v => v;
```

使用注意：

（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

## 数组的扩展

### ...扩展运算符

```js
console.log(...[1,2,3]) // 1 2 3
```

### Array.from()
将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```

### copyWithin()
将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

参数

- target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
- start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。

```js
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]
```

### find()、findIndex()
```js
[1, 4, -5, 10].find((n) => n < 0)
// -5
```
find用于找出第一个符合条件的数组成员。所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。

findIndex类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。

### includes()
判断数组是否包含给定的值

参数：该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。

```js
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true
```

### flat()、flatMap()

flat用于扁平化数组，接收一个{number}的参数，表示要扁平化的层数。
1. infinity表示无限层
2. 如果有空位，flat会跳过
```js
[1, 2, [3, [4, 5]]].flat(2) // [1, 2, 3, 4, 5]
```

flatMap对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组。

```js
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]
```

## 对象的扩展
### 属性简写

```js
const foo = 'bar';
const baz = {foo}; // {foo: "bar"}

function f(x, y) {
  return {x, y};
}
f(1, 2) // Object {x: 1, y: 2}

// 方法简写
const o = {
  method() {
    return "Hello!";
  }
};
```

### 属性名表达式
```js
let obj = {
  ['h' + 'ello']() {
    return 'hi';
  }
};

obj.hello() // hi
```

### 属性的遍历
ES6 一共有 5 种方法可以遍历对象的属性。

（1）for...in

for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

（2）Object.keys(obj)

Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

（3）Object.getOwnPropertyNames(obj)

Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

（4）Object.getOwnPropertySymbols(obj)

Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。

（5）Reflect.ownKeys(obj)

Reflect.ownKeys返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

### 解构

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
```

### 链判断运算符 ?.
ES2020引入
```js
a?.b
// 等同于
a == null ? undefined : a.b

a?.[x]
// 等同于
a == null ? undefined : a[x]

a?.b()
// 等同于
a == null ? undefined : a.b()

a?.()
// 等同于
a == null ? undefined : a()
```

### null判断运算符 ??
?? 与 || 类似，但仅限左侧值为 null 或 undefined 时执行，目的是配合 ?. 使用。
```js
const animationDuration = response.settings?.animationDuration ?? 300;
```

### Object.is
判断数值是否相等，与 === 几乎相等，区别是
- +0不等于-0
- NaN等于自身
```js
Object.is('foo', 'foo') // true

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

### Object.assign
对象浅拷贝

### keys() values() entries()
```js
let {keys, values, entries} = Object;
let obj = { a: 1, b: 2, c: 3 };

for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}

for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}
```

## Module

## 新增数据类型Symbol、Map、Set
**Symbol**
基础数据类型，独一无二的值

使用场景

1. 消除魔法字符串
假如有一个tabs切换功能
```js
if (type === 'basic') {
    return <div>basic tab</div>
}

if (type === 'super') {
    return <div>super tab</div>
}
```

使用Symbol改造
```js
const tabTypes = {
    basic: Symbol(),
    super: Symbol()
}

if (type === tabTypes.basic) {
    return <div>basic tab</div>
}

if (type === tabTypes.super) {
    return <div>super tab</div>
}
```

2. 当做对象属性
当一个复杂对象中含有多个属性的时候，很容易将某个属性名覆盖掉，利用 Symbol 值作为属性名可以很好的避免这一现象。
```js
const name = Symbol('name');
const obj = {
    [name]: 'ClickPaas',
}
```
## proxy数据劫持

## Promise

## Generator
异步编程的解决方案。

## async await

## Class

## 总结
面试时，记住以下特性，并能说出对应的作用就好

**新增Api**
- Proxy
- Promise
- async await
- Class
- Generator

**新增数据类型**
- Symbol
- Map、WeakMap
- Set、WeakSet

**变量**

- let、const
- 变量结构赋值
- ...数组扩展运算符

**对象**
- 属性简写
- 链式判断运算符?.

**函数**

- 默认参数
- rest参数
- 箭头函数

Object、String、Number、Array等扩展了一些方法

## 阮一峰的ES6入门教程
参考：[ES6入门教程](https://es6.ruanyifeng.com/)，作者阮一峰