<!--
 * @Date: 2021-08-02 10:03:31
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-08-02 10:19:55
 * @FilePath: /document-library/articles/Vue/extend实现全局调用Dialog.md
-->

## 利用 Vue.extend 挂载弹窗组件

```js
// src/components/Dialog.js

// SuperDialog.vue 是已实现好的弹窗组件
import Dialog from "./SuperDialog.vue";
import Vue from "vue";

let messageInstance = null;

const init = () => {
  const DialogConstructor = Vue.extend(Dialog);
  messageInstance = new DialogConstructor();
  messageInstance.$mount();
  document.body.appendChild(messageInstance.$el);
};

const caller = (options) => {
  if (!messageInstance) {
    init();
  }
  // 设置默认显示弹窗
  options.isShow = options.isShow !== false;

  // 修改配置: title、closeable为SuperDialog.vue的props下属性
  messageInstance.title = options.title || "";
  messageInstance.closeable = options.closeable !== false;
  // 组件内部控制弹窗显示隐藏方法
  messageInstance.showDialog(options.isShow);
};
export default {
  // 返回 install 函数 用于 Vue.use 注册
  install(vue) {
    vue.prototype.$_dialog = caller;
  },
};
```

## 在 main.js 注册

```js
import Dialog from "@/components/Dialog.js";

Vue.use(Dialog);

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
```

## 在任意组件中使用

```js
this.$_dialog({
  title: "标题名称",
  closeable: false,
});
```
