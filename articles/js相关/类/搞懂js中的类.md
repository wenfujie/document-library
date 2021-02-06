- [es5的构造函数和es6的类对比](#es5的构造函数和es6的类对比)
  - [constructor](#constructor)
  - [实例属性](#实例属性)
  - [静态方法和静态属性](#静态方法和静态属性)
  - [new 调用](#new-调用)
  - [getter 和 setter](#getter-和-setter)
  - [继承](#继承)
- [new 关键字做了什么](#new-关键字做了什么)
  - [模拟实现 new 方法](#模拟实现-new-方法)

## es5的构造函数和es6的类对比
**ES6 的 class 和 ES5 的构造函数是如何对应的？**

ES6 的 class 可以看作一个语法糖，它的绝大部分功能，ES5 都可以做到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

### constructor
ES6 中：
```javascript
class Person {
    constructor(name) {
        this.name = name;
    }

    sayHello() {
        return 'hello, I am ' + this.name;
    }
}

var Tom = new Person('Tom');
Tom.sayHello(); // hello, I am Tom
```
对应 ES5 中：
```javascript
function Person(name){
  this.name = name
}
Person.prototype.sayHello = function() {
  return 'hello, I am ' + this.name;
}
var Tom = new Person('Tom');
Tom.sayHello(); // hello, I am Tom
```

### 实例属性
ES6 中：
```javascript
class Person {
  constructor() {
    this.name = 'tom'
  }
}
```
新提案支持以下写法，babel已支持。
```javascript
class Person {
  name = 'tom'
}
```

对应 ES5 中：
```javascript
function Person() {
  this.name = 'tom'
}
```

### 静态方法和静态属性
ES6 中：
```javascript
class Person {
  static sayHello() {
    console.log('hello')
  }
}
// 静态属性
Person.name = 'tom'
```
或 新提案静态属性写法：
```javascript
class Person {
  static name = 'tom'
}
```
对应 ES5 中：
```javascript
function Person() {}
Person.name = 'tom'
Person.sayHello = function() {
    console.log('hello')
}
```

### new 调用
ES6 的类必须使用 new 调用，否则报错。而 ES5 的构造函数可直接执行。这是两者主要区别之一。
```javascript
class Person {}

Person(); // TypeError: Class constructor Foo cannot be invoked without 'new'
```

### getter 和 setter
ES5、ES6 都可以使用 get 和 set 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

ES6 中：
```javascript
class Person {
  get name(){
    return 'tom'
  }
  set name(val) {
    console.log('set name: ' + val)
  }
}
```
对应 ES5 中：
```javascript
function Person(name) {}

Person.prototype = {
    get name() {
        return 'kevin';
    },
    set name(newName) {
        console.log('new name 为：' + newName)
    }
}
```

### 继承
ES6 中：
Class 通过关键字 `extends` 实现继承。
```javascript
class Parent {
    constructor(name) {
        this.name = name;
    }
}

class Child extends Parent {
    constructor(name, age) {
        super(name); // 调用父类的 constructor(name)
        this.age = age;
    }
}

var child1 = new Child('kevin', '18');
```
注意：

`super` 关键字表示父类的构造函数，相当于 ES5 的 `Parent.call(this)`。

子类必须在 constructor 方法中调用 `super` 方法，否则新建实例时会报错。这是因为子类没有自己的 `this` 对象，而是继承父类的 `this` 对象，然后对其进行加工。如果不调用 `super` 方法，子类就得不到 `this` 对象。

也正是因为这个原因，在子类的构造函数中，只有调用 `super` 之后，才可以使用 `this` 关键字，否则会报错。

对应 ES5 中寄生组合式继承：
```javascript
function Parent (name) {
    this.name = name;
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}

Child.prototype = Object.create(Parent.prototype);

var child1 = new Child('kevin', '18');
```
## new 关键字做了什么

- 创建一个对象
- 该对象隐式原型 `__proto__` 属性指向构造函数的显示原型 `prototype` 。
- this 指向该对象来执行构造函数
- 判断执行结果返回值是否为 object ，是则返回执行结果，否则返回第一步创建的对象

```javascript
var person1 = new Person()

// new 执行步骤
var obj = {}
obj.__proto__ = Person.prototype
var result = Person.apply(obj)
return result === null ? obj : result
```

### 模拟实现 new 方法

实现代码
```javascript
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
```

**为什么最后要 `return typeof result === 'object' ? result : obj` 这样判断**

我们需要知道构造函数三种返回情况对实例对象的影响
1. 返回一个对象
2. 没有 return，即返回 undefined
3. 返回undefined 以外的基本类型

**情况1**：返回一个对象
```javascript
function Car(color, name) {
    this.color = color;
    return {
        name: name
    }
}

var car = new Car("black", "BMW");
car.color; // undefined
car.name; // "BMW"
```
可看出实例对象 car 就是构造函数所返回对象

**情况2**：返回 undefined
```javascript
function Car(color, name) {
    this.color = color;
}

var car = new Car("black", "BMW");
car.color; // black
car.name; // undefined
```
可看出实例对象 car 能访问构造函数的属性

**情况3**：返回 基础类型
```javascript
function Car(color, name) {
    this.color = color;
    return 'hello'
}

var car = new Car("black", "BMW");
car.color; // black
car.name; // undefined
```
可看出实例对象 car 能访问构造函数的属性

**总结**：所以需要判断构造函数返回的值是不是一个对象，如果是对象则返回这个对象，不然返回新创建的obj对象。