<!--
 * @Date: 2021-08-28 16:07:49
 * @LastEditors: 温富杰 wenfujie@dianchu.com
 * @LastEditTime: 2024-07-21 15:33:52
 * @FilePath: /document-library/articles/解决方案/nuxt.js服务端渲染.md
-->

- [前言](#前言)
- [Nust.js 介绍](#nustjs-介绍)
- [使用 Nuxt 实现服务端渲染](#使用-nuxt-实现服务端渲染)
  - [指令介绍](#指令介绍)
  - [项目结构](#项目结构)
  - [常用配置](#常用配置)
  - [页面跳转](#页面跳转)
  - [默认模板和布局模块](#默认模板和布局模块)
  - [设置页面切换动画](#设置页面切换动画)
  - [设置指定页面 head](#设置指定页面-head)
  - [data 的扩展 asyncData](#data-的扩展-asyncdata)
  - [静态资源](#静态资源)
  - [项目部署](#项目部署)
- [后语](#后语)

## 前言

如果要开发新闻、电影类提供内容资讯的应用，那我们要选择一个有利于 SEO、加载速度更快的服务器端渲染的开发框架。

Nuxt.js 应需而生，与其说他是一个 Vue 框架，我更觉它是一个解决方案，因为如果有 Vue 开发基础，那上手 Nuxt.js 就太快了。Nuxt 的一些扩展让我感觉比 Vue 开发更舒服。

## Nust.js 介绍

> Nuxt.js 是一个基于 Vue.js 的通用应用框架。 通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 UI 渲染。

**优点**

- 基于 Vue.js
- 服务端渲染
- 强大的路由功能，支持异步数据
- 静态文件服务

## 使用 Nuxt 实现服务端渲染

### 指令介绍

```bash
# 初始化工程
npm init nuxt-app <project-name>

# 本地运行
npm run dev

# 打包
npm run build

# 启动服务
npm run start

# 静态页面生成
npm run generate
```

### 项目结构

```js
|-- .nuxt                 // Nuxt自动生成，临时的用于编辑的文件，build
|-- assets                // 用于组织未编译的静态资源入LESS、SASS 或 JavaScript
|-- components            // 用于自己编写的Vue组件，比如滚动组件，日历组件，分页组件
|-- layouts               // 布局目录，用于组织应用的布局组件，不可更改。
|-- pages                 // 用于存放写的页面，我们主要的工作区域
|-- plugins               // 用于存放JavaScript插件的地方
|-- static                // 用于存放静态资源文件，比如图片
|-- store                 // 用于组织应用的Vuex 状态管理。
|-- .editorconfig         // 开发工具格式配置
|-- .eslintrc.js          // ESLint的配置文件，用于检查代码格式
|-- .gitignore            // 配置git不上传的文件
|-- nuxt.config.json      // 用于组织Nuxt.js应用的个性化配置，已覆盖默认配置
|-- package-lock.json     // npm自动生成，用于帮助package的统一性设置的，yarn也有相同的操作
|-- package.json          // npm包管理配置文件
```

### 常用配置

修改本地开发运行 ip 和端口

```js
// package.js
{
  ...
  "config":{
    "nuxt":{
      "host":"127.0.0.1",
      "port":"1818"
    }
  },
  ...
}
```

**为所有页面添加 `<head>`**

```js
  // nuxt.config.js

  head: {
    title: 'play-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
```

添加全局 css

```js
  // nuxt.config.js
  css:['~assets/css/normailze.css'],
```

覆盖 webpack 的 loader 配置

```js
// nuxt.config.js
build: {
  // 在此覆盖
}
```

### 页面跳转

使用 `<nuxt-link>` 代替 `<a>`

```html
<!-- 其中news为pages下的vue组件 -->
<nuxt-link :to="{name:'news',params:{newsId:3306}}">NEWS</nuxt-link>
```

获取页面跳转参数

```js
this.$route.params.newsId
```

### 默认模板和布局模块

**默认模板**

在根目录新建 `app.html` ，在该页面添加的内容会应用到所有页面。
其中 `HEAD` 表示 `nuxt.config.js` 中所配置的 `head` ， `APP` 表示 pages 的 vue 组件。

```html
<!-- app.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    {{ HEAD }}
  </head>
  <body>
    <p>在该页面添加的内容会应用到所有页面</p>
    {{ APP }}
  </body>
</html>
```

**布局模块**

`/layouts` 文件夹为布局模块。其中有两个内置布局组件：

- `/layouts/default.vue` 所有页面的默认布局
- `/layouts/error.vue` 404 或其他错误时的错误页

组件 `default.vue` 的布局会应用到所有未设置 layout 属性的 pages 首层组件上。

```html
<!-- /layouts/default.vue -->

<template>
  <div>
    <p>在该页面添加的内容会应用到所有页面</p>
    <!-- <nuxt /> 标签表示当前page -->
    <nuxt />
  </div>
</template>
```

组件 `error.vue` 会在路由 404 或者 pages 下组件的 `validate` 方法返回 false 时自动显示，并传入 error 对象。

```html
<!-- layouts/error.vue -->

<template>
  <div>
    <h2 v-if="error.statusCode==404">404页面不存在</h2>
    <h2 v-else>500服务器错误</h2>
    <ul>
      <li><nuxt-link to="/">HOME</nuxt-link></li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['error']
  }
</script>
```

当我们开发 page 时，可使用 `validate` 钩子控制是否进入页面：

```js
export default {
  validate() {
    // false则跳转到layouts/error.vue
    // true则正常进入页面
    return false
  }
}
```

**如何自定义布局？**
我们还可以在 `/layouts` 下创建自定义布局。

首先创建 `/layouts/custom.vue` 自定义布局组件，组件名称可随便取

```html
<template>
  <div>
    <nuxt />
    <p>foot</p>
  </div>
</template>
```

pages 下的组件使用 `layout` 属性来指定要使用的布局方式

```js
export default {
  ...
  layout: 'custom', // 设置为布局组件名称即可
  ...
}
```

### 设置页面切换动画

**针对所有页面**

在全局 css 文件中加入以下样式，比如上文提到的 `assets/css/normailze.css`，即可有页面过渡效果

```css
.page-enter-active,
.page-leave-active {
  transition: opacity 1s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
```

**指定页面设置过渡动画**

1. 同样在全局 css 文件加入样式，但是样式前缀不同，此处用`.test`距离

```css
.test-enter-active,
.test-leave-active {
  transition: opacity 1s;
}
.test-enter,
.test-leave-active {
  opacity: 0;
}
```

2. 在对应 vue 文件中添加如下配置，即可实现指定页面过渡动画

```js
<script>
export default {
  ...
  transition: 'test',
  ...
}
</script>
```

### 设置指定页面 head

pages 下组件直接使用 `head` 钩子来覆盖全局 head ，从而实现不同页面配置不同 head 。

```js
<script>
export default {
  ...
  head() {
    return {
      title: this.title,
      meta: [{ hid: "description", name: "news", content: "This is news page" }]
    };
  },
  ...
};
</script>
```

### data 的扩展 asyncData

`asyncData` 主要用于异步初始化数据。

```js
<script>
import axios from 'axios'
export default {
  data(){
     return {
         name:'hello World',
     }
  },
  asyncData(){
      return axios.get('https://api.myjson.com/bins/8gdmr')
      .then((res)=>{
          console.log(res)
          return {info:res.data}
      })
  }
}
</script>
```

### 静态资源

有的同学会遇到一些图片在项目开发时可用，但是打包后就不能用了的情况。

其实注意使用标识符 `~` 来引用静态资源就不会出现打包后不能用的情况了。

```html
<!-- html标签上的引用 -->
<div><img src="~static/logo.png" /></div>

<!-- css中的引用 -->
<style>
  .diss {
    width: 300px;
    height: 100px;
    background-image: url('~static/logo.png');
  }
</style>
```

### 项目部署

**部署方式一：部署到 node 上，实现服务端渲染**

1. 将 .nuxt、static 文件夹和 `nuxt.config.js` 、`package.json` 文件复制到服务器
2. 执行指令 `npm i -production` 和 `npm run start`，服务即可运行
3. 在 nginx 上配置反向代理，代理到对应运行的 ip 和端口上

**部署方式二：静态页面生成**

1. 执行指令 `npm run generate` 会在根目录生成 dist 文件夹，dist 包含了 Nuxt 预先渲染的所有页面
2. 将 dist 内容丢到服务器即可

两种部署比较，方式一实现了 SSR，首屏渲染快。两种方式都有很好的 SEO。

## 后语

本文仅抛砖引玉带同学们入门 Nuxt.js ，想深入了解可前往 [官方文档](https://zh.nuxtjs.org/) 。

**参考文章**

[jspang 的 Nuxt.js 免费视频教程](http://jspang.com/detailed?id=37)

**相关文章**

[将现有 Vue 项目重构为支持 Nuxt.js 的项目](https://meathill.com/gitbook-nuxt-generate-static-site/)

[搭建个人脚手架](https://juejin.cn/post/6927219159918968845)

[我的前端知识库，欢迎 star](https://github.com/wenfujie/document-library)
