class People {
  constructor(name) {
    this.name = name
  }
  eat() {
    console.log(this.name + ' can eat food')
  }
}

class Teacher extends People {
  constructor(name, studyNo) {
    super(name)
    this.studyNo = studyNo
  }
  getStudyNo() {
    return this.studyNo
  }
}

const tom = new Teacher('tom', 1)

tom.eat()
console.log(tom.getStudyNo())
console.log(typeof People)
console.log(People.prototype)
