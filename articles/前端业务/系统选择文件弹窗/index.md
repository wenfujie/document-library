
## 原生打开系统选择文件弹窗
1. 使用 `input` 标签，并设置type="file"；
2. 默认单选，添加 `multiple` 属性支持多选；
3. `accept` 属性可配置要限制选择文件类型，多个类型以逗号分隔；
4. input 的点击事件亦可触发弹窗显示；


```html
  <!-- html -->

  <form action="">
    <input type="file" name="file" id="files" multiple accept="video/quicktime,audio/mpeg" />
  </form>

  <button onclick="selectFile()">模拟点击</button>
```

```javascript
  // js

  // 监听文件选择 event
  document.getElementById("files")
    .addEventListener('change', function (event) {
      let fileItem = null
      for (var i = 0; i < event.target.files.length; i++) {
        fileItem = event.target.files[i]
        console.log('选择文件' + i, fileItem);
      }

      // 解决无法再次选择上次所选文件
      event.target.value = ''
    });

  function selectFile() {
    document.getElementById("files").click()
  }
```
