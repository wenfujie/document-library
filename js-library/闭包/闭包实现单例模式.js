
// 单例模式：保证类只有一个实例，并提供一个全局的访问点。
// 实现步骤：判断是否已创建实例，如果已创建则直接返回，如果未创建则创建一个实例并返回。

// 目标类
class Person {
  constructor(name) {
    console.log('触发了构造函数');
    this.name = name;
  }

  sayHello() {
    console.log(`hello,my name is ${this.name}`);
  }
}

// 代理实现单例模式
let proxyMode = (function () {
  let instance = null;

  return function (name) {
    if (!instance) {
      instance = new Person(name);
    }

    return instance;
  }
})();

let personA = new proxyMode('wen');
let personB = new proxyMode('fu');

personA.sayHello();
personB.sayHello();
