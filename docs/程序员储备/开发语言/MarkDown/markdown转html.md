# 浅谈 Markdown 转换 html
## 1. 前言
### 1.1 博客生成器
​[VuePress](https://vuepress.vuejs.org/zh/guide/)
> VuePress 一款极简静态网站生成器。
> 开发时：一个 VuePress 网站是一个由 [Vue](http://vuejs.org/)、[Vue Router](https://github.com/vuejs/vue-router)和 [webpack](http://webpack.js.org/)驱动的单页应用。
> 构建时：会为应用创建一个服务端渲染（SSR）的版本，然后通过虚拟访问每一条路径来渲染对应的HTML

优势：
1.服务端渲染，具有非常好的SEO
2.Vue架构，插件开发体验好
​

劣势：
1.在md文件中使用Vue语法时，必须遵循[服务端渲染规范](https://ssr.vuejs.org/zh/guide/universal.html)


### 1.2 浏览器如何展示 Markdown


将 markdown 语法的文件，解析为 html 文件，浏览器直接渲染 html 。


> markdown-it：目前使用最广泛的markdown解析器工具

​

简单使用
```javascript
const md = require("markdown-it")(options);
const htmlStr = md.render('# test')
// 得到 <h1>test</h1>
```
​

[markdown-it 转换效果预览](https://markdown-it.github.io/)


[markdown-it 官网](https://github.com/markdown-it/markdown-it)


下面来看看 markdown-it 是如何完成从 # test 到 \<h1>test\</h1> 的转换。
​

## 2. markdown-it 转换原理


转换流程图：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/21369771/1637992510711-42f9fc59-aa21-4bd7-ab10-4bdfcb01f6e7.png#clientId=ucfc6c323-3fea-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=384&id=L0S3s&margin=%5Bobject%20Object%5D&name=image.png&originHeight=768&originWidth=1014&originalType=binary&ratio=1&rotation=0&showTitle=false&size=172202&status=done&style=none&taskId=u04d0c085-f6a9-4095-899e-d0524e0deb6&title=&width=507)


可看出转换过程主要分两步：

- ​将 MD 文档 Parsing 为 Tokens。
- 渲染这个 Tokens​

​

### 2.1 基础类—— Token & Ruler
要想理清 MarkdownIt 的原理，必须要清楚两个基础类—— Ruler & Token。
​

#### Token 类
md 代码经过一系列的 parser 的处理，变成了一个个 token。
​

Token 的定义：
```javascript
// lib/token.js
function Token(type, tag, nesting) {
  // token 的类型，比如 paragraph_open 、paragraph_close、hr，分别会渲染成 <p>、</p>、<hr>。
  this.type     = type; 
  // 标签名称，比如 p、strong、''(空字符串代表是文字)等等
  this.tag      = tag;
  // HTML 标签元素的特性，如果存在，则是一个二维数组，比如 [["href", "http://dev.nodeca.com"]]
  this.attrs    = null;
  // token 的位置信息，数组只有两个元素，前者是起始行、后者是结束行。
  this.map      = null;
  // 标签的类型，1 是开标签，0 是自闭合标签，-1 是关标签。例如 <p>、<hr/>、</p>。
  this.nesting  = nesting;
  // 缩紧的层级。
  this.level    = 0;
  // 子token。只有 type 为 inline 或者 image 的 token 会有 children。 
  // token 还会经历一次 parser，提取出更详细的 token
  this.children = null;
  // 放置标签之间的内容。
  this.content  = '';
  // 一些特定语法的标记。比如 ``` 表明是一个 code block。"-" 是一个列表。
  this.markup   = '';
  // type 为 fence 的 token 会有 info 属性
  // 像 ```js  ``` 所解析出来的 token 就属于 type 为 fence 的 token，它的 info = js
  this.info     = '';
  // 一般插件用来放任意数据的。
  this.meta     = null;
  // ParserCore 生成的 token 的 block 为 true，ParserInline 生成的 token 的 block 为 false。
  this.block    = false;
  // 如果为 true，该 token 不会被 render。
  this.hidden   = false;
}

```
​

#### Ruler 类
Ruler 内部存储了很多 rule 函数，rule 的职能分为两种：

- 一种是 parse rule，用来解析用户传入的字符串，生成 token
- 另一种是 render rule，在产出 token 之后，根据 token 的类型调用不同的 render rule，最终吐出 HTML 字符串。

​

Ruler 的构造函数：
```javascript
function Ruler() {
  this.__rules__ = [];
  this.__cache__ = null;
}
```
__rules__ ，用来放所有的 rule 对象，它的结构：
```javascript
[{
  name: XXX,
  enabled: Boolean, // 是否开启
  fn: Function(), // 处理函数
  alt: [ name2, name3 ] // 所属的职责链名称
}]
```
__cache__，用来存放 rule chain （规则链路） 的信息，以此确定规则的调用顺序，它的结构：
```javascript
{
  职责链名称: [rule1.fn, rule2.fn, ...]
}

```
举例说明：
```javascript
let ruler = new Ruler()
ruler.push('rule1', rule1Fn, {
  alt: 'chainA'
})
ruler.push('rule2', rule2Fn, {
  alt: 'chainB'
})
ruler.push('rule3', rule3Fn, {
  alt: 'chainB'
})
ruler.__compile__()

// 我们能得到如下的结构
ruler.__cache__ = {
  '': [rule1Fn, rule2Fn, rule3Fn],
  'chainA': [rule1Fn],
  'chainB': [rule2Fn, rule3Fn],
}
// 得到了三个 rule chain,分别为 '', 'chainA', 'chainB'.
```
​

### 2.2 Parsing 过程
​

整个 Parsing 主要逻辑在 ParserCore 这个类中。
​

#### ParserCore 类


ParserCore 类的主要逻辑：
```javascript
var _rules = [
  [ 'normalize',      require('./rules_core/normalize')      ],
  [ 'block',          require('./rules_core/block')          ],
  [ 'inline',         require('./rules_core/inline')         ],
  [ 'linkify',        require('./rules_core/linkify')        ],
  [ 'replacements',   require('./rules_core/replacements')   ],
  [ 'smartquotes',    require('./rules_core/smartquotes')    ]
];

function Core() {
  this.ruler = new Ruler();

  for (var i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1]);
  }
}

Core.prototype.process = function (state) {
  var i, l, rules;

  // 获取__cache__，拿到规则链路
  rules = this.ruler.getRules('');

  for (i = 0, l = rules.length; i < l; i++) {
    rules[i](state);
  }
};

Core.prototype.State = require('./rules_core/state_core');
```
ParserCore 类的原型上有一个 process 方法，其中 this.ruler.getRules 会返回 Ruler 类的 __cache__ 属性，所以该方法最终目的就是以 __cache__ 链路顺序去触发所有 rules 方法。
​

关注点聚焦到 Rules 上，其实每个 Rule 的工作要么添加新的 Token ，要么修改原来的 Token。
下面看看 Core Rules 都有哪些：
​

> - normalize: MD 文档的换行符统一化；将空字符 \u0000 转换为 \uFFFD
> - block: 识别出哪些是 Block Token(Table, blockquote, Code, Fence 等)，哪些是 Inline Token。如果是 Block Token，则启动 Block Chain 来处理。
> - inline: 针对 Block Rule 识别出来的 'inline' 类型的 token 进行处理
> - linkify: 检测 text 类型的 token 中是否有可是别的 URL(http 或者 mailto)，如果有，则将原本完整的 text token 分为 text, link, text 三部分(实际不只三个 tokens, 因为 link_open, link_close 这些 tokens 都会被产生)
> - replacements: 完成诸如 (c) (C) → © ，+- → ±的替换，同时躲开 link 中的包含的对象文字
> - smartquotes: 完成引号的排印化处理

​

由于[解析规则](https://github.com/markdown-it/markdown-it/tree/master/lib/rules_core)太多，我们以 # test 的解析来说明：
主要是使用到了 block Rules 下的 heading 方法作用是解析标题标签(h1 - h6)。它的语法主要是 #, ##, ### 等等。
```javascript
module.exports = function heading(state, startLine, endLine, silent) {
  var ch, level, tmp, token,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  // 行前空格数超过 4 个，表示为代码块，无需转换
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  // 返回字符串中指定位置字符的 Unicode 编码
  ch  = state.src.charCodeAt(pos);
	// 未以 # 开头，无需转换
  if (ch !== 0x23/* # */ || pos >= max) { return false; }

  // 记录标题的等级
  level = 1;
  
  ch = state.src.charCodeAt(++pos);
  
  // 统计 # 的个数来计算标题等级
  while (ch === 0x23/* # */ && pos < max && level <= 6) {
    level++;
    ch = state.src.charCodeAt(++pos);
  }

  // 特殊场景无需转换（# 个数超过6个）、（ # 之后未跟空格）
  if (level > 6 || (pos < max && !isSpace(ch))) { return false; }

  // silent 为对外配置，用于外部控制无需转换
  if (silent) { return true; }

  // 去除多于空格（如 '  ###  '）
  max = state.skipSpacesBack(max, pos);
  tmp = state.skipCharsBack(max, 0x23, pos); // #
  if (tmp > pos && isSpace(state.src.charCodeAt(tmp - 1))) {
    max = tmp;
  }

  state.line = startLine + 1;

  // 转化为 token
  token        = state.push('heading_open', 'h' + String(level), 1);
  token.markup = '########'.slice(0, level);
  token.map    = [ startLine, state.line ];

  token          = state.push('inline', '', 0);
  token.content  = state.src.slice(pos, max).trim();
  token.map      = [ startLine, state.line ];
  token.children = [];

  token        = state.push('heading_close', 'h' + String(level), -1);
  token.markup = '########'.slice(0, level);

  return true;
};
```
转换后的结果：
```javascript
[
  {
    "type": "heading_open",
    "tag": "h1",
    "attrs": null,
    "map": [
      0,
      1
    ],
    "nesting": 1,
    "level": 0,
    "children": null,
    "content": "",
    "markup": "#",
    "info": "",
    "meta": null,
    "block": true,
    "hidden": false
  },
  {
    "type": "inline",
    "tag": "",
    "attrs": null,
    "map": [
      0,
      1
    ],
    "nesting": 0,
    "level": 1,
    "children": [
      {
        "type": "text",
        "tag": "",
        "attrs": null,
        "map": null,
        "nesting": 0,
        "level": 0,
        "children": null,
        "content": "test",
        "markup": "",
        "info": "",
        "meta": null,
        "block": false,
        "hidden": false
      }
    ],
    "content": "test",
    "markup": "",
    "info": "",
    "meta": null,
    "block": true,
    "hidden": false
  },
  {
    "type": "heading_close",
    "tag": "h1",
    "attrs": null,
    "map": null,
    "nesting": -1,
    "level": 0,
    "children": null,
    "content": "",
    "markup": "#",
    "info": "",
    "meta": null,
    "block": true,
    "hidden": false
  }
]

```
简化为图来表示：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/21369771/1638083688924-9be39e07-3b43-46c5-be7d-a11f18cad63f.png#clientId=u2e0bf7f5-fe64-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=260&id=u82331756&margin=%5Bobject%20Object%5D&name=image.png&originHeight=520&originWidth=1136&originalType=binary&ratio=1&rotation=0&showTitle=false&size=252932&status=done&style=none&taskId=ufc7d433d-a12a-49a8-adcb-8d22d22ac6c&title=&width=568)
此时我们拿到了一个类似 AST 树的数组，markdown-it 称之为 token 流，它们就被会传递给 [renderer](https://link.zhihu.com/?target=https%3A//links.jianshu.com/go%3Fto%3Dhttps%253A%252F%252Fgithub.com%252Fmarkdown-it%252Fmarkdown-it%252Fblob%252Fmaster%252Flib%252Frenderer.js)。


### 2.3 Renderer 过程
> Renderer 过程就是把 Token 流转变为特定的 HTML 的过程。

​

Renderer 的主逻辑：
```javascript
Renderer.prototype.render = function (tokens, options, env) {
  var i, len, type,
      result = '',
      rules = this.rules;

  for (i = 0, len = tokens.length; i < len; i++) {
    type = tokens[i].type;

    if (type === 'inline') {
      result += this.renderInline(tokens[i].children, options, env);
    } else if (typeof rules[type] !== 'undefined') {
      result += rules[tokens[i].type](tokens, i, options, env, this);
    } else {
      result += this.renderToken(tokens, i, options, env);
    }
  }

  return result;
};
```
可以看到 **render函数** 遍历所有 token，将每个 token 交给 renderInline 方法、renderToken 方法、rules 数组中的方法（rules 含[ 9 个内置方法](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js)）去处理。


回到我们的例子中，  # test 解析后得到 3 个 token ，type 分别为：

- heading_open
- inline
- heading_close



其中 rules 不包含 heading_open 和 heading_close 方法，所以 renderer 在处理这两个 token 时会执行 renderToken 方法。
```javascript
Renderer.prototype.renderToken = function renderToken(tokens, idx, options) {
  var nextToken,
      result = '',
      needLf = false,
      token = tokens[idx];

  if (token.hidden) {
    return '';
  }

  if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) {
    result += '\n';
  }

  // 添加开或闭标签
  result += (token.nesting === -1 ? '</' : '<') + token.tag;
	
  // 添加标签属性
  result += this.renderAttrs(token);
	
  // 自闭合标签处理
  if (token.nesting === 0 && options.xhtmlOut) {
    result += ' /';
  }

  if (token.block) {
    // 判断是否换行
    needLf = true;

    if (token.nesting === 1) {
      if (idx + 1 < tokens.length) {
        nextToken = tokens[idx + 1];

        if (nextToken.type === 'inline' || nextToken.hidden) {
          needLf = false;

        } else if (nextToken.nesting === -1 && nextToken.tag === token.tag) {
          needLf = false;
        }
      }
    }
  }

  result += needLf ? '>\n' : '>';

  return result;
};
```
type 为 heading_open 和 heading_close 的 token 经过 renderToken 方法处理后得到：\<h1>\</h1> 。
​

 inline token 下的 text token 会被内置 9 个规则中的 default_rules.text 去处理，得到文案 test​
```javascript
default_rules.text = function (tokens, idx /*, options, env */) {
  // 特殊字符转义
  return escapeHtml(tokens[idx].content);
};
```
token 流经过渲染规则处理后就变成了最终的HTML代码片段 \<h1>test\</h1>，至此 Markdown-It 工作任务就结束了。
​

### 2.4 小结
由上文我们可了解到，Markdown-It 的整个工作流程和工厂的流水线相似，我们把元件（md代码）放到机器（parse rules）加工，得到的半成品（Tokens）自动沿着流水线进入到下一台机器（render rules）进行加工，最终得到成品（html代码）。
​

在工厂中，如果要调整流水线的工序，一般会在流水线上增加额外功能的机器去处理元件、半成品。
​

思考：🤔 如何修改 markdown-it 的转换结果？


## 3. markdown-it 插件
> markdown-it 插件用于修改转换结果。



markdown-it 各种各类的插件：生成目录、生成锚点链接、代码高亮、识别 emoji 表情等。
​

自动生成锚点链接插件（markdown-it-anchor）的使用例子：
```javascript
const md = require("markdown-it")({});

md.use(require("markdown-it-anchor"), {
  permalink: true,
  permalinkBefore: true,
  permalinkSymbol: "§",
});
```
[效果](http://fe-infra.dianchu.cc/vizier-module/zh-CN)
​

### 3.1 了解插件
MarkdownIt 的 use 的逻辑很简单，就是调用 use 传入的第一个参数，它是一个函数，这函数被调用并且入参是从第二个参数开始的所有参数。
```javascript
MarkdownIt.prototype.use = function (plugin /*, params, ... */) {
  var args = [ this ].concat(Array.prototype.slice.call(arguments, 1));
  plugin.apply(plugin, args);
  return this;
};
```
所以我们可以定义插件就是一个函数的实现，实现的内容就是对 token 的编辑。
​

### 3.2 如何编写插件
​

插件编写方式主要分两种：

- 新增或修改 parsing 规则
- 新增或修改 renderer 规则



**看个为跳转链接添加 target="_blank" 属性的例子**
​

**实现一：** 修改 renderer 规则方式实现：
```javascript
// 如果覆盖，或者是对默认渲染器的代理，则记住老的渲染器。
var defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  // 如果你确认其他的插件不能添加 `target` - 放弃以下检查：
  var aIndex = tokens[idx].attrIndex('target');

  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']); // 添加新属性
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank';    // 替换已经存在的属性值
  }

  // 传递 token 到默认的渲染器。
  return defaultRender(tokens, idx, options, env, self);
};
```
​

**实现二：** 修改 parsing 规则
```javascript
/** 
	markdown-it-for-inline 包（为特定类型的 inline token 添加解析规则）
  type: function
	params:
  	- rule name (should be unique)
  	- token type
  	- function
*/
var iterator = require("markdown-it-for-inline");

