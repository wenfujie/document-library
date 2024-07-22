
## 文字下滚动波浪线

**原文**：张鑫旭的 [css实现文字下面波浪线动画效果](https://www.zhangxinxu.com/wordpress/2019/04/css-wave-wavy-animation/)

[查看效果](https://www.zhangxinxu.com/study/201903/css-idea/animation-flow.php?aside=0&kind=3)

**实现**

```css
  /* css */
  .svg-wave {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 4'%3E%3Cpath fill='none' stroke='%23F33' d='M0 3.5c5 0 5-3 10-3s5 3 10 3 5-3 10-3 5 3 10 3'/%3E%3C/svg%3E") repeat-x 0 100%; 
    background-size: 20px auto;
  }
  .svg-wave {
    animation: waveMove 1s infinite linear;
  }
  @keyframes waveMove {
      from { background-position: 0 100%; }
      to   { background-position: -20px 100%; }
  }
```
```html
  <!-- html -->
  <div class="svg-wave">test</div>
```

修改background代码中的stroke='%23333'这部分，'%23'就是#，因此，stroke='%23333'其实就是stroke='#333'的意思。

## 边框loading效果

**原文**：张鑫旭的 [渐变虚框及边框滚动动画的纯CSS实现](https://www.zhangxinxu.com/wordpress/2018/08/css-gradient-dashed-border/)

[查看效果](https://www.zhangxinxu.com/study/201808/border-solid-loading-animation.php)

**实现**

```html
  <div class="box">
    <div class="box-child"></div>
  </div>
```
```css
.box{
      display: inline-block;
      padding: 10px;
      position: relative;
    }
    .box-child{
      width: 128px;
      height: 96px;
      background: burlywood;
    }
    .box::before{
      content: '';
      position: absolute;
      left: 0; right: 0; top: 0; bottom: 0;
      border: 2px solid greenyellow;
      animation: borderAround 1.5s infinite linear;
    }
    @keyframes borderAround {
      0%, 100% { clip: rect(0 148px 2px 0); }
      25% { clip: rect(0 148px 116px 146px); }
      50% { clip: rect(114px 148px 116px 0); }
      75% { clip: rect(0 2px 116px 0); }
    }
```