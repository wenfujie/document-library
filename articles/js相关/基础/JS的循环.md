<!--
 * @Date: 2021-08-29 15:47:03
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-09-12 09:12:25
 * @FilePath: /document-library/articles/js相关/基础/JS的循环.md
-->

## do-while
**后判断循环语句**

do 后面的代码块会先执行一次，然后才判断，如果条件成立再次执行 do 代码块，否则结束循环。

```js
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 3);

// 0,1,2
```
## while
**先判断循环语句**

先执行判断，如果判断成立执行代码块，否则结束循环。

使用场景：循环体代码块至少需要执行一次的时候。
```js
let i = 0
while(i<3){
  console.log(i);
  i++
}

// 0,1,2
```

## for

for循环其实就是while的封装版，把定义变量、结束条件、递增都放在 `for()` 中。

```js
for (let i = 0; i < 3; i++) {
  console.log(i);
}

// 0,1,2
```

## for-in

for-in 遍历的是key

for-in 更适合遍历对象，当然也可以遍历数组.

```js
// for in
const obj = {a:1, b:2, c:3}
const array = ['a', 'b', 'c']

for (let key in obj) {
  console.log(key)
}
// a b c

for (const key in array) {
  console.log(key)
}
// 0 1 2

```

使用 `for-in` 要注意的问题：

- 遍历数组时，key是字符串，不能直接进行计算
- 遍历顺序可能是随机的
- 原型属性也会被遍历，如果不需求可在循环体增加判断 `if(obj.hasOwnProperty(key))`
- 遍历 `null` 、 `undefined` 时，不会循环

## for-of

ES6的语法。

`for-of` 遍历的是value

它可以用来遍历 `数组/类数组/字符串/map/set/arguments` 等拥有迭代器对象（Symbol.iterator）的集合。

对象不拥有迭代器属性

```js
Object.prototype[Symbol.iterator] // undefined
```
因此 `for-of` 不能遍历对象。

`for-of` 简单的使用：

```js
for(const val of [1,2]){
    console.log(val)
}
// 1 2

for(const val of 'abc'){
    console.log(val)
}
// a b c
```

`for-of` 不会遍历原型上的值

```js
var arr = [1,2,3]
Array.prototype.a = 123
    
for (let value of arr) {
  console.log(value)
}
//1 2 3
```