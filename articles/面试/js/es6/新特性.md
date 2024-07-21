- [let、const](#letconst)
- [变量结构赋值](#变量结构赋值)
- [字符串的扩展](#字符串的扩展)
  - [能被 `for of` 遍历](#能被-for-of-遍历)
  - [\`\` 字符串模板](#-字符串模板)
  - [新增方法 includes、startsWith、endsWith](#新增方法-includesstartswithendswith)
- [数值的扩展](#数值的扩展)
  - [Number 上新增方法 isFinite、isNaN、parseInt, parseFloat](#number-上新增方法-isfiniteisnanparseint-parsefloat)
  - [Math 对象新增方法：trunc()去除小数部分，sign()判断是正数还是负数，cbrt()计算立方根](#math-对象新增方法trunc去除小数部分sign判断是正数还是负数cbrt计算立方根)
- [函数扩展](#函数扩展)
  - [默认参数](#默认参数)
  - [rest 参数](#rest-参数)
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
  - [null 判断运算符 ??](#null-判断运算符-)
  - [Object.is](#objectis)
  - [Object.assign](#objectassign)
  - [keys() values() entries()](#keys-values-entries)
- [iterator和for of循环](#iterator和for-of循环)
- [Module](#module)
- [新增数据类型 Symbol、Map、Set](#新增数据类型-symbolmapset)
  - [何时用 Object？何时用 Map？](#何时用-object何时用-map)
- [proxy 数据劫持](#proxy-数据劫持)
- [Promise](#promise)
- [Generator](#generator)
- [async await](#async-await)
- [Class](#class)
- [总结](#总结)
- [阮一峰的 ES6 入门教程](#阮一峰的-es6-入门教程)

## let、const

**`let`**

1. 不会变量提升
2. 不允许重复声明
3. 块级作用域
4. 暂时性死区
   只要块级作用域内存在 let 命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

   ```js
   var tmp = 123;
   
   if (true) {
     tmp = "abc"; // ReferenceError
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
let [a, b, c] = [1, 2, 3];
let { foo, bar } = { foo: "a", bar: "b" };

// 默认值
let [x, y = "b"] = ["a"]; // x='a', y='b'
```

## 字符串的扩展

### 能被 `for of` 遍历

```js
for (let codePoint of "foo") {
  console.log(codePoint);
}
// "f"
// "o"
// "o"
```

### \`\` 字符串模板

### 新增方法 includes、startsWith、endsWith

- includes()：返回布尔值，表示是否找到了参数字符串。
- startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
- endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。

```js
let s = "Hello world!";

s.startsWith("Hello"); // true
s.endsWith("!"); // true
s.includes("o"); // true

// 三个方法都支持第二个参数，endsWith表示从0-n，其他两个方法表示开始搜索的位置。
```

repeat 方法返回一个新字符串，表示将原字符串重复 n 次。

```js
"x".repeat(3); // "xxx"
"hello".repeat(2); // "hellohello"
"na".repeat(0); // ""
```

padStart、padEnd。补全字符串

```js
"x".padStart(5, "ab"); // 'ababx'
"x".padEnd(5, "ab"); // 'xabab'
```

trimStart、trimEnd。消除收或尾空格

```js
const s = "  abc  ";

s.trim(); // "abc"
s.trimStart(); // "abc  "
s.trimEnd(); // "  abc"
```

replaceAll。替换所有匹配

```js
"aabbcc".replaceAll("b", "_"); // 'aa__cc'
// 类似
"aabbcc".replace(/b/g, "_");
```

## 数值的扩展

### Number 上新增方法 isFinite、isNaN、parseInt, parseFloat

1. isFinite、isNaN

```js
/**
 * 判断是否为有限数值
 * 1.类型不为number，统一返回false
 */
Number.isFinite(15); // true
Number.isFinite(Infinity); // false

/**
 * 检查是否为NaN
 * 1.类型不为NaN，统一返回false
 */
Number.isNaN(NaN); // true
Number.isNaN(15); // false
```

他们与传统的全局方法 isFinite()和 isNaN()的区别在于，传统方法先调用 Number()将非数值的值转为数值，再进行判断。

2. Number.parseInt(), Number.parseFloat()
   ES6 将全局方法 parseInt()和 parseFloat()，移植到 Number 对象上面，行为完全保持不变。

3. Number.isInteger。判断数值是否为整数

```js
Number.isInteger(); // false
Number.isInteger(null); // false
Number.isInteger("15"); // false
Number.isInteger(true); // false
Number.isInteger(25); // true
Number.isInteger(25.0); // true
```

### Math 对象新增方法：trunc()去除小数部分，sign()判断是正数还是负数，cbrt()计算立方根

```js
// 去除一个数的小数部分，返回整数部分。
Math.trunc(4.1); // 4

// 判断一个数到底是正数、负数、还是零
Math.sign(-5); // -1
Math.sign(5); // +1
Math.sign(0); // +0
Math.sign(-0); // -0
Math.sign(NaN); // NaN

// 计算立方根
Math.cbrt(-1); // -1
Math.cbrt(0); // 0
Math.cbrt(1); // 1
Math.cbrt(2); // 1.2599210498948732
```

## 函数扩展

### 默认参数

```js
function log(x, y = "World") {
  console.log(x, y);
}

// 指定默认值的参数length会失真
log.length; // 1
```

### rest 参数

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
var f = (v) => v;
```

使用注意：

（1）函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。

（2）不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误。

（3）不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

（4）不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

## 数组的扩展

### ...扩展运算符

```js
console.log(...[1, 2, 3]); // 1 2 3
```

### Array.from()

将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

```js
let arrayLike = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
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
[1, 2, 3, 4, 5].copyWithin(0, 3);
// [4, 5, 3, 4, 5]
```

### find()、findIndex()

```js
[1, 4, -5, 10].find((n) => n < 0);
// -5
```

find 用于找出第一个符合条件的数组成员。所有数组成员依次执行该回调函数，直到找出第一个返回值为 true 的成员，然后返回该成员。如果没有符合条件的成员，则返回 undefined。

findIndex 类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。

### includes()

判断数组是否包含给定的值

参数：该方法的第二个参数表示搜索的起始位置，默认为 0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为 3），则会重置为从 0 开始。

```js
[1, 2, 3]
  .includes(2) // true
  [(1, 2, 3)].includes(4) // false
  [(1, 2, NaN)].includes(NaN); // true
```

### flat()、flatMap()

flat 用于扁平化数组，接收一个{number}的参数，表示要扁平化的层数。

1. infinity 表示无限层
2. 如果有空位，flat 会跳过

```js
[1, 2, [3, [4, 5]]].flat(2); // [1, 2, 3, 4, 5]
```

flatMap 对原数组的每个成员执行一个函数（相当于执行 Array.prototype.map()），然后对返回值组成的数组执行 flat()方法。该方法返回一个新数组，不改变原数组。

```js
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2]);
// [2, 4, 3, 6, 4, 8]
```

## 对象的扩展

### 属性简写

```js
const foo = "bar";
const baz = { foo }; // {foo: "bar"}

function f(x, y) {
  return { x, y };
}
f(1, 2); // Object {x: 1, y: 2}

// 方法简写
const o = {
  method() {
    return "Hello!";
  },
};
```

### 属性名表达式

```js
let obj = {
  ["h" + "ello"]() {
    return "hi";
  },
};

obj.hello(); // hi
```

### 属性的遍历

ES6 一共有 5 种方法可以遍历对象的属性。

（1）for...in

for...in 循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

（2）Object.keys(obj)

Object.keys 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

（3）Object.getOwnPropertyNames(obj)

Object.getOwnPropertyNames 返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

（4）Object.getOwnPropertySymbols(obj)

Object.getOwnPropertySymbols 返回一个数组，包含对象自身的所有 Symbol 属性的键名。

（5）Reflect.ownKeys(obj)

Reflect.ownKeys 返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

### 解构

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x; // 1
y; // 2
z; // { a: 3, b: 4 }
```

### 链判断运算符 ?.

ES2020 引入

```js
a?.b;
// 等同于
a == null ? undefined : a.b;

a?.[x];
// 等同于
a == null ? undefined : a[x];

a?.b();
// 等同于
a == null ? undefined : a.b();

a?.();
// 等同于
a == null ? undefined : a();
```

### null 判断运算符 ??

?? 与 || 类似，但仅限左侧值为 null 或 undefined 时执行，目的是配合 ?. 使用。

```js
const animationDuration = response.settings?.animationDuration ?? 300;
```

### Object.is

判断数值是否相等，与 === 几乎相等，区别是

- +0 不等于-0
- NaN 等于自身

```js
Object.is("foo", "foo"); // true

Object.is(+0, -0); // false
Object.is(NaN, NaN); // true
```

### Object.assign

对象浅拷贝

### keys() values() entries()

```js
let { keys, values, entries } = Object;
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

## iterator和for of循环
ES6实现iterator接口的目的是为了所有的数据结构提供统一的遍历机制：`for of` 循环。

iterator接口的内部实现：
```js
function makeIterator(data) {
  let index = 0;
  return {
    next() {
      return index >= data.length
        ? { value: data[index++], done: true }
        : { value: data[index++], done: false };
    },
  };
}

const iterator = makeIterator([1, 2]);

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

iterator接口默认部署在 `Symbol.iterator` 上，而 `Array/TypedArray/String/Map/Set/arguments/NodeList` 等数据结构都拥有该接口属性，只要拥有 `Symbol.iterator` 属性的数据接口都能被for of 遍历。

```js
let str = '123'
let arr = ['a','b','c']
let map = new Map([['name','jack ma'], ['job', 'drink tea']])

for (const iterator of str) {
  console.log(iterator);
}
// 1 2 3
for (const iterator of arr) {
  console.log(iterator);
}
// a b c
for (const iterator of map) {
  console.log(iterator);
}
// [ 'name', 'jack ma' ]  [ 'job', 'drink tea' ]
```

运行for of时，默认会去找数据的 `Symbol.iterator` 属性，该属性对应一个函数，执行后返回当前数据的遍历器对象。

## Module

## 新增数据类型 Symbol、Map、Set

**Symbol**
基础数据类型，独一无二的值

**注意事项**

Symbol 作为属性名，遍历对象的时候，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回。

但是，它也不是私有属性，有一个`Object.getOwnPropertySymbols()`方法，可以获取指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。



使用场景

1. 消除魔法字符串
   假如有一个 tabs 切换功能

```js
if (type === "basic") {
  return <div>basic tab</div>;
}

if (type === "super") {
  return <div>super tab</div>;
}
```

使用 Symbol 改造

```js
const tabTypes = {
  basic: Symbol(),
  super: Symbol(),
};

if (type === tabTypes.basic) {
  return <div>basic tab</div>;
}

if (type === tabTypes.super) {
  return <div>super tab</div>;
}
```

2. 当做对象属性
   当一个复杂对象中含有多个属性的时候，很容易将某个属性名覆盖掉，利用 Symbol 值作为属性名可以很好的避免这一现象。

```js
const name = Symbol("name");
const obj = {
  [name]: "ClickPaas",
};
```

3. 模拟class的私有方法

```js
const speak = Symbol();
class Person {
    [speak]() {
        ...
    }
}
```



### 何时用 Object？何时用 Map？

用 Map 的场景：

1. 有插入顺序要求
2. 要使用除 String 和 Symbol 类型以外的键名
3. 需要遍历键值对
4. Map 在频繁增删键值对时性能更高
5. 需要统计 key 总个数

用 Object 的场景： 
1. 有使用到对象上的方法，如 toString 等

```js
const map = new Map();
map.set("key", "value");
map.get("key"); // 'value'
```

## proxy 数据劫持

## Promise

## Generator

异步编程的解决方案。

## async await

## Class

## 总结

面试时，记住以下特性，并能说出对应的作用就好

**新增 Api**

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
- rest 参数
- 箭头函数

Object、String、Number、Array 等扩展了一些方法

## 阮一峰的 ES6 入门教程

参考：[ES6 入门教程](https://es6.ruanyifeng.com/)，作者阮一峰
