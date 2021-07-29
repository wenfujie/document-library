<!--
 * @Date: 2021-07-28 10:38:55
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-07-29 16:17:10
 * @FilePath: /document-library/articles/js相关/js代码片段.md
-->

- [工具](#工具)
  - [多线程执行函数](#多线程执行函数)
  - [生成 UUID](#生成-uuid)
  - [解析 cookie](#解析-cookie)
  - [获取网址参数](#获取网址参数)
  - [复制到剪切板](#复制到剪切板)
  - [简版 jquery 选择器](#简版-jquery-选择器)
- [业务功能](#业务功能)
  - [平滑滚动到页面顶部](#平滑滚动到页面顶部)
  - [将视口平滑滚动到指定元素](#将视口平滑滚动到指定元素)
  - [监听滚动结束](#监听滚动结束)
  - [监听点击指定元素外部](#监听点击指定元素外部)
  - [获取浏览器当前语言](#获取浏览器当前语言)
  - [控制浏览器全屏、退出全屏](#控制浏览器全屏退出全屏)
  - [封装原生 GET、POST 请求](#封装原生-getpost-请求)
- [DOM 操作](#dom-操作)
  - [元素添加、移除、切换类](#元素添加移除切换类)
  - [移除一个元素](#移除一个元素)
  - [判断元素上是否包含指定的类](#判断元素上是否包含指定的类)
  - [获取一个元素下所有图片地址](#获取一个元素下所有图片地址)
  - [创建字符串片段的元素](#创建字符串片段的元素)
  - [主动触发 dom 事件](#主动触发-dom-事件)
- [Date](#date)
  - [获取月份的总天数](#获取月份的总天数)
  - [将日期转换为 yyyy-MM-dd](#将日期转换为-yyyy-mm-dd)
  - [将日期转换为 HH:MM:SS](#将日期转换为-hhmmss)
  - [返回天、时、分、秒、毫秒](#返回天时分秒毫秒)
  - [返回给定秒数的 ISO 格式('00:00:00')](#返回给定秒数的-iso-格式000000)
  - [判断两个时间是否相同](#判断两个时间是否相同)
  - [判断给定年份是否是闰年](#判断给定年份是否是闰年)
  - [判断给定日期是否是周末](#判断给定日期是否是周末)
  - [返回给指定日期添加增量时间后的时间](#返回给指定日期添加增量时间后的时间)
- [有趣的 JS](#有趣的-js)
  - [如何在 JS 实现睡眠功能](#如何在-js-实现睡眠功能)
    - [同步版本](#同步版本)
    - [异步版本](#异步版本)

## 工具

### 多线程执行函数

```js
const runAsync = (fn) => {
  const worker = new Worker(
    URL.createObjectURL(new Blob([`postMessage((${fn})());`]), {
      type: "application/javascript; charset=utf-8",
    })
  );
  return new Promise((res, rej) => {
    worker.onmessage = ({ data }) => {
      res(data), worker.terminate();
    };
    worker.onerror = (err) => {
      rej(err), worker.terminate();
    };
  });
};

// Examples
const longRunningFunction = () => {
  let result = 0;
  for (let i = 0; i < 1000; i++)
    for (let j = 0; j < 700; j++)
      for (let k = 0; k < 300; k++) result = result + i + j + k;

  return result;
};
/*
  NOTE: Since the function is running in a different context, closures are not supported.
  The function supplied to `runAsync` gets stringified, so everything becomes literal.
  All variables and functions must be defined inside.
*/
runAsync(longRunningFunction).then(console.log); // 209685000000
runAsync(() => 10 ** 3).then(console.log); // 1000
let outsideVariable = 50;
runAsync(() => typeof outsideVariable).then(console.log); // 'undefined'
```

### 生成 UUID

```js
const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

// Examples
UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'
```

### 解析 cookie

```js
const parseCookie = (str) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

// Examples
parseCookie("foo=bar; equation=E%3Dmc%5E2");
// { foo: 'bar', equation: 'E=mc^2' }
```

### 获取网址参数

```js
const getURLParameters = (url) =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
    ),
    {}
  );

// Examples
getURLParameters("google.com"); // {}
getURLParameters("http://url.com/page?name=Adam&surname=Smith");
// {name: 'Adam', surname: 'Smith'}
```

### 复制到剪切板

以下方式仅在用户执行操作时有效，如：click 事件

```js
const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

// Examples
copyToClipboard("Lorem ipsum"); // 'Lorem ipsum' copied to clipboard.
```

### 简版 jquery 选择器

```js
// 仅选中第一个元素
const $ = document.querySelector.bind(document);
// 选中所有
const $$ = document.querySelectorAll.bind(document);

const mainContent = $(".main-content");
const externalLinks = $$('a[target="_blank"]');
```

## 业务功能

### 平滑滚动到页面顶部

```js
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

// Examples
scrollToTop();
```

### 将视口平滑滚动到指定元素

```js
const smoothScroll = (element) =>
  document.querySelector(element).scrollIntoView({
    behavior: "smooth",
  });

// Examples
smoothScroll("#fooBar");
```

### 监听滚动结束

```js
const onScrollStop = (callback) => {
  let isScrolling;
  window.addEventListener(
    "scroll",
    (e) => {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        callback();
      }, 150);
    },
    false
  );
};

// Examples
onScrollStop(() => {
  console.log("The user has stopped scrolling");
});
```

### 监听点击指定元素外部

```js
const onClickOutside = (element, callback) => {
  document.addEventListener("click", (e) => {
    if (!element.contains(e.target)) callback();
  });
};

// Examples
onClickOutside("#my-element", () => console.log("Hello"));
```

### 获取浏览器当前语言

```js
// defaultLang 为默认语言
const detectLanguage = (defaultLang = "en-US") =>
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;

// Examples
detectLanguage(); // 'nl-NL'
```

### 控制浏览器全屏、退出全屏

```js
const fullscreen = (mode = true, el = "body") =>
  mode
    ? document.querySelector(el).requestFullscreen()
    : document.exitFullscreen();

// Examples
fullscreen(); // Opens `body` in fullscreen mode
fullscreen(false); // Exits fullscreen mode
```

### 封装原生 GET、POST 请求

```js
const httpGet = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send();
};

const httpPost = (url, data, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open("POST", url, true);
  request.setRequestHeader("Content-type", "application/json; charset=utf-8");
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send(data);
};

// Examples
httpGet("https://jsonplaceholder.typicode.com/posts/1", console.log); /*
Logs: {
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
*/

httpPost(
  "https://jsonplaceholder.typicode.com/posts",
  null, // does not send a body
  console.log
); /*
Logs: {
  "id": 101
}
*/
```

## DOM 操作

### 元素添加、移除、切换类

```js
const addClass = (el, className) => el.classList.add(className);
const removeClass = (el, className) => el.classList.remove(className);
const toggleClass = (el, className) => el.classList.toggle(className);

// Examples
addClass(document.querySelector("p"), "special");
removeClass(document.querySelector("p.special"), "special");
toggleClass(document.querySelector("p.special"), "special");
```

### 移除一个元素
```js
const removeElement = el => el.parentNode.removeChild(el);

// Examples
removeElement(document.querySelector('#my-element'));
```

### 判断元素上是否包含指定的类

```js
const hasClass = (el, className) => el.classList.contains(className);

// Examples
hasClass(document.querySelector("p.special"), "special"); // true
```

### 获取一个元素下所有图片地址

```js
// includeDuplicates 是否去重
const getImages = (el, includeDuplicates = false) => {
  const images = [...el.getElementsByTagName("img")].map((img) =>
    img.getAttribute("src")
  );
  return includeDuplicates ? images : [...new Set(images)];
};

// Examples
getImages(document, true); // ['image1.jpg', 'image2.png', 'image1.png', '...']
getImages(document, false); // ['image1.jpg', 'image2.png', '...']
```

### 创建字符串片段的元素

```js
// 注意：最外层不可有同级兄弟元素，如果有只会返回第一个
const createElement = (str) => {
  const el = document.createElement("div");
  el.innerHTML = str;
  return el.firstElementChild;
};

// Examples
const el = createElement(
  `<div class="container">
    <p>Hello!</p>
  </div>`
);
```

### 主动触发 dom 事件

```js
const triggerEvent = (el, eventType, detail) =>
  el.dispatchEvent(new CustomEvent(eventType, { detail }));

// Examples
triggerEvent(document.getElementById("myId"), "click");
triggerEvent(document.getElementById("myId"), "click", { username: "bob" });
```

## Date

### 获取月份的总天数

利用 setDatesh(0)时，会将日期设置为对应月份的最后一天。

```js
const daysInMonth = (year, month) => new Date(year, month, 0).getDate();

// Examples
daysInMonth(2020, 12)); // 31
daysInMonth(2024, 2)); // 29
```

### 将日期转换为 yyyy-MM-dd

```js
const getISODate = (date) => data.toISOString().split("T")[0];

// Examples
getISODate(new Date()); // "2021-07-28"
```

### 将日期转换为 HH:MM:SS

```js
const getColonTimeFromDate = (date) => date.toTimeString().slice(0, 8);

// Examples
getColonTimeFromDate(new Date()); // '08:38:00'
```

### 返回天、时、分、秒、毫秒

```js
const formatDuration = (ms) => {
  if (ms < 0) ms = -ms;
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000,
  };
  return Object.entries(time)
    .filter((val) => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}${val !== 1 ? "s" : ""}`)
    .join(", ");
};

// examples
formatDuration(1001); // '1 second, 1 millisecond'
formatDuration(34325055574);
// '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'
```

### 返回给定秒数的 ISO 格式('00:00:00')

```js
const formatSeconds = (s) => {
  const [hour, minute, second, sign] =
    s > 0
      ? [s / 3600, (s / 60) % 60, s % 60, ""]
      : [-s / 3600, (-s / 60) % 60, -s % 60, "-"];

  return (
    sign +
    [hour, minute, second]
      .map((v) => `${Math.floor(v)}`.padStart(2, "0"))
      .join(":")
  );
};

// Examples
formatSeconds(200); // '00:03:20'
formatSeconds(-200); // '-00:03:20'
formatSeconds(99999); // '27:46:39'
```

### 判断两个时间是否相同

```js
const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();

// Examples
isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true
```

### 判断给定年份是否是闰年

```js
const isLeapYear = (year) => new Date(year, 1, 29).getMonth() === 1;

// Examples
isLeapYear(2019); // false
isLeapYear(2020); // true
```

### 判断给定日期是否是周末

利用 getDay 方法，周 6 时返回 6，周日时返回 0。

```js
const isWeekend = (d = new Date()) => d.getDay() % 6 === 0;

// Examples
isWeekend(new Date(2021, 6, 29)); // false
isWeekend(new Date(2021, 6, 31)); // true
```

### 返回给指定日期添加增量时间后的时间

利用`setDate`方法会自动换算大于 31 天的日期。

```js
const addDaysToDate = (date, n) => {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
};

// Examples
addDaysToDate("2020-10-15", 10); // '2020-10-25'
addDaysToDate("2020-10-15", -10); // '2020-10-05'
```

## 有趣的 JS

### 如何在 JS 实现睡眠功能

#### 同步版本

Date.prototype.getTime()可以在 while 循环内使用以暂停执行一段时间。

```js
const sleepSync = (ms) => {
  const end = new Date().getTime() + ms;
  while (new Date().getTime() < end) {
    /* do nothing */
  }
};

const printNums = () => {
  console.log(1);
  sleepSync(500);
  console.log(2);
  console.log(3);
};

printNums(); // Logs: 1, 2, 3 (2 and 3 log after 500ms)
```

#### 异步版本

```js
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const printNums = async () => {
  console.log(1);
  await sleep(500);
  console.log(2);
  console.log(3);
};

printNums(); // Logs: 1, 2, 3 (2 and 3 log after 500ms)
```
