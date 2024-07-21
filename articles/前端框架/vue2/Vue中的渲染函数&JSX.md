## 渲染函数 & JSX

[渲染函数 & JSX (vue3)](https://cn.vuejs.org/guide/extras/render-function.html)

[JSX github 官网](https://github.com/vuejs/babel-plugin-jsx#installation)

在 vue 中，会使用渲染函数 `createVnode()` 用于创建 `vnodes` ，它还有一个更简短的名称 `h()` 。

```js
import { h } from "vue";

const vnode = h(
  "div", // type
  { id: "foo", class: "bar" }, // props
  [
    /* children */
  ]
);
```

相对 `渲染函数` 来说，`JSX` 更灵活，它是 js 的扩展，作用是支持在 js 中书写模板语法，模板最终会被 babel 转化为 `createVnode` 。

```jsx
const vnode = <div id={dynamicId}>hello, {userName}</div>;
```

语法的使用不再介绍，直接看 [渲染函数 & JSX (vue3)](https://cn.vuejs.org/guide/extras/render-function.html) 即可

## 在 Vue 中 使用 JSX

### 在 .vue 文件中使用

```vue
<!-- index.vue -->
<template>
  <div>
    <dom />
  </div>
</template>

// 配置 tsx 语言
<script setup lang="tsx">
const dom = () => <div>123</div>;
</script>
```

### 在 .jsx 中使用

```jsx
// index.jsx
export default {
  setup() {
    return () => <div>123</div>;
  },
};
```

### defineComponent

我们在 `.jsx` 文件下开发是不会像在 `.vue` 下有语法提示的。

`defineComponent` 函数可以帮助我们在定义 Vue 组件时提供类型推导的辅助函数。

```js
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    pay_id: {
      type: String,
      default: "",
    },
  },
  setup(props) {},
});
```

如果是 ts 还可以这样取得组件实例的类型

```ts
const Foo = defineComponent(/* ... */);

type FooInstance = InstanceType<typeof Foo>;
```

## 对比 JSX 和 template 使用场景

**_`template` 优势：_**

1. 官方推荐，模板化固定的语法，便于静态标记和分析，使得编译器能应用许多编译时的优化，提升性能。
2. 贴近实际的 `HTML`，利于重用已有的`HTML`代码片段，便于理解和修改。

**_`Render & JSX`优势：_**

1. 处理高度动态的逻辑时，渲染函数相比于模板更加灵活。
2. 一个文件中可以返回多个组件。
3. 利于`React`开发者快速上手`Vue`

## 函数式组件

我们经常写的 `.vue` 格式内容包含 `template` 、`script` 、`style` ，并且需要注册声明的组件叫做 `声明式组件` 。

> 函数式组件：是一种定义自身没有任何状态的组件的方式。它们很像纯函数：接收 props，返回 vnodes。函数式组件在渲染过程中不会创建组件实例 (也就是说，没有 this)，也不会触发常规的组件生命周期钩子。

[vue3 函数式组件](https://cn.vuejs.org/guide/extras/render-function.html#functional-components)

`函数式组件` 本质上就是组件的渲染函数，该函数签名与 `setup()` 钩子相同

```js
function MyComponent(props, { slots, emit, attrs }) {
  // ...
}
```

`函数式组件` 中除了 props 和 emits 其他配置选项都无效。

```js
// 声明 props、emits 的语法
MyComponent.props = ["value"];
MyComponent.emits = ["click"];
```

如果没有声明 `props` ，函数中 props 会包含所有属性，模板上只有 `class` 、`style` 和 `onXxx` 事件监听器将默认从 attrs 中继承。

`函数式组件` 可以像普通组件一样被注册和使用。如果你将一个函数作为第一个参数传入 h，它将会被当作一个函数式组件来对待。

```js
<template>
    <dom />
</template>

<script setup lang="tsx">
  {/* 函数式组件 */}
  const dom = () => <div>123</div>;
</script>
```
