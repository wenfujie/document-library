## 前言

`CSP(Content-Security-Policy)`是一个HTTP response header, 它描述允许页面控制用户代理能够为指定的页面加载哪些资源, 可防止XSS攻击。



### 使用

```js
Content-Security-Policy: 指令1 value1 value2 value3; 指令2 value1 value2;
```

nginx 使用举例：

```bash
add_header Content-Security-Policy img-src a.b.c; script-src 'unsafe-inline' a.b.c; style-src 'self'                                         
```



### 常用指令

以下指令用于限制仅限加载指定域下的字体、iframe、img、script等

```js
font-src
frame-src
img-src
script-src
media-src
style-src
...等等

```

[MDN查看更多指令](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy)



### 常用值

**指定域**

其中 * 表示通配符：

```bash
https://*.qq.com
https://a.b.com
*.qq.com
www.qq.com
```



**self**

仅能加载当前域下的资源

```bash
# 只能加载当前域下的样式
add_header Content-Security-Policy style-src 'self'                                       
```



**unsafe-inline**

允许使用内联资源，例如内联`javascript`元素
