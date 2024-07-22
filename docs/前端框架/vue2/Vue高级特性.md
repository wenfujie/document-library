<!--
 * @Date: 2021-08-02 10:03:31
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-09-14 15:26:29
-->

- [Vue.extend(options)动态加载组件](#vueextendoptions动态加载组件)
  - [使用 Vue.extend 封装全局弹窗](#使用-vueextend-封装全局弹窗)

## Vue.extend(options)动态加载组件

**用法**

使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

```js
// 此处Vue.extend()参数也可以是一个完整的Vue组件
const dialogCom = Vue.extend({
  template: '<div><p>{{msg}}</p><slot name="footer"/></div>',
  props: {
    msg: {
      type: String,
      default: "msg",
    },
  },
});

const dialogComInstance = new dialogCom({
  // 覆盖props
  propsData: {
    msg: "test",
  },
});

// 动态传入slot
dialogComInstance.$scopedSlots = {
  footer() {
    const h = dialogComInstance.$createElement;
    // need return [<vNode>]
    return [h("div", "slot-content")];
  },
};

dialogComInstance.$mount("#commonDialog");
```

### 使用 Vue.extend 封装全局弹窗

1. 通过 Vue.extend 实现动态构造组件，并最终导出对象 `{ install: ()=>{} }` ，以供在 `main.js` 中通过 `Vue.use` 去注入

```js
// dialog.js

import Dialog from "./SuperDialog.vue";
import Vue from "vue";

let messageInstance = null;

const init = (options) => {
  const DialogConstructor = Vue.extend(Dialog);
  messageInstance = new DialogConstructor({
    propsData: options.props,
  });

  messageInstance.$mount();
  document.body.appendChild(messageInstance.$el);
};

export default {
  // 返回 install 函数 用于 Vue.use 注册
  install(vue) {
    vue.prototype.$_dialog = (options) => {
      if (!messageInstance) {
        init(options);
      }
      // 弹窗组件内部实现showDialog函数，控制弹窗的显示、关闭
      messageInstance.showDialog(options.isShow);
    };
  },
};
```

2. 在 `main.js` 中注入全局弹窗组件

```js
// main.js

import Vue from "vue";
import Dialog from "./dialog.js";

Vue.use(Dialog);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

3. 在开发组件调用

```js
// 开启弹窗
this.$_dialog({ isShow: true });

// 关闭弹窗
this.$_dialog({ isShow: false });
```
