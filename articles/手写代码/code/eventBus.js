
// 使用了发布订阅模式

class Bus {
  constructor() {
    // {eventName: [cb1,cb2]}
    this.evnets = {};
  }
  $emit(eventName, ...params) {
    let callbacks = this.evnets[eventName];
    if (!callbacks) return;

    // 避免通过 once 安装的监听器在移除的过程中出现顺序问题，此处需要浅拷贝
    callbacks = callbacks.slice();
    callbacks.forEach((item) => item(...params));
  }
  $on(eventName, cb) {
    if (!this.evnets[eventName]) {
      this.evnets[eventName] = [];
    }
    this.evnets[eventName].push(cb);
  }
  $off(eventName, cb) {
    const callbacks = this.evnets[eventName];
    if (callbacks && callbacks.length) {
      const index = callbacks.findIndex((item) => item === cb);
      index !== -1 && callbacks.splice(index, 1);
    }
  }
  $once(eventName, cb) {
    this.$on(eventName, (...params) => {
      this.$off(eventName);
      cb(...params);
    });
  }
}