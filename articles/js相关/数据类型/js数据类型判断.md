
## 基础数据类型判断

**使用 typeof 操作符判断基础数据类型**

引用《javascript权威指南》对 `typeof` 的介绍
> typeof 是一元操作符，放在其单个操作数的前面，操作数可以是任意类型。返回值为表示操作数类型的一个字符串。

如果不对 `object` 类型展开，那么在es6之前，js 有6中数据类型。
- string
- number
- boolean
- undefined
- null
- object

```javascript
console.log(typeof 'hello world') // string
console.log(typeof 1) // number
console.log(typeof true) // boolean
console.log(typeof undefined) // undefined
console.log(typeof {}) // object

// null其实属于对象类型下的一种子类型
console.log(typeof null) // objec
// 常用的数组类型也一样
console.log(typeof []) // object
```

**小结**： `typeof` 能判断基础数据类型，但无法判断复杂数据类型。

## 复杂数据类型判断
Object 下细分了许多复杂类型
- Date
- Array
- Error
- Function
- Regexp

以上数据类型使用 `typeof` 判断都返回 `object`。

使用更强大的判断方法来判断复杂数据类型

 **`Object.prototype.toString`**
 
 它几乎可以判断所有的数据类型。

**ES5 规范对它的描述**

[Object.prototype.toString](https://es5.github.io/#x15.2.4.2)

>When the toString method is called, the following steps are taken:

>1. If the this value is undefined, return **"[object Undefined]"**.
>2. If the this value is null, return **"[object Null]"**.
>3. Let O be the result of calling ToObject passing the this value as the argument.
>4. Let class be the value of the **[[Class]]** internal property of O.
>5. Return the String value that is the result of concatenating the three Strings **"[object ", class, and "]"**.

通过规范，可以了解到 **`Object.prototype.toString`** 会返回如下字符串

```javascript
// Class 是要判断的数据的内部属性，其他部分为固定string
`[obejct ${Class}]`
```

来个demo，看看有多强大

```javascript
// 以下是14种：
var number = 1;          // [object Number]
var string = '123';      // [object String]
var boolean = true;      // [object Boolean]
var und = undefined;     // [object Undefined]
var nul = null;          // [object Null]
var obj = {a: 1}         // [object Object]
var array = [1, 2, 3];   // [object Array]
var date = new Date();   // [object Date]
var error = new Error(); // [object Error]
var reg = /a/g;          // [object RegExp]
var func = function a(){}; // [object Function]
var math = Math // [object Math]
var json = JSON // [object JSON]

function checkType() {
    for (var i = 0; i < arguments.length; i++) {
        console.log(Object.prototype.toString.call(arguments[i]))
    }

    // arguments 也可以判断
    console.log(Object.prototype.toString.call(arguments)) // [object Arguments]
}

checkType(number, string, boolean, und, nul, obj, array, date, error, reg, func, math, json)
```

## 封装一个数据判断方法

**设计：**
如果是简单类型直接使用 `typeof` 判断，否则使用 `Object.prototype.toString` 判断，结果统一使用小写。

`@param obj` 要判断类型的数据

`@return {string}` 数据类型（小写）


通常不会对 arguments 、Math 、JSON 等数据类型判断，所以去掉这些类型。

```javascript
const type = (function () {
  // 映射类型
  const classType = 'Boolean Number String Function Array Date RegExp Object Error Null Undefined'
    .split(' ')
    .reduce((obj, item) => {
      obj['[object ' + item + ']'] = item.toLowerCase()
      return obj
    }, {})

  return function (obj) {
    return typeof obj === 'object'
      ? classType[Object.prototype.toString.call(obj)]
      : typeof obj
  }
})()

// use
console.log(type(new Date())) // date
console.log(type([1, 2])) // array
console.log(type(1)) // number
console.log(type({})) // object
```

在 IE6 中，null 和 undefined 会被 Object.prototype.toString 识别成 [object Object]！

**兼容处理**
```javascript
const type = (function () {
  // 映射类型
  const classType = 'Boolean Number String Function Array Date RegExp Object Error Null Undefined'
    .split(' ')
    .reduce((obj, item) => {
      obj['[object ' + item + ']'] = item.toLowerCase()
      return obj
    }, {})

  return function (obj) {
    // 仅 undefined 与 null 成立
    if(obj == null){
      return obj + ''
    }
    return typeof obj === 'object'
      ? classType[Object.prototype.toString.call(obj)]
      : typeof obj
  }
})()
```

**封装独立的数据类型判断**

判断函数
```javascript
function isFunction(data) {
  return type(data) === 'function'
}
```
判断数组
```javascript
var isArray = Array.isArray || function (data) {
  return type(data) === 'array'
}
```


参考：[JavaScript专题之类型判断(上) #28](https://github.com/mqyqingfeng/Blog/issues/28)

