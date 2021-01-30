- [基础数据类型判断](#基础数据类型判断)
- [复杂数据类型判断](#复杂数据类型判断)
- [封装一个数据判断方法](#封装一个数据判断方法)
- [拓展：判断空对象](#拓展判断空对象)
- [拓展：判断 window 对象](#拓展判断-window-对象)
- [拓展：判断 DOM 元素](#拓展判断-dom-元素)
- [拓展：判断数组类型的几种方式比较](#拓展判断数组类型的几种方式比较)
  - [方式一：使用 instanceof 判断](#方式一使用-instanceof-判断)
  - [方式二：使用 Object 原型上的toString方法](#方式二使用-object-原型上的tostring方法)
  - [方式三：es5 增加的 Array.isArray](#方式三es5-增加的-arrayisarray)
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

## 拓展：判断空对象
jQuery 提供了 `isEmptyObject` 方法判断空对象

**原理**：只要 for 循环有执行，就表示具有属性，有属性即非空对象，否则为空对象。

```javascript
function isEmptyObject( obj ) {
  var name;
  for ( name in obj ) {
    return false;
  }
  return true;
}

// 可以看出，判断的并不仅仅是空对象
console.log(isEmptyObject({})); // true
console.log(isEmptyObject([])); // true
console.log(isEmptyObject(null)); // true
console.log(isEmptyObject(undefined)); // true
console.log(isEmptyObject(1)); // true
console.log(isEmptyObject('')); // true
console.log(isEmptyObject(true)); // true
```

所以可以根据场景，结合使用 `type` 方法判断.
```javascript
function isEmptyObject( obj ) {
  if(type(obj) !== 'object') return false;
  var name;
  for ( name in obj ) {
    return false;
  }
  return true;
}
```

## 拓展：判断 window 对象
**判断原理**：`window` 对象有一个window属性指向自己

```javascript
function isWindow(data) {
  return !!data && data === data.window
}
```

## 拓展：判断 DOM 元素
**判断原理**：DOM 元素的 `nodeType` 值为1
```javascript
function isElement(data) {
  return !!data && data.nodeType === 1
}
```

## 拓展：判断数组类型的几种方式比较
### 方式一：使用 instanceof 判断

判断原理：判断数据原型是否为Array。

```javascript
  console.log([] instanceof Array) // true
  console.log({} instanceof Array) // false
```

弊端一：复杂数据类型 instanceof Object 时都返回true

```javascript
  console.log([] instanceof Object) // true
  console.log({} instanceof Object) // true
```

弊端二：修改数据的原型，导致判断错误

```javascript
  let a = []
  a.__proto__ = {}
  console.log(a instanceof Array) // false
```

### 方式二：使用 Object 原型上的toString方法

判断原理： Object 原型上的toString方法会返回描述数据类型的字符串

```javascript
  // 判断数组
  Object.prototype.toString.call([]) === '[object Array]'
```

### 方式三：es5 增加的 Array.isArray

该方式最为简洁

```javascript
  Array.isArray([]) // true
  Array.isArray({}) // false
```

弊端：由于是es5增加函数，所以不兼容IE8以下浏览器

可以做如下兼容处理


```javascript
  if (!Array.isArray) {
    Array.isArray = function (data) {
      return Object.prototype.toString.call(data) === '[object Array]'
    }
  }
```


参考：[JavaScript专题之类型判断(上) #28](https://github.com/mqyqingfeng/Blog/issues/28)

