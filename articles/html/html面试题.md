- [\<!DOCTYPE html>作用](#doctype-html作用)
- [html严格模式、混杂模式](#html严格模式混杂模式)
- [标签语义化](#标签语义化)
- [H5新特性](#h5新特性)
- [常见的浏览器内核，对内核的理解](#常见的浏览器内核对内核的理解)

## \<!DOCTYPE html>作用
\<!DOCTYPE> 声明位于文档中的最前面的位置，处于 \<html> 标签之前。

\<!DOCTYPE> 声明不是一个 HTML 标签；它是用来告知 Web 浏览器页面使用了哪种 HTML 版本。

```html
<!-- html标准 -->
<!DOCTYPE html>
```

## html严格模式、混杂模式
- 严格模式：严格模式的排版和JS运作模式是以该浏览器支持的最高标准运行。
- 混杂模式：混杂模式的页面以宽松的向后兼容的方式显示；模拟老的浏览器的行为以防止站点无法工作。

当html文档首行有定义<!DOCTYPE> 时，会以该行定义的规则来以严格模式解析

当未定义 <!DOCTYPE> 时，以混杂模式解析

**判断当前页面处于什么模式**

```js
if(document.compatMode === 'BackCompat'){
  console.log('混杂模式')
}else if(document.compatMode === 'CSS1Compat'){
  console.log('严格模式')
}
```

## 标签语义化
什么是标签语义化？

用合适的标签做合适的事。

标签语义化的好处？

- 阅读性高，更易维护
- 搜索引擎更好的识别，利于SEO
- 便于未来扩展

比如：
- header：页头
- main：标识主题内容，通常在body标签下
- footer：页脚
- nav：主导航
- aside：侧边栏
- article：文章
- dialog：弹窗

## H5新特性
1. 标签语义化
2. 音视频标签，audio、video
3. 表单
     - input标签新增type类型：date、color、month、email、tel、url等
     - 新增表单元素：keygen（公钥私钥），datalist，progress，meter，output
     - 新增表单属性：placeholder，min/max，pattern，required，width，height，multitype
4. 移除元素：big、font、center、frameset、frame
5. canvas画布
6. svg矢量图
7. web storage。包含localstorage、sessionStorage、cookie、session
8. 新增属性：window.navigator.geolocation，获取用户地理位置
9. WebSocket：实现浏览器与服务器全双工通讯，无同源策略限制，服务器可主动推送数据到浏览器
10. WebWorker：在主进程中开启一个异步线程，在主线程以外运行，执行时长久的代码可以用WebWorker来执行
11. postMessage：解决不同窗口通讯，支持跨域。

## 常见的浏览器内核，对内核的理解
1. Chrome浏览器：以前用WebKit内核，现在是Blink内核
2. IE浏览器：Trident内核，俗称IE内核
3. Firefox浏览器：Gecko内核
4. Safsri浏览器：WebKit内核

浏览器内核分为两部分：

- 渲染引擎：取得网页内容渲染页面
- JS引擎：解析javascript代码，实现页面交互