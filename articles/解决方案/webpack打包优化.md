- [善用 import() 分包](#善用-import-分包)
  - [依赖分包](#依赖分包)
  - [Vue 组件分包](#vue-组件分包)
- [分包 optimization.splitChunks](#分包-optimizationsplitchunks)
  - [splitChunks 的默认配置](#splitchunks-的默认配置)
  - [chunks](#chunks)
  - [maxInitialRequests](#maxinitialrequests)
  - [maxAsyncRequests](#maxasyncrequests)
  - [minChunks](#minchunks)
  - [cacheGroups](#cachegroups)
    - [name](#name)
    - [priority](#priority)
  - [实际应用](#实际应用)
- [externals](#externals)

## 善用 import() 分包

使用 `import()` 动态导入模块时， webpack 会自动把该模块打包为独立的 chunk。

### 依赖分包

在遇到体积较大并且非页面初始加载所需模块时，可以使用 `import()` 对该模块分包，避免将模块打包在初始依赖 chunk 中，导致首屏加载慢。

```js
// ❌ bad

// 打包后 => chunk-vendors.js 增加 843kb
import AdyenCheckout from "@adyen/adyen-web";

AdyenCheckout(configuration);
```

`@adyen/adyen-web` 是三方支付 sdk 包，在用户选择商品、选择支付方式后点击提交时会用到，用来唤起支付页面。
该包大小为 843kb，如果直接静态导入，该包会直接打入 `chunk-vendors.js` 中。页面初始渲染时会依赖 `chunk-vendors` ，从而导致了首屏白屏时间长问题。

```js
// ✅ good

// submit callback
function onSubmit () {
  // 打包后 => 增加 adyen.js ，chunk-vendors大小不变
  const AdyenCheckout = (await import(/* webpackChunkName: "adyen" */ "@adyen/adyen-web")).default
  AdyenCheckout(configuration);
}
```

**分析：** 由于页面初始渲染时，并不依赖 `@adyen/adyen-web` 包，而在用户经过一系列操作提交订单时才需唤起支付，所以调整为点击提交按钮时调用 `onSubmit` 函数并用 `import()` 进行动态导入，这样包不会打入 `chunk-vendors` ，而是生成一个独立chunk `adyen.js` 。

### Vue 组件分包

<!-- TODO: -->

## 分包 optimization.splitChunks

webpack 有三种分包方式：

- 配置多个入口起点 entry
- 动态导入，如 import()
- 配置 `optimization.splitChunks` 分包

这边主要介绍 `optimization.splitChunks` 的方式。

### splitChunks 的默认配置

```js
// webpack4
module.exports = {
  //...
  optimization: {
    splitChunks: {
      // 表示选择哪些 chunks 进行分割，可选值有：async，initial和all
      chunks: "async",
      // 表示新分离出的chunk必须大于等于minSize
      minSize: 30000,
      maxSize: 0,
      // 表示一个模块至少应被minChunks个chunk所包含才能分割。默认为1。
      minChunks: 1,
      // 表示按需加载文件时，并行请求的最大数目
      maxAsyncRequests: 5,
      // 表示加载入口文件时，并行请求的最大数目
      maxInitialRequests: 3,
      // 文件名拼接符，如：vendors~main.js
      automaticNameDelimiter: "~",
      name: true,
      // 根据该字段分包，可以配置多个组
      // 根据test设置条件，符合test条件的模块，就分配到该组。
      // 模块可以被多个组引用，但最终会根据priority来决定打包到哪个组中。
      // 默认将所有来自 node_modules目录的模块打包至vendors组，
      // 将两个以上的chunk所共享的模块打包至default组。
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

以上默认配置的含义：

- 新的 chunk 可以被共享，或者模块来自于 `node_modules` 文件夹
- 新的 chunk 体积大于 30kb（在进行 min+gz 之前的体积）
- 当按需加载 chunks 时，并行请求的最大数量小于或等于 5
- 当加载初始化页面时，并发请求的最大数量小于或等于 3

### chunks

chunks 作用是限制拆分代码的范围，有效值为 `all`，`async` 和 `initial`。

- 默认为 `async` ，只从异步加载的 chunk 进行拆分。
- `initial` ，只从非异步加载的初始 chunk 进行拆分。
- `all`，即涵盖了 `async` 和 `initial` 所对应的 chunk 进行拆分。

### maxInitialRequests

初始 chunk 并发数 <= `maxInitialRequests` 才进行拆分。

初始 chunk 数即：页面渲染时一开始就要加载的 js，区别于页面加载完成后通过异步加载的 js。

### maxAsyncRequests

异步加载的并发数 <= `maxAsyncRequests` 才进行拆分。

### minChunks

模块被 >= `minChunks` 个 chunk 引用才进行分割。

### cacheGroups

`cacheGroups` 继承 `splitChunks` 里的所有属性的值，并且可以在 `cacheGroups` 中重新赋值，覆盖 `splitChunks` 的值。另外，还有一些属性只能在 `cacheGroups` 中使用：`test`、`priority` 、`reuseExistingChunk`。

通过 `cacheGroups`，我们可以定义自定义 chunk 组，通过 `test` 条件对模块进行过滤，符合条件的模块分配到相同的组。

`cacheGroups` 有两个默认的组，一个是 `vendors`，包含所有来自 `node_modules` 目录的模块；一个 `default`，包含了由两个以上的 chunk 所共享的模块。

#### name

指定当前组 chunk 文件的名称。

#### priority

指定组的优先级。若多个组都匹配分包条件，命中 `priorit` 最大的那个组

### 实际应用

`splitChunks` 主要围绕一下几点来进行配置

1. 拆分过大的 js 文件；
2. 合并较小的 js 文件；
3. 放置模块被重复打包；

由于 `chunk-vendor.js` 过大，导致首屏白屏时间长

## externals

<!-- TODO: -->

externals 更适合把第三方库移到 CDN 上
