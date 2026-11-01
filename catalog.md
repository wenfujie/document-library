- [document-library](#document-library)
  - [前言](#前言)
  - [开发](#开发)
    - [前端基础](#前端基础)
      - [html](#html)
      - [css](#css)
      - [js](#js)
      - [代码规范](#代码规范)
      - [适配](#适配)
      - [浏览器](#浏览器)
    - [前端进阶](#前端进阶)
      - [vue3](#vue3)
      - [vue2](#vue2)
      - [ts](#ts)
      - [nuxt](#nuxt)
      - [性能优化](#性能优化)
      - [前端架构](#前端架构)
      - [网络请求](#网络请求)
      - [前端业务](#前端业务)
      - [安全](#安全)
      - [动画](#动画)
      - [库](#库)
      - [手写代码](#手写代码)
    - [前端工程化](#前端工程化)
      - [开发](#开发-1)
      - [构建](#构建)
      - [测试](#测试)
      - [部署](#部署)
    - [程序员储备](#程序员储备)
      - [正则](#正则)
      - [设计模式](#设计模式)
      - [算法](#算法)
      - [开发语言](#开发语言)
    - [面试](#面试)
  - [生活](#生活)
    - [随想](#随想)
    - [心理学](#心理学)
    - [积累](#积累)
    - [工具](#工具)
  - [书籍](#书籍)
  - [License](#license)

# document-library

wenfujie 的文档库，包含了个人学习、工作中关于 `前端编程` 的经验文档。

## 前言

本文档库始建于 2019-04-14，目的是做学习笔记。
主要记录一下 wenfujie 折腾学习新技术点的时候的操作笔记，慢慢积累，静静的进步。

站点结构分三大板块：**开发**（技术笔记）、**生活**（随想与积累）、**书籍**（读书笔记）。

## 开发

### 前端基础

#### html

1. [H5 开发 FAQ](docs/开发/前端基础/html/H5开发FAQ.md)

#### css

1. [盒模型及 BFC](docs/开发/前端基础/css/盒模型及BFC.md)
2. [H5 开发常用](docs/开发/前端基础/css/H5开发常用.md)
3. [css 高频面试题](docs/开发/前端基础/css/面试题.md)
4. [有趣的 css](docs/开发/前端基础/css/有趣的css.md)
5. [自适应和响应式布局方案](docs/开发/前端基础/css/自适应和响应式布局.md)

#### js

**基础**

1. [数据类型的判断](docs/开发/前端基础/js/基础/数据类型/数据类型的判断.md)
2. [数据类型的转换](docs/开发/前端基础/js/基础/数据类型/数据类型的转换.md)
3. [闭包](docs/开发/前端基础/js/基础/闭包.md)
4. [事件循环](docs/开发/前端基础/js/基础/事件循环.md)
5. [原型链](docs/开发/前端基础/js/基础/原型链.md)
6. [this 指向](docs/开发/前端基础/js/基础/this指向.md)

**封装**

1. [防抖与节流](docs/开发/前端基础/js/封装/防抖与节流/index.md)
2. [深拷贝](docs/开发/前端基础/js/封装/深拷贝.md)
3. [数组扁平化](docs/开发/前端基础/js/封装/数组扁平化.md)
4. [代码片段](docs/开发/前端基础/js/封装/代码片段.md)

**ES6**

1. [ESM 和 CommonJS](docs/开发/前端基础/js/es6/esm/ESM和CommonJS.md)
2. [Promise 介绍和实现](docs/开发/前端基础/js/es6/promise/介绍和实现.md)
3. [类](docs/开发/前端基础/js/es6/类.md)
4. [新特性](docs/开发/前端基础/js/es6/新特性.md)

#### 代码规范

1. [变量命名](docs/开发/前端基础/代码规范/变量命名.md)

#### 适配

1. [页面适配](docs/开发/前端基础/适配/页面适配.md)
2. [PC 适配](docs/开发/前端基础/适配/PC适配.md)
3. [移动端适配](docs/开发/前端基础/适配/移动端适配.md)

#### 浏览器

1. [Chrome 开发者工具你不知道的操作](docs/开发/前端基础/浏览器/谷歌浏览器开发者工具.md)
2. [浏览器渲染机制](docs/开发/前端基础/浏览器/浏览器渲染机制.md)
3. [BOM](docs/开发/前端基础/浏览器/BOM.md)
4. [DOM 事件总结](docs/开发/前端基础/浏览器/DOM事件总结.md)
5. [V8 引擎的垃圾回收](docs/开发/前端基础/浏览器/V8引擎的垃圾回收.md)

### 前端进阶

#### vue3

**基础**

1. [Vue3 开发注意事项](docs/开发/前端进阶/vue3/Vue3开发注意事项.md)
2. [Vue3 快速上手](docs/开发/前端进阶/vue3/Vue3快速上手.md)

**设计和原理**

1. [computed 实现](docs/开发/前端进阶/vue3/设计和原理/computed实现.md)
2. [Vue3 做了哪些优化](docs/开发/前端进阶/vue3/设计和原理/Vue3做了哪些优化.md)
3. [响应系统的设计](docs/开发/前端进阶/vue3/设计和原理/reactive/响应系统的设计.md)
4. [proxy 的工作原理](docs/开发/前端进阶/vue3/设计和原理/reactive/proxy的工作原理.md)
5. [ref 原始值的响应式](docs/开发/前端进阶/vue3/设计和原理/reactive/ref原始值的响应式.md)
6. [初始化组件实例过程](docs/开发/前端进阶/vue3/设计和原理/renderer/初始化组件实例过程.md)
7. [渲染器的设计](docs/开发/前端进阶/vue3/设计和原理/renderer/渲染器的设计.md)
8. [组件渲染成 DOM 过程](docs/开发/前端进阶/vue3/设计和原理/renderer/组件渲染成DOM的过程.md)

#### vue2

1. [vue 原理](docs/开发/前端进阶/vue2/vue原理.md)
2. [异步更新和 nextTick](docs/开发/前端进阶/vue2/异步更新和nextTick.md)
3. [Vue 和 React 横向对比](docs/开发/前端进阶/vue2/Vue和React横向对比.md)
4. [Vue 中 key 的作用](docs/开发/前端进阶/vue2/Vue中key的作用.md)
5. [Vue 高级特性](docs/开发/前端进阶/vue2/Vue高级特性.md)
6. [Vue-Cli 使用说明](docs/开发/前端进阶/vue2/Vue-Cli使用说明.md)
7. [Vue 中的渲染函数 & JSX](docs/开发/前端进阶/vue2/Vue中的渲染函数&JSX.md)
8. [Vue 组件](docs/开发/前端进阶/vue2/Vue组件.md)

#### ts

1. [介绍](docs/开发/前端进阶/ts/介绍.md)
2. [类型](docs/开发/前端进阶/ts/类型.md)
3. [类型工具](docs/开发/前端进阶/ts/类型工具.md)
4. [实战](docs/开发/前端进阶/ts/实战.md)
5. [常用配置](docs/开发/前端进阶/ts/常用配置.md)
6. [编写声明文件](docs/开发/前端进阶/ts/编写声明文件.md)

#### nuxt

1. [nuxt 服务端渲染](docs/开发/前端进阶/nuxt/nuxt服务端渲染.md)

#### 性能优化

1. [如何提升用户体验](docs/开发/前端进阶/性能优化/如何提升用户体验.md)
2. [性能优化](docs/开发/前端进阶/性能优化/性能优化.md)
3. [webpack 性能优化常用工具](docs/开发/前端进阶/性能优化/webpack性能优化常用工具.md)
4. [webpack 打包优化](docs/开发/前端进阶/性能优化/webpack打包优化.md)

#### 前端架构

1. [对 BFF 的理解](docs/开发/前端进阶/前端架构/对BFF的理解.md)
2. [函数式编程](docs/开发/前端进阶/前端架构/函数式编程.md)
3. [跨平台方案](docs/开发/前端进阶/前端架构/跨平台方案.md)
4. [lerna](docs/开发/前端进阶/前端架构/大仓库/lerna.md)

#### 网络请求

1. [http 协议](docs/开发/前端进阶/网络请求/http/http协议.md)
2. [本地域名映射](docs/开发/前端进阶/网络请求/本地域名映射.md)
3. [跨域解决方案](docs/开发/前端进阶/网络请求/跨域解决方案.md)
4. [跨域资源共享 cors](docs/开发/前端进阶/网络请求/跨域资源共享cors.md)

#### 前端业务

1. [权限控制](docs/开发/前端进阶/前端业务/权限控制.md)
2. [压缩文件并下载](docs/开发/前端进阶/前端业务/压缩文件并下载.md)
3. [各种业务解决方案](docs/开发/前端进阶/前端业务/各种业务解决方案.md)
4. [系统选择文件弹窗](docs/开发/前端进阶/前端业务/系统选择文件弹窗/index.md)
5. [exceljs 导出表格数据为 excel](https://github.com/wenfujie/demo/tree/main/use-download-excel)

#### 安全

1. [加密和签名](docs/开发/前端进阶/安全/加密和签名.md)
2. [CSP 内容安全策略](docs/开发/前端进阶/安全/CSP内容安全策略.md)
3. [CSRF 和 XSS](docs/开发/前端进阶/安全/CSRF和XSS.md)

#### 动画

1. [css 动画](docs/开发/前端进阶/动画/css动画.md)

#### 库

1. [lodash 常用函数](docs/开发/前端进阶/库/lodash常用函数.md)
2. [VueUse 快速上手](docs/开发/前端进阶/库/VueUse快速上手.md)

#### 手写代码

1. [写代码小技巧](docs/开发/前端进阶/手写代码/写代码小技巧.md)
2. [js 小技巧](docs/开发/前端进阶/手写代码/js小技巧.md)

### 前端工程化

#### 开发

1. [git 使用](docs/开发/前端工程化/开发/git使用.md)
2. [npm 使用](docs/开发/前端工程化/开发/npm使用.md)
3. [pnpm 介绍](docs/开发/前端工程化/开发/pnpm介绍.md)
4. [vscode 快捷键和终端指令](docs/开发/前端工程化/开发/vscode快捷键和终端指令.md)
5. [常用 vscode 插件](docs/开发/前端工程化/开发/常用vscode插件.md)
6. [搭建脚手架](docs/开发/前端工程化/开发/脚手架/搭建脚手架.md)
7. [commander 使用](docs/开发/前端工程化/开发/脚手架/commander使用.md)
8. [eslint + prettier](docs/开发/前端工程化/开发/代码规范/eslint+prettier.md)
9. [husky 约束 commit 规范](docs/开发/前端工程化/开发/代码规范/husky约束commit规范.md)
10. [共享依赖 npm-workspace](https://github.com/wenfujie/demo/tree/main/npm-workspace)

#### 构建

1. [babel + polyfill 浏览器兼容](docs/开发/前端工程化/构建/babel+polyfill浏览器兼容.md)
2. [babel7](docs/开发/前端工程化/构建/babel7.md)
3. [Vite 插件](docs/开发/前端工程化/构建/vite/插件.md)
4. [Vite 构建拆包](docs/开发/前端工程化/构建/vite/构建拆包.md)
5. [什么是预构建](docs/开发/前端工程化/构建/vite/什么是预构建.md)
6. [plugin-legacy 插件](docs/开发/前端工程化/构建/vite/plugin-legacy插件.md)
7. [如何做到冷启动、热更快](docs/开发/前端工程化/构建/vite/如何做到冷启动、热更快.md)
8. [Webpack 介绍](docs/开发/前端工程化/构建/webpack/介绍.md)
9. [Webpack 热更新原理](docs/开发/前端工程化/构建/webpack/热更新原理.md)
10. [Webpack Loader](docs/开发/前端工程化/构建/webpack/Loader.md)

#### 测试

1. [端到端测试](docs/开发/前端工程化/测试/端到端测试.md)

#### 部署

1. [Docker 使用说明](docs/开发/前端工程化/部署/Docker使用说明.md)
2. [gitlab-ci](docs/开发/前端工程化/部署/gitlab-ci.md)
3. [nginx 指南](docs/开发/前端工程化/部署/nginx指南.md)
4. [Node 自动化部署](docs/开发/前端工程化/部署/node自动化部署.md)
5. [github-pages](docs/开发/前端工程化/部署/github-pages.md)

### 程序员储备

#### 正则

1. [学习正则表达式](docs/开发/程序员储备/正则/学习正则表达式.md)
2. [正则 mini 书笔记](docs/开发/程序员储备/正则/正则mini书笔记.md)
3. [Github 正则教程](https://github.com/ziishaned/learn-regex/blob/master/translations/README-cn.md)

#### 设计模式

1. [设计模式](docs/开发/程序员储备/设计模式/设计模式.md)
2. [洋葱圈架构](docs/开发/程序员储备/设计模式/洋葱圈架构.md)

#### 算法

1. [基础算法](docs/开发/程序员储备/算法/基础算法.md)
2. [算法深入](docs/开发/程序员储备/算法/算法深入.md)

#### 开发语言

1. [shell 脚本编写](docs/开发/程序员储备/开发语言/shell脚本编写.md)
2. [markdown 语法](docs/开发/程序员储备/开发语言/MarkDown/markdown语法.md)
3. [markdown 转 html](docs/开发/程序员储备/开发语言/MarkDown/markdown转html.md)

### 面试

1. [面试资源汇总](docs/开发/面试/前端面试资源汇总.md)
2. [与面试官的较量](docs/开发/面试/与面试官的较量.md)
3. [做好面试官](docs/开发/面试/做好面试官.md)
4. [html 面试题](docs/开发/面试/html面试题.md)
5. [学习规划](docs/开发/面试/学习规划.md)

## 生活

### 随想

1. [催眠自己去跑步的文章](docs/生活/随想/催眠自己去跑步的文章.md)
2. [零碎想法](docs/生活/随想/零碎想法.md)
3. [小事记录](docs/生活/随想/小事记录.md)

### 心理学

1. [需求层次理论](docs/生活/心理学/需求层次理论.md)

### 积累

1. [沟通](docs/生活/积累/沟通.md)
2. [良句](docs/生活/积累/良句.md)

### 工具

1. [提前还款计算](docs/生活/工具/提前还款计算.md)

## 书籍

1. [如何阅读一本书](docs/书籍/如何阅读一本书.md)
2. [刻意练习](docs/书籍/刻意练习.md)
3. [金字塔原理](docs/书籍/金字塔原理.md)
4. [人生的智慧](docs/书籍/人生的智慧.md)
5. [亲密关系](docs/书籍/亲密关系.md)
6. [小狗钱钱](docs/书籍/小狗钱钱.md)

## License

所有文章采用[知识共享署名-非商业性使用-相同方式共享 3.0 中国大陆许可协议](http://creativecommons.org/licenses/by-nc-sa/3.0/cn/)进行许可。