md.use(
  iterator,
  "url_new_win",
  "link_open",
  function (tokens, idx) {
    var aIndex = tokens[idx].attrIndex("target");

    if (aIndex < 0) {
      tokens[idx].attrPush(["target", "_blank"]);
    } else {
      tokens[idx].attrs[aIndex][1] = "_blank";
    }
  }
);
```
两种方式分别通过操作 parsing 规则和 renderer 规则，为 link_open 类型的 token 的 attrs 属性中添加一条记录 ['target', '_blank']，改造后的token：
```javascript
[
  ...
  {
    type: 'link_open',
    tag: 'a',
    attrs: [["href", "http://dev.nodeca.com"], ["target", "_blank"]],
    ...
  },
  ...
]
```
解析完后，最终可得到类似的输出：
```javascript
<a href="http://dev.nodeca.com" target="_blank">xxx</a>
```


### 3.3 其他插件
#### 3.3.1 识别 emoji 表情


[markdown-it-emoji（github 仓库）](https://github.com/markdown-it/markdown-it-emoji)
​


- 新加 parsing rule，去匹配 type 为 inline 的 token（表情只会出现在该类型 token 下）；
- 取到 token.content 并用正则匹配所有满足 shortcuts 的短字符，并替换为 defs 中的表情；
- 新加 renderer rule，返回 token.content 
```javascript
// emoji 的映射
defs = {
  "angry": "😦",
  "blush": "😊",
  "broken_heart": "💔",
  ...
};

