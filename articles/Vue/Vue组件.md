<!--
 * @Date: 2021-10-12 15:35:59
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-10-21 16:26:44
 * @FilePath: /document-library/articles/Vue/Vue组件.md
-->

- [props](#props)
  - [使用对象写法更严谨](#使用对象写法更严谨)
- [属性继承](#属性继承)
- [slot](#slot)
- [组件通讯](#组件通讯)
  - [provide / inject](#provide--inject)
  - [手写 find component api](#手写-find-component-api)

<!-- TODO:练习：1.实现form和form-item组件（第五节） -->

## props

### 使用对象写法更严谨

props 使用数组写法不够严谨，更推荐使用对象的写法，对象写法能支持定义变量类型、校验方法、默认值等。

```js
<script>
  // 判断参数是否是其中之一
  function oneOf (value, validList) {
    for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
        return true;
      }
    }
    return false;
  }
  export default {
    props: {
      size: {
        // 校验值
        validator (value) {
          return oneOf(value, ['small', 'large', 'default']);
        },
        default: 'default'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
```

## 属性继承

在组件上定义标准的 html 属性时，默认会继承到组件内最外层元素

```js
<i-button id="btn1" class="btn-submit"></i-button>
```

```html
<template>
  <!-- 最外层元素会继承 -->
  <button :class="'i-button-size' + size" :disabled="disabled">
  </button>
</template>
```

## slot

普通slot
```js
<template>
  <button :class="'i-button-size' + size" :disabled="disabled">
    <slot></slot>
  </button>
</template>
```

```js
<i-button>按钮 1</i-button>
```

需要多个插槽时，使用具名slot

```js
<template>
  <button :class="'i-button-size' + size" :disabled="disabled">
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>
```

```js
<i-button>
  <i-icon slot="icon" type="checkmark"></i-icon>
  按钮 1
</i-button>
```

## 组件通讯

- this.$refs
- this.$parent
- this.$children

缺点：无法实现兄弟、跨级组件通讯

### provide / inject

`provide / inject` 是 Vue.js 2.2.0 版本后新增的 API。

>特性：实现跨级组件通讯。

使用：
```js
// A.vue
export default {
  provide: {
    name: 'Aresn'
  }
}

// B.vue
export default {
  inject: ['name'],
  mounted () {
    console.log(this.name);  // Aresn
  }
}
```

>注意：provide 和 inject 绑定并不是可响应的。并且内部不允许存在与 `inject` 下的值同名的变量。官网建议不要在业务组件中使用，但如果是UI组件库可以使用。

尝试用 `provide / inject` 来替代 Vuex：

```js
// app.vue

<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        userInfo: {
          name: 'xiaoming'
        }
      }
    },
    provide () {
      return {
        app: this
      }
    }
  }
</script>
```

**app.vue 是整个项目第一个被渲染的组件，而且只会渲染一次（即使切换路由，app.vue 也不会被再次渲染），利用这个特性，很适合做一次性全局的状态数据管理**

任意组件中使用 `app.vue` 中的数据：

```js
<template>
  <div>
    {{ app.userInfo }}
  </div>
</template>
<script>
  export default {
    inject: ['app']
  }
</script>
```

### 手写 find component api

- 向上查找最近的一个组件
- 向上查找多个组件
- 向下查找最近的一个组件
- 向下查找多个组件
- 查找兄弟组件

```js

/**
 * 向上查找组件，返回最近的一个组件实例
 * @param {obj} context 调用的组件实例
 * @param {str} comName 要找的组件名称
 * @return {obj} 组件实例 或 null
 */
function findComponentUpward(context, comName) {
  let parent = context.$parent;

  while (parent) {
    if (parent.$options.name === comName) {
      return parent;
    } else {
      parent = parent.$parent;
    }
  }

  return null;
}

/**
 * 向上查找组件，返回所有匹配的实例
 * @param {obj} context 调用的组件实例
 * @param {str} comName 要找的组件名称
 * @return {arr} 组件实例集合 或 []
 */
function findComponentsUpward(context, comName) {
  let parent = context.$parent;
  let components = [];

  if (parent) {
    if (parent.$options.name === comName) {
      components.push(parent);
    }
    return components.concat(findComponentsUpward(parent, comName));
  } else {
    return [];
  }
}

/**
 * 向下查找组件，返回最近的一个组件实例
 * @param {obj} context 调用的组件实例
 * @param {str} comName 要找的组件名称
 * @return {obj} 组件实例 或 null
 */
function findComponentDownward(context, comName) {
  let childrens = context.$children;
  let target = null;
  if (!childrens || !childrens.length) return target;

  for (let i = 0; i < childrens.length; i++) {
    let child = childrens[i];
    if (child.$options.name === comName) {
      return child;
    } else {
      target = findComponentDownward(child, comName);
      if (target) return target;
    }
  }
  return target;
}

/**
 * 向下查找组件，返回所有匹配的实例
 * @param {obj} context 调用的组件实例
 * @param {str} comName 要找的组件名称
 * @return {arr} 组件实例集合 或 []
 */
function findComponentsDownward(context, comName) {
  let childrens = context.$children;
  let targets = [];
  if (!childrens || !childrens.length) return targets;

  for (let i = 0; i < childrens.length; i++) {
    let child = childrens[i];
    if (child.$options.name === comName) {
      targets.push(child);
    }
    targets = targets.concat(findComponentsDownward(child, comName));
  }
  return targets;
}

/**
 * 查找兄弟组件，返回所有匹配的实例
 * @param {obj} context 调用的组件实例
 * @param {str} comName 要找的组件名称
 * @param {boolean} exceptSelf true表示剔除自身
 * @return {arr} 组件实例集合 或 []
 */
function findBrothersComponents(context, comName, exceptSelf = true) {
  let parent = context.$parent;
  return parent.$children.filter((child) => {
    if (child.$options.name === comName) {
      return exceptSelf ? child._uid !== context._uid : true;
    }
  });
}
```