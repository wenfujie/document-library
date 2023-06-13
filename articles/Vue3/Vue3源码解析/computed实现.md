# computed 实现

## 如何使用

### 只读计算属性

```js
const count = ref(1);
const plusOne = computed(() => count.value + 1);

console.log(plusOne.value); // 2

plusOne.value++; // 错误
```

### 可写计算属性

```js
const count = ref(1);
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1;
  },
});

plusOne.value = 1;
console.log(count.value); // 0
```

## 如何实现

### 标准化入参

只读计算属性传入 getter 函数，可写计算属性传入包含 get、set 的 options，所以一开始需标准化入参

```js
function computed(getterOrOptions) {
  let getter, setter;
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
    setter = NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
}
```

### 为 getter 添加副作用

```js
const runner = effect(getter, {
  ...
});
```

effect 主要实现了依赖收集以及计算 getter 的值

### 返回代理对象

```js
function computed(getterOrOptions) {
  // ...

  const computed = {
    get value() {
      value = runner();
      // 依赖收集，收集运行访问该计算属性的 activeEffect
      track(computed, "get" /* GET */, "value");
      return value;
    },

    set value(newValue) {
      // 计算属性的 setter
      setter(newValue);
    },
  };
  return computed;
}
```

返回代理对象，让外部在通过 xx.value 获取或设置计算数据时，才触发依赖收集。



### 完整的实现代码

```js
function computed(getterOrOptions) {
  let getter, setter;

  // 标准化参数
  if (isFunction(getterOrOptions)) {
    // 表面传入的是 getter 函数，不能修改计算属性的值
    getter = getterOrOptions;
    setter =
      process.env.NODE_ENV !== "production"
        ? () => {
            console.warn("Write operation failed: computed value is readonly");
          }
        : NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }

  // 数据是否脏的
  let dirty = true;
  // 计算结果
  let value;
  let computed;

  // 创建副作用函数
  const runner = effect(getter, {
    // 延时执行
    lazy: true,
    // 标记这是一个 computed effect 用于在 trigger 阶段的优先级排序
    computed: true,
    // 调度执行的实现
    scheduler: () => {
      if (!dirty) {
        dirty = true;

        // 派发通知，通知运行访问该计算属性的 activeEffect
        trigger(computed, "set" /* SET */, "value");
      }
    },
  });

  // 创建 computed 对象
  computed = {
    __v_isRef: true,

    // 暴露 effect 对象以便计算属性可以停止计算
    effect: runner,

    get value() {
      // 计算属性的 getter
      if (dirty) {
        // 只有数据为脏的时候才会重新计算
        value = runner();
        dirty = false;
      }

      // 依赖收集，收集运行访问该计算属性的 activeEffect
      track(computed, "get" /* GET */, "value");
      return value;
    },

    set value(newValue) {
      // 计算属性的 setter
      setter(newValue);
    },
  };

  return computed;
}
```



## 对比普通函数优势

1. 延时计算，只有当我们访问计算属性的时候，它才会真正运行 computed getter 函数计算；
2. 缓存，它的内部会缓存上次的计算结果 value，而且只有 dirty 为 true 时才会重新计算。如果访问计算属性时 dirty 为 false，那么直接返回这个 value。