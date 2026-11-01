- [相关依赖](#相关依赖)
- [JSZip浏览器支持](#jszip浏览器支持)
- [简单应用](#简单应用)
- [结合axios实现批量打包下载](#结合axios实现批量打包下载)

## 相关依赖
- [JSZip](https://stuk.github.io/jszip/)：用于创建、读取和编辑.zip文件的javascript库
- [FileSaver](https://github.com/eligrey/FileSaver.js/)：将文件保存到本地的解决方案
- [axios](http://www.axios-js.com/)：Vue推荐的http库

## JSZip浏览器支持

Opera | Firefox | Safari | Chrome | Internet Explorer | Node.js
---|---|---|---|---|---
Yes | Yes | Yes | Yes | Yes | Yes
Tested with the latest version | Tested with 3.0 / 3.6 / latest version | Tested with the latest version | Tested with the latest version | Tested with IE 6 / 7 / 8 / 9 / 10 | Tested with node.js 0.10 / latest version

## 简单应用

```javascript
// 简单使用

import JSZip from 'jszip';
import FileSaver from 'file-saver';

var zip = new JSZip();
zip.file("Hello.txt", "Hello World\n");
// zip.folder(name):如果目录不存在，创建一个目录，并以新文件夹为根返回一个新的JSZip对象。
var img = zip.folder("images");
img.file("smile.gif", imgData, {base64: true});
zip.generateAsync({type:"blob"})
.then(function(content) {
    // 将文件保存到本地
    FileSaver.saveAs(content, "example.zip");
});
```
**zip.file(name, data, options)**，将文件添加（或更新）到zip文件中。

name | type | description
---|---|---
name | string | 	文件名。您可以在名称中指定文件夹：文件夹分隔符为正斜杠（“ /”）。
data | String/ArrayBuffer/Uint8Array/Buffer/Blob/Promise/Nodejs stream | 文件的内容。
options | object | [配置选项](https://stuk.github.io/jszip/documentation/api_jszip/file_data.html)

**zip.generateAsync( object )**，在当前文件夹级别生成完整的zip文件。

其中参数object支持的配置可看[官方说明](https://stuk.github.io/jszip/documentation/api_jszip/generate_async.html)，这边简单说说type配置项。

**可能的值type：**

1. base64：结果将是一个字符串，二进制格式为base64。
1. binarystring（或string已弃用）：结果将是“二进制”形式的字符串，每个字符使用1个字节（2个字节）。
1. array：结果将是字节数组（0到255之间的数字）。
1. uint8array：结果将是包含Uint8Array的zip。这需要兼容的浏览器。
1. arraybuffer：结果将是一个包含ArrayBuffer的zip。这需要兼容的浏览器。
1. blob：结果将是包含Blob的zip。这需要兼容的浏览器。
1. nodebuffer：结果将是包含nodebuffer的zip。这需要nodejs。

## 结合axios实现批量打包下载

```javascript
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import axios from 'axios';

// 增加getFile方法异步获取远程资源
getFile(url) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        responseType: 'blob'
      })
        .then(data => {
          resolve(data);
        })
        .catch(error => {});
    });
},

compressedFiles(allUrl) {
    const zip = new JSZip();
    const promises = [];
    
    allUrl.forEach((item, index) => {
      const promise = this.getFile(item).then(data => {
        // 获取文件名
        zip.file(`name{index}`, data.data); // 逐个添加文件
      });
      promises.push(promise);
    });
    Promise.all(promises).then(() => {
      zip.generateAsync({ type: 'blob' }).then(content => {
        FileSaver.saveAs(content, '压缩文件.zip');
      });
    });
},

// use
this.compressedFiles(['http://path1','http://path2']);
```

**这就对远程资源实现批量打包下载啦！**