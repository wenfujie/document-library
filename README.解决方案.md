<!--
 * @Date: 2021-06-16 17:22:48
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-09-10 17:16:25
 * @FilePath: /document-library/README.解决方案.md
-->

- [技术解决方案](#技术解决方案)
  - [多 package 管理及代码重用](#多-package-管理及代码重用)
  - [仿 soul 实现 3D 标签云](#仿-soul-实现-3d-标签云)
  - [服务端渲染 Nuxt.js](#服务端渲染-nuxtjs)
  - [Excel 文件和 json 的相互转换](#excel-文件和-json-的相互转换)
  - [在线查看 Excel 文件](#在线查看-excel-文件)

# 技术解决方案

## 多 package 管理及代码重用

[lerna：多 package 管理及代码重用](articles/解决方案/lerna-多package管理及代码重用.md)

## 仿 soul 实现 3D 标签云

![](images/解决方案/tagcloud.gif)

[github 仓库](https://github.com/mcc108/TagCloud/blob/master/README.CN.md)

## 服务端渲染 Nuxt.js

[Nuxt.js 入门](articles/解决方案/nuxt.js服务端渲染.md)

## Excel 文件和 json 的相互转换

[https://github.com/wenfujie/excel-to-json](https://github.com/wenfujie/excel-to-json)

## 在线查看 Excel 文件

```js
// 修改src参数为文件地址即可（必须是公网地址）
<iframe
  src="https://view.officeapps.live.com/op/view.aspx?src=https://dc-vizier-sourse.oss-cn-beijing.aliyuncs.com/test.xls"
  width="1200px"
  height="900px"
  frameborder="1"
></iframe>
```
