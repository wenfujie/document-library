- [旧版浏览器的两种语法兼容问题](#旧版浏览器的两种语法兼容问题)
- [解决问题的工具](#解决问题的工具)
  - [preset-env](#preset-env)
  - [plugin-transform-runtime](#plugin-transform-runtime)
  - [runtime-corejs3](#runtime-corejs3)
  - [示例 demo](#示例-demo)

## 旧版浏览器的两种语法兼容问题

旧版浏览器语法兼容分为两种类型

- 语法降级
- polyfill 缺失

语法降级，比如使用了 ES6 的箭头函数，需转换为原始函数写法。

```js
const fn = () => {};
// 语法降级
function fn() {}
```

polyfill 缺失，比如使用了 ES6 的 Promise ，在旧版浏览器需注入 Promise 对象，为浏览器注入新 API 的代码又称 `垫片` (polyfill)，以此来保证产物的完整性。

## 解决问题的工具

### preset-env

`@babel/preset-env` 主要用于替换语法降级代码、引入 polyfill 代码，编译时用到（放置于 devDependencies）。

![转换后产物](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f56b93f6e9884779b7197d2ad369034b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

`@babel/preset-env` 的一些弊端：

- 通过在全局引入 `core-js` 实现 polyfill ，污染全局
- 每个模块打包都生成类似 \_asyncToGenerator 等辅助函数，导致产出有很多冗余代码。

### plugin-transform-runtime

`@babel/plugin-transform-runtime` 用于优化 `@babel/preset-env` 处理后的代码，编译时用到（放置于 devDependencies）。

- 结合 `@babel/runtime-corejs3` 实现模块化形式引入 polyfill，避免污染全局。
- 结合 `@babel/runtime-corejs3` 实现模块化形式引入辅助函数，减少冗余代码。

![优化后产物对比](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc40d9a6401640058b96c4821e6ff8c1~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

### runtime-corejs3

> core-js 有三种产物，分别是 core-js、core-js-pure 和 core-js-bundle。第一种是全局 Polyfill 的做法，@babel/preset-env 就是用的这种产物；第二种不会把 Polyfill 注入到全局环境，可以按需引入；第三种是打包好的版本，包含所有的 Polyfill，不太常用。@babel/runtime-corejs3 使用的是第二种产物。

`@babel/runtime-corejs3` ：runtime-corejs3 是基于 `core-js-pure` 二次封装的基础库，运行时用到（放置于 dependencies）。

### 示例 demo

[preset-env + plugin-transform-runtime 转换效果](https://github.com/wenfujie/demo/tree/main/babel-plugin-transform-runtime)

[preset-env 转换效果](https://github.com/wenfujie/demo/tree/main/babel-preset-env)
