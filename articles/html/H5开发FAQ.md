<!--
 * @Date: 2021-07-27 11:07:26
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-08-23 15:27:23
 * @FilePath: /document-library/articles/html/H5开发FAQ.md
-->

- [记录 H5 开发时常见问题](#记录-h5-开发时常见问题)
  - [HTML](#html)
    - [网页自动翻译问题](#网页自动翻译问题)
    - [自动识别问题](#自动识别问题)
    - [自定义字体仅加载部分文字](#自定义字体仅加载部分文字)
  - [CSS](#css)
    - [禁用系统自带操作如](#禁用系统自带操作如)
    - [隐藏滚动条且可滚动](#隐藏滚动条且可滚动)
    - [表格边框合并](#表格边框合并)
    - [animation 开启 GPU 加速](#animation-开启-gpu-加速)
    - [CSS 帧动画频繁切换背景图，浏览器卡退](#css-帧动画频繁切换背景图浏览器卡退)
  - [JS](#js)
    - [enventBus 总线会触发多次](#enventbus-总线会触发多次)
    - [定义定时器时就要用 hook 注销](#定义定时器时就要用-hook-注销)
  - [插件](#插件)
    - [html2canvas 生成图片](#html2canvas-生成图片)
    - [点击复制文案到剪切板](#点击复制文案到剪切板)
  - [工程配置相关](#工程配置相关)
    - [使 px 单位不被 postcss-pxtorem 转换](#使-px-单位不被-postcss-pxtorem-转换)
    - [解决 vant UI 组件库在 H5 中变小](#解决-vant-ui-组件库在-h5-中变小)

# 记录 H5 开发时常见问题

## HTML

### 网页自动翻译问题

有时候网页在谷歌浏览器会自动翻译，导致多出不知名字体

```html
<!-- 解决方法： -->
<html lang="en" translate="no"></html>
```

### 自动识别问题

```html
<!-- 忽略浏览器自动识别数字为电话号码 -->
<meta name="format-detection" content="telephone=no" />

<!-- 忽略浏览器自动识别邮箱账号 -->
<meta name="format-detection" content="email=no" />
```

### 自定义字体仅加载部分文字

使用字体生成器提取页面会出现的字，减小加载字体大小。npm包：Fontmin

```js
const Fontmin = require('fontmin')
const fontmin = new Fontmin()
  .src('./汉仪大宋繁.ttf') // 字体包路径
  .dest('public/') // 提取后存放路径
  .use(
    Fontmin.glyph({
      text:
        '已召集成员數1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', // 要提取的文字
      hinting: false
    })
  )
  .use(
    Fontmin.ttf2woff({
      deflate: true
    })
  )
fontmin.run(err => {
  if (err) {
    throw err
  }
})
```

## CSS

### 禁用系统自带操作如

```css
// 禁止长按图片保存
img {
  -webkit-touch-callout: none;
  pointer-events: none; // 像微信浏览器还是无法禁止，加上这行样式即可
}

// 禁止长按选择文字
div {
  -webkit-user-select: none;
}

// 禁止长按呼出菜单
div {
  -webkit-touch-callout: none;
}
```

### 隐藏滚动条且可滚动

```css
.demo::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.demo {
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
}
```

### 表格边框合并

```css
table,
tr,
td {
  border: 1px solid #666;
}
table {
  border-collapse: collapse;
}
```

### animation 开启 GPU 加速

CSS transforms 或者 animations 时可能会有页面闪烁。
平时我们写的 css3 动画（没有触发硬件加速的）都是使用浏览器缓慢的软件渲染引擎来执行。

3D transform 会启用 GPU 加速，如 translate3D, scaleZ。（ GPU 即图形处理器，是与处理和绘制图形相关的硬件）。注意要适度使用，只需要使用 css 动画闪烁和卡顿的元素上，否则会适得其反（GPU 加速代价是手机耗电）。

```css
/* css开启硬件加速，动画使用translate3D实现，并加上以下样式 */
will-change: transform;
```

### CSS 帧动画频繁切换背景图，浏览器卡退

**复现环境**：安卓手机。（苹果不会复现，可由于系统内存设计不同）。

**原因**：雪碧图宽度和高度过大，运行动画帧占用了很大内存，加上频繁切换动画效果的额外内存，导致浏览器内存溢出从而卡死。

**CSS 帧动画内存占用计算：**
透明图片：图片长*宽*4/1024/1024 = 内存占用(MB)
不透明图片：图片长*宽*3/1024/1024 = 内存占用(MB)

原本使用的图片为：20288*918
其内存占用为：20288*918\*4/1024/1024 = 71.04MB

让 ui 调整后图片：16544*540
其内存占用为：16544*540\*4/1024/1024 = 34.07MB

**解决方案：**
缩小雪碧图宽度和高度。
如果有涉及可频繁切换背景图，帧动画内存占用控制在 35MB 左右
如果不涉及切换背景图，内存占用控制在 70MB 左右
避免频繁切换动画所消耗内存。比如给对应按钮添加节流效果。
预加载雪碧图及缓存图片

## JS

### enventBus 总线会触发多次

```js
bus.$on("rewardList", () => {
  this.getRewardList();
});
// 时间总线会触发多次
this.$once("hook:beforeDestroy", () => {
  bus.$off("rewardList");
});
```

### 定义定时器时就要用 hook 注销

```js
this.timer = setInterval(() => this.timeCountdown(), 1000);
this.$once("hook:beforeDestroy", () => {
  clearInterval(this.timer);
});
```

## 插件

### html2canvas 生成图片

html2canvas 生成海报截图，海报的 dom 结构(wrapper)必须是可见的，不可以设置 opacity:0 或者 display：none 等隐藏效果，否则无法生成截图，屏幕会黑屏。若海报内容需要重新排版，则可以设置 top: -9999px;

```js
html2canvas(document.getElementById("wrapper"), {
  useCORS: true,
  backgroundColor: null,
  dpi: window.devicePixelRatio,
  allowTaint: false,
})
  .then(function (canvas) {
    let base64 = canvas.toDataURL("image/png", 1.0);
    that.poster_url = base64;
    that.imgShow = true;
  })
  .catch((err) => {
    console.log("save -> err", err);
  });
```

1.html2canvas 生成的海报模糊问题：

dom 结构（wrapper）的图片不用 background 背景图而使用 img 就不会模糊。

2.html2canvas 生成的画布生成图片时，有黑边。

可以尝试 canvas.toDataURL("image/png", 1.0)替换 canvas.toDataURL("image/jpeg", 1.0)

### 点击复制文案到剪切板

npm 包 **v-clipboard**

```bash
npm i v-clipboard -S
```

use

```html
<span
  v-clipboard="onCopy(item.redeem_code)"
  v-clipboard:success="clipboardSuccessHandler"
  >复制</span
>
```

```js
    clipboardSuccessHandler ({ value, event }) {
      Toast('复制成功')
    },
    onCopy (value) {
      return value
    },
```

## 工程配置相关

### 使 px 单位不被 postcss-pxtorem 转换

H5 项目默认使用了 postcss-pxtorem 插件来自动转换 px 单位为 rem 单位，以下方式可让部分样式不被转换：

方案一：postcss-pxtorem 默认不会转换大写的 PX，不需要转换的部分可使用 PX 开发。

方案二：使用 selectorBlackList 属性，配置要过滤类白名单

```js
// postcss.config.js

export default {
      plugins: {
       ...
      'postcss-pxtorem': {
        rootValue: 100,
        propList: ['*'],
        // 使用selectorBlackList，以.noUseToRem-开头的类都不转换
        selectorBlackList: [
          '.noUseToRem-'
        ]
      }
      ...
    }
}
```

### 解决 vant UI 组件库在 H5 中变小

通常 UI 设计师给到开发的设计稿是 750px，开发时使用 postcss-pxtorem 插件自动转换 px 单位。

如果项目中使用了 vant 组件库，会发现 vant 组件会变得很小，这是因为 vant UI 库的设计稿是 375px。

解决：修改配置，当匹配到依赖为 vant 时，修改 postcss-pxtorem 插件的 rootValue 为 50 即可。

```js
// postcss.config.js

const path = require("path");
module.exports = ({ file }) => {
  // 兼容使用vant。由于vant组件设计稿为375px，活动ui设计稿为750
  const designWidth = file.dirname.includes(path.join("node_modules", "vant"))
    ? 50
    : 100;
  return {
    plugins: {
      autoprefixer: {
        browsers: ["Android >= 4.0", "iOS >= 8"],
      },
      "postcss-pxtorem": {
        rootValue: designWidth,
        propList: ["*"],
      },
    },
  };
};
```
