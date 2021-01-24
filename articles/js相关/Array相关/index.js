let a = []
a.__proto__ = {}
console.log(a instanceof Array)

console.log([] instanceof Array) // true
console.log({} instanceof Array) // false
console.log([] instanceof Object) // true

console.log([] instanceof Object) // true
console.log(123 instanceof Object) // true
console.log('hello' instanceof Object) // true

let obj = { a: 123 }
console.log(Object.prototype.toString.call(obj))

let num = Object.prototype.toString.call(123)
let str = Object.prototype.toString.call('hello')
let arr = Object.prototype.toString.call([])
let objData = Object.prototype.toString.call({})
let undefinedData = Object.prototype.toString.call(undefined)
let nullData = Object.prototype.toString.call(null)

console.log(num, str, arr, objData, undefinedData, nullData)

console.log(Array.isArray([]))
console.log(Array.isArray(123))
console.log(Array.isArray({}))

if (!Array.isArray) {
  Array.isArray = function (data) {
    return Object.prototype.toString.call(data) === '[object Array]'
  }
}

// 递归实现数组扁平化
function flatten(arr) {
  return arr.reduce((preArr, item) => {
    return preArr.concat(Array.isArray(item) ? flatten(item) : item)
  }, [])
}

console.log(
  flatten([
    [
      [1, 2, 3],
      [4, 5]
    ],
    [7, 8]
  ])
)
