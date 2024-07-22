- [Vue3 开发注意事项](#vue3-开发注意事项)
  - [组合式函数](#组合式函数)
    - [用 ref 还是 reactive？](#用-ref-还是-reactive)
    - [只能在 \<script setup\> 或 setup() 中调用](#只能在-script-setup-或-setup-中调用)
    - [在选项式中使用组合式函数](#在选项式中使用组合式函数)
  - [响应式数据](#响应式数据)
    - [ref 注意事项](#ref-注意事项)
    - [reactive 注意事项](#reactive-注意事项)
    - [shallowReactive 注意事项](#shallowreactive-注意事项)
  - [实战](#实战)
    - [props 传递给组合式函数保持响应](#props-传递给组合式函数保持响应)

# Vue3 开发注意事项

## 组合式函数

### 用 ref 还是 reactive？

**✅ 推荐 ref**

从组合式函数返回一个包含多个 ref 的普通的非响应式对象，因为该对象被解构后仍然具有响应性。

**❎ 避免 reactive**

从组合式函数返回一个 reactive 响应式对象，会导致在对象解构过程中丢失与组合式函数内状态的响应性连接。

### 只能在 \<script setup> 或 setup() 中调用

组合式函数在 \<script setup> 或 setup() 钩子中，应始终被同步地调用。部分场景可在像 onMounted 这样的生命周期调用。

目的是为了让 Vue 确定当前是哪个组件，以至于确定：

1. 在该组件挂载声明周期；
2. 注册 computed、watch，以便于组件卸载时停止监听。

### 在选项式中使用组合式函数

必须在 setup()里调用和返回，以便暴露给 this 和模板。

```js
export default {
  setup() {
    const { x, y } = useMouse();
    const { data, error } = useFetch("...");
    return { x, y, data, error };
  },
  created() {
    console.log(this.x);
  },
};
```

## 响应式数据

### ref 注意事项

所有数据结构都可使用 ref

1. 从一般对象中解构、传递给函数不会丢失响应性

```js
const obj = { x: ref(0) };

// 解构
const { x } = obj;
x.value = 1; // obj.x.value = 1 有响应

// 传递给函数
const fn = (x) => (x.value = 2);
fn(obj.x); // obj.x.value = 2 有响应
```

2. 模板中的解包

- 顶层属性自动解包；
- 非顶层属性只读取不计算，会自动解包；
- 非顶层属性计算时，不会自动解包，需.value 或处理为顶层属性

```js
<template>
  <div>
    /* 顶层属性自动解包 */
    {{ count }}
    /* 非顶层属性只读取，会自动解包 */
    {{ data.x }}
    /* 非顶层属性计算，不会自动解包 */
    {{ data.x.value + 1 }}
    /* 将非顶层属性处理为顶层属性，自动解包 */
    {{ x + 1}}
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
const data = { x: ref(1) }
const { x } = data
</script>
```

### reactive 注意事项

1. 仅对象类型有效（对象、数组和 Map、Set 这样的集合类型），基础类型无效请用 ref
2. 直接赋值会失去响应性，若有需要可以额外包一层

```js
let obj = reactive({ count: 0 });
obj = { count: 1 }; // 无响应
```

```js
let obj = reactive({ data: { count: 0 } });
obj.data = { count: 1 }; // 可响应
```

3. 解构、属性赋值变量、传递给函数会失去响应性，请使用 [toRef](https://cn.vuejs.org/api/reactivity-utilities.html#toref) 或 [toRefs](https://cn.vuejs.org/api/reactivity-utilities.html#torefs)

```js
const obj = reactive({ count: 0 });
const fn = (count) => count++;

// 解构
const { count } = obj; // 无响应
// 属性赋值变量
const theCount = obj.count; // 无响应
// 传递给函数
fn(obj.count); // 无响应
```

```js
const { count } = toRefs(obj); // 可响应
const count = toRef(obj, "count"); // 可响应
const fn = (count) => count.value++;
fn(toRef(obj, "count")); // 可响应
```

4. 对象嵌套的所有属性都具有响应式，若只需顶层响应式请用 [shallowReactive](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive)
5. 嵌套 ref 会自动解包，当 ref 是数组或 Map 等原生集合类型除外

```js
const obj = reactive({ count: ref(0), list: ref([1]) });

obj.count; // 0
obj.list.value; // [1]
```

### shallowReactive 注意事项

1. 不会自动解包 ref

```js
const obj = shallowReactive({ x: ref(1) });
obj.x; // {value: 1}
```

## 实战

### props 传递给组合式函数保持响应

直接传递是不具有响应性的，函数内部获取到的是一个固定的值

```js
const props = defineProps(/* ... */);
// 不具有响应性
useSomeFeature(props.foo);
```

需经过 toRef 处理，这样才能保证 props.foo 和函数内部第一参数同步

```js
import { toRef } from "vue";

const props = defineProps(/* ... */);
useSomeFeature(toRef(props, "foo"));
```
