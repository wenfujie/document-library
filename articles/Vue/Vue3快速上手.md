- [语法](#语法)
  - [组合式API](#组合式api)
    - [setup](#setup)
    - [响应式](#响应式)
    - [生命周期](#生命周期)
    - [watch](#watch)
    - [watchEffect](#watcheffect)
    - [computed](#computed)
    - [getCurrentInstance 获取实例](#getcurrentinstance-获取实例)
    - [provide / inject](#provide--inject)
    - [props](#props)
    - [emits](#emits)
    - [$refs](#refs)
    - [$nextTick](#nexttick)
    - [directive](#directive)
    - [v-model](#v-model)
  - [已移除](#已移除)
    - [过滤器](#过滤器)
    - [$children](#children)
    - [$listeners](#listeners)
  - [其他](#其他)
    - [资源](#资源)
    - [JSX](#jsx)
    - [注意事项](#注意事项)


## 语法

### 组合式API

#### setup

`setup` 的调用发生在 `data` 、`computed`  或 `methods` 被解析之前，所以它们无法在 `setup` 中被获取。

```js
import { fetchUserRepositories } from '@/api/repositories'
import { ref } from 'vue'

export default {
  setup (props) {
    const repositories = ref([])
    const getUserRepositories = async () => {
      repositories.value = await fetchUserRepositories(props.user)
    }

    return {
      repositories,
      getUserRepositories // 返回的函数与方法的行为相同
    }
  }
}
```

使用 `expose`暴露属性：

使用渲染函数无法暴露属性时，可以用 `expose`来暴露属性

```js
// MyBook.vue

import { h } from 'vue'

export default {
  setup(props, { expose }) {
    const reset = () => {
      // 某些重置逻辑
    }

    // expose 只能被调用一次。
    // 如果需要暴露多个 property，则它们
    // 必须全部包含在传递给 expose 的对象中。
    expose({
      reset
    })

    return () => h('div')
  }
}
```



#### 响应式

`ref` 处理简单属性

```js
const count = ref(0)
console.log(count.value) // 0
```

``reactive``处理引用属性

```js
const obj = reactive({ count: 0 })

obj.count++
console.log(obj.count) // 3
```



#### 生命周期

`beforeCreate` 和 `created`写在 setup 中即可。

**Hook inside** `setup`：

| `onBeforeMount`     |
| ------------------- |
| `onMounted`         |
| `onBeforeUpdate`    |
| `onUpdated`         |
| `onBeforeUnmount`   |
| `onUnmounted`       |
| `onErrorCaptured`   |
| `onRenderTracked`   |
| `onRenderTriggered` |
| `onActivated`       |
| `onDeactivated`     |

```js
import { onMounted } from 'vue'

setup (props) {
	const fn = ()=>{}
  onMounted(fn)
}
```



#### watch

```js
import { ref, watch } from 'vue'

const counter = ref(0)
watch(counter, (newValue, oldValue) => {
  console.log('The new counter value is: ' + counter.value)
})
```

**监听getter**

```js
// 侦听一个 getter
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)
```

**监听多个数据**

```js
const firstName = ref('')
const lastName = ref('')

watch([firstName, lastName], (newValues, prevValues) => {
  console.log(newValues, prevValues)
})

firstName.value = 'John' // logs: ["John", ""] ["", ""]
lastName.value = 'Smith' // logs: ["John", "Smith"] ["John", ""]
```

**监听数组、对象**

数组

```js
const numbers = reactive([1, 2, 3, 4])

watch(
  () => [...numbers],
  (numbers, prevNumbers) => {
    console.log(numbers, prevNumbers)
  }
)

numbers.push(5) // logs: [1,2,3,4,5] [1,2,3,4]
```

对象

```js
const state = reactive({ 
  id: 1,
  attributes: { 
    name: '',
  }
})

watch(
  () => state,
  (state, prevState) => {
		
  }
)

state.id = 'Alex'
```

深度监听 deep

```js
watch(
  () => state,
  (state, prevState) => {
    console.log('deep', state.attributes.name, prevState.attributes.name)
  },
  { deep: true }
)
```



#### watchEffect

立即调用传入的函数，后续响应式属性改变时也会触发。

与 `watch`对比：

- 所有函数中的响应状态都会触发
- 获取不到状态旧值

**注册**

```js
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> logs 0

setTimeout(() => {
  count.value++
  // -> logs 1
}, 100)
```

**销毁**

```js
const stop = watchEffect(() => {})

// later
stop()
```

**销毁回调**

```js
const data = ref(null)
watchEffect(async onInvalidate => {
  // 我们在Promise解析之前注册清除函数
  onInvalidate(() => {
		data.value = null
  }) 

  data.value = await fetchData(props.id)
})
```

**触发时机**

flush 默认为 `'pre'`表示在组件更新前触发，`post`表示在组件更新后触发。

```js
// 在组件更新后触发，这样你就可以访问更新的 DOM。
// 注意：这也将推迟副作用的初始运行，直到组件的首次渲染完成。
watchEffect(
  () => {
    /* ... */
  },
  {
    flush: 'post'
  }
)
```



#### computed

```js
import { ref, computed } from 'vue'

const counter = ref(0)
const twiceTheCounter = computed(() => counter.value * 2)

counter.value++
console.log(counter.value) // 1
console.log(twiceTheCounter.value) // 2
```



#### getCurrentInstance 获取实例

> `getCurrentInstance` 只暴露给高阶使用场景，典型的比如在库中。强烈反对在应用的代码中使用 `getCurrentInstance`。请**不要**把它当作在组合式 API 中获取 `this` 的替代方案来使用。



`getCurrentInstance` **只能**在 [setup](https://v3.cn.vuejs.org/api/composition-api.html#setup) 或[生命周期钩子](https://v3.cn.vuejs.org/api/composition-api.html#生命周期钩子)中调用。

```js
const MyComponent = {
  setup() {
    const internalInstance = getCurrentInstance() // 有效

    const id = useComponentId() // 有效

    const handleClick = () => {
      getCurrentInstance() // 无效
      useComponentId() // 无效

      internalInstance // 有效
    }

    onMounted(() => {
      getCurrentInstance() // 有效
    })

    return () =>
      h(
        'button',
        {
          onClick: handleClick
        },
        `uid: ${id}`
      )
  }
}

// 在组合式函数中调用也可以正常执行
function useComponentId() {
  return getCurrentInstance().uid
}
```



#### provide / inject

Provide

```js
// parent

<script>
import { provide } from 'vue'

export default {
  setup() {
    provide('location', 'North Pole')
    provide('geolocation', {
      longitude: 90,
      latitude: 135
    })
  }
}
</script>
```



inject

`inject` 函数有两个参数：

1. 要 inject 的 property 的 name
2. 默认值 (**可选**)

```js
// child

<script>
import { inject } from 'vue'

export default {
  setup() {
    const userLocation = inject('location', 'The Universe')
    const userGeolocation = inject('geolocation')
  }
}
</script>
```



添加响应性

```js
// parent

	setup() {
    const location = ref('North Pole')
    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })

    provide('location', location)
    provide('geolocation', geolocation)
  }
```



注意：**建议尽可能将对响应式 property 的所有修改限制在定义 provide 的组件内部，父组件可暴露方法以供子组件修改属性。**



#### props

```js
<script>
export default {
  props: {
    title: String,
    likes: Number,
    isPublished: Boolean,
    commentIds: Array,
    author: Object,
    callback: Function,
    contactsPromise: Promise // 或任何其他构造函数
	},
    setup(props){
      console.log(props.title)
    }
}
</script>

```



#### emits

```js
<template>
  <div>
    <p>{{ text }}</p>
		// 全局api $emit 触发
    <button v-on:click="$emit('accepted')">OK</button>
  </div>
</template>
<script>
  export default {
    props: ['text'],
    emits: ['accepted'],
    setup(props, { emit }){
      emit('accepted')
    }
  }
</script>
```



#### $refs

```js
<template>
    <div ref="cptRef">...</div>
</template>
<script>
import { ref, onMounted } from 'vue';
export default {
    setup() {
        const cptRef = ref(null);

      	onMounted(()=>{
          // 可通过cptRef.value获取组件上的属性或方法
          console.log(cptRef.value)
        })
        return {
            cptRef
        }
    }
}
</script>
```

V-for 时

```js
<div v-for="item in list" :ref="setItemRef"></div>

import { onBeforeUpdate, onUpdated } from 'vue'

export default {
  setup() {
    let itemRefs = []
    const setItemRef = el => {
      if (el) {
        itemRefs.push(el)
      }
    }
    onBeforeUpdate(() => {
      itemRefs = []
    })
    onUpdated(() => {
      console.log(itemRefs)
    })
    return {
      setItemRef
    }
  }
}
```



#### $nextTick

```js
import { nextTick } from 'vue'

nextTick(() => {
  // 一些和 DOM 有关的东西
})
```

或

```js
const fn = async ()=>{
  await nextTick()
  // 一些和 DOM 有关的东西
}
```



#### directive

新 api

```js
const MyDirective = {
  created(el, binding, vnode, prevVnode) {}, // 新增
  beforeMount() {},
  mounted() {},
  beforeUpdate() {}, // 新增
  updated() {},
  beforeUnmount() {}, // 新增
  unmounted() {}
}
```

使用

```html
<p v-highlight="'yellow'">以亮黄色高亮显示此文本</p>
```

```js
const app = Vue.createApp({})

app.directive('highlight', {
  beforeMount(el, binding, vnode) {
    el.style.background = binding.value
  }
})
```

如何获取组件实例？

```js
mounted(el, binding, vnode) {
  const vm = binding.instance
}
```



#### v-model

`v-model` prop 和事件默认名称已更改：

- prop：`value` -> `modelValue`；
- 事件：`input` -> `update:modelValue`；

```js
<ChildComponent v-model="pageTitle" />

<!-- 是以下的简写: -->

<ChildComponent
  :modelValue="pageTitle"
  @update:modelValue="pageTitle = $event"
/>
```



- **新增**：现在可以在同一个组件上使用多个 `v-model` 绑定；
- **新增**：现在可以自定义 `v-model` 修饰符。

```js
<ChildComponent v-model:title="pageTitle" v-model:content="pageContent" />

<!-- 是以下的简写： -->

<ChildComponent
  :title="pageTitle"
  @update:title="pageTitle = $event"
  :content="pageContent"
  @update:content="pageContent = $event"
/>
```




### 已移除

#### 过滤器

已移除，建议使用 computed。



全局过滤器已被全局属性取而代之：

```js
// main.js
const app = createApp(App)

app.config.globalProperties.$filters = {
  currencyUSD(value) {
    return '$' + value
  }
}
```

```js
<template>
  <h1>Bank Account Balance</h1>
  <p>{{ $filters.currencyUSD(accountBalance) }}</p>
</template>
```

#### $children

已移除，建议使用 $refs 替代。

#### $listeners

已移除。

在 Vue 3 的虚拟 DOM 中，事件监听器现在只是以 `on` 为前缀的 attribute，这样它就成为了 `$attrs` 对象的一部分，因此 `$listeners` 被移除了。



所以 Vue3 中 `v-bind="$attrs"` 即 Vue2 的 `v-bind="$attrs" v-on="$listeners"`效果。

```js
<template>
  <label>
    <input type="text" v-bind="$attrs" />
  </label>
</template>
<script>
export default {
  inheritAttrs: false
}
</script>
```



### 其他

#### 资源

| **相关库名称**         | **在线地址 🔗**                                               |
| ---------------------- | ------------------------------------------------------------ |
| Vue 3.0 官方文档(英文) | [在线地址](https://link.juejin.cn?target=https%3A%2F%2Fv3.vuejs.org%2F) |
| Vue 3.0 中文文档       | [在线地址](https://link.juejin.cn?target=https%3A%2F%2Fv3.cn.vuejs.org%2F) [国内加速版](https://link.juejin.cn?target=https%3A%2F%2Fvue3js.cn%2Fdocs%2Fzh%2F) |
| Composition-API手册    | [在线地址](https://link.juejin.cn?target=https%3A%2F%2Fvue3js.cn%2Fvue-composition-api%2F) |
| Vue 3.0 源码学习       | [在线地址](https://link.juejin.cn?target=https%3A%2F%2Fvue3js.cn%2Fstart%2F) |
| Vue-Router 官方文档    | [在线地址](https://link.juejin.cn?target=https%3A%2F%2Fnext.router.vuejs.org%2F) |
| Vuex 4.0               | [Github](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvuex%2Ftree%2F4.0) |
| vue-devtools           | [Github](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue-devtools%2Freleases)(Vue3.0 需要使用最新版本) |
| Vite 源码学习          | [线上地址](https://link.juejin.cn?target=https%3A%2F%2Fvite-design.surge.sh%2Fguide%2F) |
| Vite 2.0 中文文档      | [线上地址](https://link.juejin.cn?target=https%3A%2F%2Fcn.vitejs.dev%2F) |
| Vue3 新动态            | [线上地址](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fvue3%2Fvue3-News) |



#### JSX

[JSX github 官网](https://github.com/vuejs/babel-plugin-jsx#installation)

**v-if、v-for**

```js
    const data = [{ id: 1, content: '静夜诗' }]
    return () => {
      if (data.length) {
        const liVnode = data.map((item) => <li>{item.content}</li>)
        return <ul>{liVnode}</ul>
      } else {
        return <p>暂无数据</p>
      }
    }
```

**css**

```js
    const isLoading = ref(true)
    return () => (
      <div class={{ selected: isLoading.value }} style={{ color: 'red' }}>
        css
      </div>
    )
```

**v-show**

```js
    const isShow = ref(true)
    return () => <div v-show={isShow.value}>v-show</div>
```

**v-model**

```js
    const val = ref('hello')
    return () => <input v-model={val} />
    return () => <input v-model:argument={val} />
```

**插槽**

```js
    return () => (
      <div>
        <div>{slots.default() /* 默认插槽 */}</div>
        <div>{slots.title() /* 具名插槽 */}</div>
      </div>
    )
```

```js
    // use
		const slotObj = {
      default: () => <div>A</div>,
      title: () => <span>B</span>
    }
    return () => (
      <Demo v-slots={slotObj}>
        // 默认插槽亦可写在此处 <div>A</div>
      </Demo>
    )
```

接收 **emit**

```js
    const fn = () => {}
    return <demo onCustomEvent={fn}></demo>
```

```js
		emit('customEvent')
```



#### 注意事项

1. `<script setup></script>` 语法糖中不能使用 `render函数` 。