// class People {
//   constructor(name) {
//     this.name = name
//   }
//   eat() {
//     console.log(this.name + ' can eat food')
//   }
// }

// class Teacher extends People {
//   constructor(name, studyNo) {
//     super(name)
//     this.studyNo = studyNo
//   }
//   getStudyNo() {
//     return this.studyNo
//   }
// }

// const tom = new Teacher('tom', 1)

// tom.eat()
// console.log(tom.getStudyNo())
// console.log(typeof People)
// console.log(People.prototype)

function create() {
  var obj = {}
  // 删除 arguments 第一个值并返回
  var constructor = Array.prototype.shift.apply(arguments)
  obj.__proto__ = constructor.prototype
  var result = constructor.apply(obj, arguments)
  return typeof result === 'object' ? result : obj
}

// use
function Person(name) {
  this.name = name
}

console.log(create(Person, 'tom')) // { name: 'tom' }
