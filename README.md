- [document-library](#document-library)
  - [前言](#前言)
  - [前端基础](#前端基础)
    - [html](#html)
    - [css](#css)
    - [浏览器](#浏览器)
    - [代码规范](#代码规范)
    - [适配](#适配)
  - [前端工程化](#前端工程化)
    - [开发](#开发)
    - [代码规范](#代码规范-1)
    - [测试](#测试)
    - [构建](#构建)
    - [部署](#部署)
  - [前端框架](#前端框架)
    - [vue2](#vue2)
    - [vue3](#vue3)
      - [设计和原理-reactive](#设计和原理-reactive)
      - [设计和原理-renderer](#设计和原理-renderer)
      - [设计和原理-其他](#设计和原理-其他)
    - [ts](#ts)
    - [nuxt](#nuxt)
    - [nest](#nest)
  - [前端性能优化](#前端性能优化)
  - [前端生态](#前端生态)
    - [库](#库)
  - [前端业务](#前端业务)
  - [前端进阶](#前端进阶)
    - [安全](#安全)
    - [动画](#动画)
    - [手写代码](#手写代码)
  - [前端架构](#前端架构)
  - [网络请求](#网络请求)
    - [http](#http)
  - [面试](#面试)
  - [程序员储备](#程序员储备)
    - [开发语言](#开发语言)
    - [算法](#算法)
    - [正则](#正则)
    - [设计模式](#设计模式)
  - [生活](#生活)
    - [随想](#随想)
    - [心理学](#心理学)
    - [书籍](#书籍)
    - [积累](#积累)
  - [License](#license)

# document-library

wenfujie 的文档库，包含了个人学习、工作中关于 `前端编程` 的经验文档。

## 前言

本文档库始建于 2019-04-14，目的是做学习笔记。
主要记录一下 wenfujie 折腾学习新技术点的时候的操作笔记，慢慢积累，静静的进步。

## 前端基础

### html

1. [html 面试题](docs/前端基础/html/html面试题.md)
2. [H5 开发 FAQ](docs/前端基础/html/H5开发FAQ.md)

### css

1. [css 高频面试题](docs/前端基础/css/面试题.md)
2. [自适应和响应式布局方案](docs/前端基础/css/自适应和响应式布局.md)
3. [有趣的 css](docs/前端基础/css/有趣的css.md)
4. [盒模型及 BFC](docs/前端基础/css/盒模型及BFC.md)

### 浏览器

1. [Chrome 开发者工具你不知道的操作](docs/前端基础/浏览器/谷歌浏览器开发者工具.md)
2. [BOM](docs/前端基础/浏览器/BOM.md)
3. [V8 引擎的垃圾回收](docs/前端基础/浏览器/V8引擎的垃圾回收.md)
4. [浏览器渲染机制](docs/前端基础/浏览器/浏览器渲染机制.md)
5. [DOM 事件总结](docs/前端基础/浏览器/DOM事件总结.md)

### 代码规范

1. [变量命名](docs/前端基础/代码规范/变量命名.md)

### 适配

1. [页面适配](docs/前端基础/适配/页面适配.md)
2. [PC 适配](docs/前端基础/适配/PC适配.md)

## 前端工程化

### 开发

1. [搭建脚手架](docs/前端工程化/开发/脚手架/搭建脚手架.md)
2. [commander 使用](docs/前端工程化/开发/脚手架/commander使用.md)
3. [共享依赖 npm-workspace](https://github.com/wenfujie/demo/tree/main/npm-workspace)
4. [npm 使用](docs/前端工程化/开发/npm使用.md)
5. [git 使用](docs/前端工程化/开发/git使用.md)
6. [常用 vscode 插件](docs/前端工程化/开发/常用vscode插件.md)
7. [vscode 快捷键和终端指令](docs/前端工程化/开发/vscode快捷键和终端指令.md)
8. [pnpm 介绍](docs/前端工程化/开发/pnpm介绍.md)

### 代码规范

1. [husky 约束 commit 规范](docs/前端工程化/代码规范/husky约束commit规范.md)
2. [eslint+prettier](docs/前端工程化/代码规范/eslint+prettier.md)

### 测试

1. [端到端测试](docs/前端工程化/测试/端到端测试.md)

### 构建

1. [Vite 合集](docs/前端工程化/构建/vite/catalog.md)
2. [Webpack 介绍](docs/前端工程化/构建/webpack/介绍.md)
3. [Webpack 热更新原理](docs/前端工程化/构建/webpack/热更新原理.md)
4. [babel+polyfill 浏览器兼容](docs/前端工程化/构建/babel+polyfill浏览器兼容.md)
5. [babel7](docs/前端工程化/构建/babel7.md)

### 部署

1. [Node 自动化部署](docs/前端工程化/部署/node自动化部署.md)
2. [nginx 指南](docs/前端工程化/部署/nginx指南.md)
3. [Docker 使用说明](docs/前端工程化/部署/Docker使用说明.md)
4. [gitlab-ci](docs/前端工程化/部署/gitlab-ci.md)

## 前端框架

### vue2

1. [vue 原理](docs/前端框架/vue2/vue原理.md)
2. [异步更新和 nextTick](docs/前端框架/vue2/异步更新和nextTick.md)
3. [Vue 和 React 横向对比](docs/前端框架/vue2/Vue和React横向对比.md)
4. [Vue 中 key 的作用](docs/前端框架/vue2/Vue中key的作用.md)
5. [Vue 高级特性](docs/前端框架/vue2/Vue高级特性.md)
6. [Vue-Cli 使用说明](docs/前端框架/vue2/Vue-Cli使用说明.md)
7. [Vue 中的渲染函数 & JSX](docs/前端框架/vue2/Vue中的渲染函数&JSX.md)

### vue3

1. [Vue3 快速上手](docs/前端框架/vue3/Vue3快速上手.md)
2. [Vue3 开发注意事项](docs/前端框架/vue3/Vue3开发注意事项.md)

#### 设计和原理-reactive

1. [proxy 的工作原理](docs/前端框架/vue3/vue3设计和原理/reactive/proxy的工作原理.md)
2. [响应系统的设计](docs/前端框架/vue3/Vue3设计和原理/reactive/响应系统的设计.md)
3. [ref 原始值的响应式](docs/前端框架/vue3/Vue3设计和原理/reactive/ref原始值的响应式.md)

#### 设计和原理-renderer

1. [渲染器的设计](docs/前端框架/vue3/Vue3设计和原理/renderer/渲染器的设计.md)
2. [渲染器——组件渲染成 DOM 过程](docs/前端框架/vue3/Vue3设计和原理/renderer/组件渲染成DOM的过程.md)
3. [渲染器——初始化组件实例过程](docs/前端框架/vue3/Vue3设计和原理/renderer/初始化组件实例过程.md)

#### 设计和原理-其他

1. [Vue3 做了哪些优化](docs/前端框架/vue3/Vue3设计和原理/Vue3做了哪些优化.md)
2. [computed 实现](docs/前端框架/vue3/Vue3设计和原理/computed实现.md)

### ts

1. [介绍](docs/前端框架/ts/介绍.md)
2. [常用配置](docs/前端框架/ts/常用配置.md)
3. [类型](docs/前端框架/ts/类型.md)
4. [类型工具](docs/前端框架/ts/类型工具.md)
5. [常用配置](docs/前端框架/ts/常用配置.md)
6. [编写声明文件](docs/前端框架/ts/编写声明文件.md)

### nuxt

1. [nuxt 服务端渲染](docs/前端框架/nuxt/nuxt服务端渲染.md)

### nest

1. [nest 笔记](https://github.com/wenfujie/study-nest/blob/main/README.md)

## 前端性能优化

1. [性能优化](docs/前端性能优化/性能优化.md)
2. [webpack 打包优化](docs/前端性能优化/webpack打包优化.md)
3. [如何提升用户体验](docs/前端性能优化/如何提升用户体验.md)

## 前端生态

### 库

1. [lodash 常用函数](docs/前端生态/库/lodash常用函数.md)
2. [VueUse 快速上手](docs/前端生态/库/VueUse快速上手.md)

## 前端业务

1. [各种业务解决方案](docs/前端业务/各种业务解决方案.md)
2. [系统选择文件弹窗](docs/前端业务/系统选择文件弹窗/index.md)
3. [H5 拖拽](docs/前端业务/H5拖拽/拖拽.md)
4. [压缩文件并下载](docs/前端业务/压缩文件并下载.md)
5. [权限控制](docs/前端业务/权限控制.md)

## 前端进阶

### 安全

1. [CSRF 和 XSS](docs/前端进阶/安全/CSRF和XSS.md)
2. [CSP 内容安全策略](docs/前端进阶/安全/CSP内容安全策略.md)
3. [加密和签名](docs/前端进阶/安全/加密和签名.md)

### 动画

1. [css 动画](docs/前端进阶/动画/css动画.md)
2. [砸金蛋效果（steps+雪碧图解决图片快速切换不闪烁）](docs/前端进阶/动画/砸金蛋效果（steps+雪碧图解决图片快速切换不闪烁）/index.html)
3. [Flip-Animation:随机移动小姐姐图片](https://gitee.com/mozhata/Animation/tree/main/flip-animation)

### 手写代码

1. [手写代码合集](docs/前端进阶/手写代码/index.md)
2. [写代码小技巧](docs/前端进阶/手写代码/写代码小技巧.md)
3. [js 小技巧](docs/前端进阶/手写代码/js小技巧.md)
4. [js 代码片段](docs/前端进阶/手写代码/js代码片段.md)

## 前端架构

1. [对 BFF 的理解](docs/前端架构/对BFF的理解.md)
2. [lerna](docs/前端架构/大仓库/lerna.md)
3. [跨平台方案](docs/前端架构/跨平台方案.md)

## 网络请求

1. [本地域名映射](docs/网络请求/本地域名映射.md)
2. [跨域资源共享 cors](docs/网络请求/跨域资源共享cors.md)
3. [跨域解决方案](docs/网络请求/跨域解决方案.md)

### http

1. [http 协议](docs/网络请求/http/http协议.md)

## 面试

1. [面试资源汇总](docs/面试/前端面试资源汇总.md)
2. [与面试官的较量](docs/面试/与面试官的较量.md)
3. [学习规划](docs/面试/学习规划.md)
4. [做好面试官](docs/面试/做好面试官.md)

## 程序员储备

### 开发语言

1. [markdown 语法](docs/程序员储备/开发语言/MarkDown/markdown语法.md)
2. [markdown 转 html](docs/程序员储备/开发语言/MarkDown/markdown转html.md)
3. [shell 脚本编写](docs/程序员储备/开发语言/shell脚本编写.md)

### 算法

1. [基础算法](docs/程序员储备/算法/基础算法.md)
2. [算法深入](docs/程序员储备/算法/算法深入.md)

### 正则

1. [正则 mini 书笔记](docs/程序员储备/正则/正则mini书笔记.md)
2. [学习正则表达式](docs/程序员储备/正则/学习正则表达式.md)
3. [Github 正则教程](https://github.com/ziishaned/learn-regex/blob/master/translations/README-cn.md)

### 设计模式

1. [设计模式](docs/程序员储备/设计模式/设计模式.md)

## 生活

### 随想

1. [小事记录](docs/生活/随想/小事记录.md)
2. [催眠自己去跑步的文章](docs/生活/随想/催眠自己去跑步的文章.md)
3. [零碎想法](docs/生活/随想/零碎想法.md)

### 心理学

1. [需求层次理论](docs/生活/心理学/需求层次理论.md)

### 书籍

1. [刻意练习](docs/生活/书籍/刻意练习.md)
2. [金字塔原理](docs/生活/书籍/金字塔原理.md)
3. [如何阅读一本书](docs/生活/书籍/如何阅读一本书.md)
4. [超级闲聊术](docs/生活/书籍/超级闲聊术.md)

### 积累

1. [良句](docs/生活/积累/良句.md)

## License

所有文章采用[知识共享署名-非商业性使用-相同方式共享 3.0 中国大陆许可协议](http://creativecommons.org/licenses/by-nc-sa/3.0/cn/)进行许可。