// 短字符映射
shortcuts = [
  angry:            [ '>:(', '>:-(' ],
  blush:            [ ':")', ':-")' ],
  broken_heart:     [ '</3', '<\\3' ],
  ...
]
```
#### 3.3.2 自动生成标题锚点链接


> 插件 [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor/blob/master/README-zh_CN.md)：对标题进行锚点抽取，以便阅读文档时能快速定位位置。

效果参考： [element ui](https://element.eleme.cn/#/zh-CN)
​

**实现原理**
在 heading_open、heading_close 类型的 token 之间插入 token，因为锚点际上是一个 a 链接，也就是 link_open、inline、link_close 三个 token。
​

创建锚点链接相关 token：
```javascript
export const headerLink = makePermalink((slug, opts, anchorOpts, state, idx) => {
  const linkTokens = [
    Object.assign(new state.Token('link_open', 'a', 1), {
      attrs: [
        ...(opts.class ? [['class', opts.class]] : []),
        ['href', opts.renderHref(slug, state)],
        ...Object.entries(opts.renderAttrs(slug, state))
      ]
    }),
    ...(opts.safariReaderFix ? [new state.Token('span_open', 'span', 1)] : []),
    ...state.tokens[idx + 1].children,
    ...(opts.safariReaderFix ? [new state.Token('span_close', 'span', -1)] : []),
    new state.Token('link_close', 'a', -1)
  ]

  state.tokens[idx + 1] = Object.assign(new state.Token('inline', '', 0), {
    children: linkTokens
  })
})
```
​

#### 3.3.3 其他
​


- 代码如何高亮
- 自动生成目录（[[]]）
- ...



## 9. 总结

本文通过一个简单的例子 `# test 转换 <h1>test</h1>` 并结合 `markdown-it` 的源码来讲解了 markdown 语法是怎么被一步步转换为 html 的标记语言的，并了解了如何通过插件去修改 `markdown-it` 的转换步骤，从而定制化最终得到的 html 标签。

如果对你有帮助，帮忙点个👍🏻喔！

[markdown-it 使用 demo](/docs/程序员储备/开发语言/MarkDown/demo/index.js)

参考：

[markdown-it源码分析](https://juejin.cn/post/6844903921555619847) 系列文章