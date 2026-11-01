console.log(typeof 'hello world') // string
console.log(typeof 1) // number
console.log(typeof true) // boolean
console.log(typeof null) // object
console.log(typeof undefined) // undefined
console.log(typeof []) // object
console.log(typeof {}) // object

console.log('-----')

// 以下是11种：
var number = 1 // [object Number]
var string = '123' // [object String]
var boolean = true // [object Boolean]
var und = undefined // [object Undefined]
var nul = null // [object Null]
var obj = { a: 1 } // [object Object]
var array = [1, 2, 3] // [object Array]
var date = new Date() // [object Date]
var error = new Error() // [object Error]
var reg = /a/g // [object RegExp]
var func = function a() {} // [object Function]
var math = Math // [object Math]
var json = JSON // [object JSON]

function checkType() {
  for (var i = 0; i < arguments.length; i++) {
    console.log(Object.prototype.toString.call(arguments[i]))
  }
  console.log(Object.prototype.toString.call(arguments))
}

checkType(
  number,
  string,
  boolean,
  und,
  nul,
  obj,
  array,
  date,
  error,
  reg,
  func,
  math,
  json
)

console.log('---222--')

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

console.log(type(new Date())) // date
console.log(type([1, 2])) // array
console.log(type(1)) // number
console.log(type({})) // object

// 测试方法
// function testType() {
//   for (var i = 0; i < arguments.length; i++) {
//     console.log(type(arguments[i]))
//   }
// }

// testType(number, string, boolean, und, nul, obj, array, date, error, reg, func)
