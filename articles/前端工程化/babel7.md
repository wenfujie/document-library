## babel7

对 `Babel` 的配置项的作用不那么了解，是否会影响日常开发呢？老实说，大多情况下没有特别大的影响（毕竟有搜索引擎）。

不过呢，还是想更进一步了解下，于是最近认真阅读了 `Babel` 的文档，外加不断编译验证，输出了本篇文章，为了更好的阅读体验，修修改改，最终算是以我个人比较喜欢的方式推进了每个知识点（每一个配置的引入都是有原因的），希望能够帮助你对 `Babel` 的各种配置有一个更清晰的认识 (已经很懂的小伙伴，无视本文) 。

> Babel 是一个 JS 编译器

Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

我们先看看 `Babel` 能够做什么：

*   语法转换
*   通过 `Polyfill` 方式在目标环境中添加缺失的特性(`@babel/polyfill模块`)
*   源码转换(codemods)

本篇文章的目的是搞明白 `Babel` 的使用和配置，搞清楚 `@babel/runtime`，`@babel/polyfill`，`@babel/plugin-transform-runtime` 这些作用是什么，插件和预设都是用来干什么的，我们为什么需要配置它们，而不是讲如何进行 `AST` 转换，如果你对 `AST` 转换非常感兴趣，欢迎阅读我们的 [RN转小程序引擎 Alita](https://github.com/areslabs/alita) 的源码，其中应用了大量的 `AST` 转换。


为了更清晰的了解每一步，首先创建一个新项目，例如 `babelTemp`(你爱取啥名取啥名)，使用 `npm init -y` 进行初始化，创建 `src/index.js`，文件内容如下（你也可以随便写点什么）:

    const fn = () => {    console.log('a');};

OK，创建好的项目先放在一边，先了解下理论知识:

### 核心库 @babel/core

Babel 的核心功能包含在 `@babel/core` 模块中。看到 `core` 这个词了吧，意味着**核心**，没有它，在 `babel` 的世界里注定寸步难行。不安装 `@babel/core`，无法使用 `babel` 进行编译。

### CLI命令行工具 @babel/cli

`babel` 提供的命令行工具，主要是提供 `babel` 这个命令，适合安装在项目里。

`@babel/node` 提供了 `babel-node` 命令，但是 `@babel/node` 更适合全局安装，不适合安装在项目里。

    npm install --save-dev @babel/core @babel/cli

现在你就可以在项目中使用 `babel` 进行编译啦（如果不安装 `@babel/core`，会报错噢）

将命令配置在 `package.json` 文件的 `scripts` 字段中:

    //..."scripts": {    "compiler": "babel src --out-dir lib --watch"}

使用 `npm run compiler` 来执行编译，现在我们没有配置任何插件，编译前后的代码是完全一样的。

因为 `Babel` 虽然开箱即用，但是什么动作也不做，如果想要 `Babel` 做一些实际的工作，就需要为其添加插件(`plugin`)。

### 插件

`Babel` 构建在插件之上，使用现有的或者自己编写的插件可以组成一个转换通道，`Babel` 的插件分为两种: 语法插件和转换插件。

> 语法插件

这些插件只允许 `Babel` **解析（parse）** 特定类型的语法（不是转换），可以在 `AST` 转换时使用，以支持解析新语法，例如：
```js
import * as babel from "@babel/core";
const code = babel.transformFromAstSync(ast, {    
  //支持可选链    
  plugins: ["@babel/plugin-proposal-optional-chaining"], 
  babelrc: false
})
  .code;
```
> 转换插件

转换插件会启用相应的语法插件(因此不需要同时指定这两种插件)，这点很容易理解，如果不启用相应的语法插件，意味着无法解析，连解析都不能解析，又何谈转换呢？

#### 插件的使用

如果插件发布在 `npm` 上，可以直接填写插件的名称， `Babel` 会自动检查它是否已经被安装在 `node_modules` 目录下，在项目目录下新建 `.babelrc` 文件 (下文会具体介绍配置文件)，配置如下：
```js
    //.babelrc
    {    
      "plugins": ["@babelplugin-transform-arrow-functions"]
    }
```
也可以指定插件的相对/绝对路径
```js
    {    
      "plugins": ["./node_modules/@babel/plugin-transform-arrow-functions"]
    }
```
执行 `npm run compiler`，可以看到箭头函数已经被编译OK， `lib/index.js` 内容如下:

    const fn = function () {    console.log('a');};

现在，我们仅支持转换箭头函数，如果想将其它的新的JS特性转换成低版本，需要使用其它对应的 `plugin` 。如果我们一个个配置的话，会非常繁琐，因为你可能需要配置几十个插件，这显然非常不便，那么有没有什么办法可以简化这个配置呢？

有！预设！(感谢强大的 `Babel`)

### 预设

通过使用或创建一个 `preset` 即可**轻松**使用一组插件。

> 官方 Preset

*   @babel/preset-env
*   @babel/preset-flow
*   @babel/preset-react
*   @babel/preset-typescript

**注:** 从 Babel v7 开始，所有针对标准提案阶段的功能所编写的预设(stage preset)都已被弃用，官方已经移除了 `@babel/preset-stage-x`。

#### @babel/preset-env

`@babel/preset-env` 主要作用是对我们所使用的并且目标浏览器中缺失的功能进行代码转换和加载 `polyfill`，在不进行任何配置的情况下，`@babel/preset-env` 所包含的插件将支持所有最新的JS特性(ES2015,ES2016等，不包含 stage 阶段)，将其转换成ES5代码。例如，如果你的代码中使用了可选链(目前，仍在 stage 阶段)，那么只配置 `@babel/preset-env`，转换时会抛出错误，需要另外安装相应的插件。

    //.babelrc{    "presets": ["@babel/preset-env"]}

需要说明的是，`@babel/preset-env` 会根据你配置的目标环境，生成插件列表来编译。对于基于浏览器或 `Electron` 的项目，官方推荐使用 `.browserslistrc` 文件来指定目标环境。默认情况下，如果你没有在 `Babel` 配置文件中(如 .babelrc)设置 `targets` 或 `ignoreBrowserslistConfig`，`@babel/preset-env` 会使用 `browserslist` 配置源。

如果你不是要兼容所有的浏览器和环境，推荐你指定目标环境，这样你的编译代码能够保持最小。

例如，仅包括浏览器市场份额超过0.25％的用户所需的 `polyfill` 和代码转换（忽略没有安全更新的浏览器，如 IE10 和 BlackBerry）:

    //.browserslistrc> 0.25%not dead

查看 [`browserslist` 的更多配置](https://github.com/browserslist/browserslist)

例如，你将 `.browserslistrc` 的内容配置为:

    last 2 Chrome versions

然后再执行 `npm run compiler`，你会发现箭头函数不会被编译成ES5，因为 `chrome` 的最新2个版本都能够支持箭头函数。现在，我们将 `.browserslistrc` 仍然换成之前的配置。

就咱们目前的代码来说，当前的配置似乎已经是OK的了。

我们修改下 `src/index.js`。

    const isHas = [1,2,3].includes(2);const p = new Promise((resolve, reject) => {    resolve(100);});

编译出来的结果为:

    "use strict";var isHas = [1, 2, 3].includes(2);var p = new Promise(function (resolve, reject) {  resolve(100);});

这个编译出来的代码在低版本浏览器中使用的话，显然是有问题的，因为低版本浏览器中数组实例上没有 `includes` 方法，也没有 `Promise` 构造函数。

这是为什么呢？因为语法转换只是将高版本的语法转换成低版本的，但是新的内置函数、实例方法无法转换。这时，就需要使用 `polyfill` 上场了，顾名思义，`polyfill`的中文意思是垫片，所谓垫片就是垫平不同浏览器或者不同环境下的差异，让新的内置函数、实例方法等在低版本浏览器中也可以使用。

### Polyfill

`@babel/polyfill` 模块包括 `core-js` 和一个自定义的 `regenerator runtime` 模块，可以模拟完整的 ES2015+ 环境（不包含第4阶段前的提议）。

这意味着可以使用诸如 `Promise` 和 `WeakMap` 之类的新的内置组件、 `Array.from` 或 `Object.assign` 之类的静态方法、`Array.prototype.includes` 之类的实例方法以及生成器函数(前提是使用了 `@babel/plugin-transform-regenerator` 插件)。为了添加这些功能，`polyfill` 将添加到全局范围和类似 `String` 这样的内置原型中(会对全局环境造成污染，后面我们会介绍不污染全局环境的方法)。

补充说明 (2020/01/07)：V7.4.0 版本开始，`@babel/polyfill` 已经被废弃(前端发展日新月异)，需单独安装 `core-js` 和 `regenerator-runtime` 模块。

首先，安装 `@babel/polyfill` 依赖:

    npm install --save @babel/polyfill

注意：不使用 `--save-dev`，因为这是一个需要在源码之前运行的垫片。

我们需要将完整的 `polyfill` 在代码之前加载，修改我们的 `src/index.js`:

    import '@babel/polyfill';const isHas = [1,2,3].includes(2);const p = new Promise((resolve, reject) => {    resolve(100);});

`@babel/polyfill` 需要在其它代码之前引入，我们也可以在 `webpack` 中进行配置。

例如:

    entry: [    require.resolve('./polyfills'),    path.resolve('./index')]

`polyfills.js` 文件内容如下:

    //当然，还可能有一些其它的 polyfill，例如 stage 4之前的一些 polyfillimport '@babel/polyfill';

现在，我们的代码不管在低版本还是高版本浏览器(或node环境)中都能正常运行了。不过，很多时候，我们未必需要完整的 `@babel/polyfill`，这会导致我们最终构建出的包的体积增大，`@babel/polyfill`的包大小为89K (当前 `@babel/polyfill` 版本为 7.7.0)。

我们更期望的是，如果我使用了某个新特性，再引入对应的 `polyfill`，避免引入无用的代码。

值得庆幸的是， `Babel` 已经考虑到了这一点。


`@babel/preset-env` 提供了一个 `useBuiltIns` 参数，设置值为 `usage` 时，就只会包含代码需要的 `polyfill` 。有一点需要注意：配置此参数的值为 `usage` ，必须要同时设置 `corejs` (如果不设置，会给出警告，默认使用的是"corejs": 2) ，注意: 这里仍然需要安装 `@babel/polyfill`(当前 `@babel/polyfill` 版本默认会安装 "corejs": 2):

首先说一下使用 `core-js@3` 的原因，`core-js@2` 分支中已经不会再添加新特性，新特性都会添加到 `core-js@3`。例如你使用了 `Array.prototype.flat()`，如果你使用的是 `core-js@2`，那么其不包含此新特性。为了可以使用更多的新特性，建议大家使用 `core-js@3`。

安装依赖依赖：

    npm install --save core-js@3

> [core-js (点击了解更多)](https://github.com/zloirock/core-js) : JavaScript 的模块化标准库，包含 `Promise`、`Symbol`、`Iterator`和许多其他的特性，它可以让你仅加载必需的功能。

现在，修改 `Babel` 的配置文件如下:

    //.babelrcconst presets = [    [        "@babel/env",        {               "useBuiltIns": "usage",            "corejs": 3        }    ]]

`Babel` 会检查所有代码，以便查找在目标环境中缺失的功能，然后仅仅把需要的 `polyfill` 包含进来。

例如，`src/index.js` 代码不变：

    const isHas = [1,2,3].includes(2);const p = new Promise((resolve, reject) => {    resolve(100);});

我们看看编译出来的文件(`lib/index`):

    "use strict";require("core-js/modules/es.array.includes");require("core-js/modules/es.object.to-string");require("core-js/modules/es.promise");var isHas = [1, 2, 3].includes(2);var p = new Promise(function (resolve, reject) {    resolve(100);});

同样的代码，我们用 `webpack` 构建一下(`production` 模式)，能看到最终的代码大小仅为: 20KB。而如果我们引入整个 `@babel/polyfill` 的话，构建出的包大小为：89KB

前面曾提到，在 `useBuiltIns` 参数值为 `usage` 时，仍然需要安装 `@babel/polyfill`，虽然我们上面的代码转换中看起来并没有使用到，但是，如果我们源码中使用到了 `async/await`，那么编译出来的代码需要 `require("regenerator-runtime/runtime")`，在 `@babel/polyfill` 的依赖中，当然啦，你也可以只安装 `regenerator-runtime/runtime` 取代安装 `@babel/polyfill`。

到了这一步，已经很棒棒了，是不是想跳起来转个圈圈？

下面我要说的内容，也许你已经知道，也许你还不知道，这都不重要，但是此刻起，你要知道了: `Babel` 会使用很小的辅助函数来实现类似 `_createClass` 等公共方法。默认情况下，它将被添加(`inject`)到需要它的每个文件中。

假如，我们的 `src/index.js` 是这样的:

    class Point {    constructor(x, y) {        this.x = x;        this.y = y;    };    getX() {        return this.x;    }}let cp = new ColorPoint(25, 8);

编译出来的 `lib/index.js`，如下所示:

    "use strict";require("core-js/modules/es.object.define-property");function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }var Point =    /*#__PURE__*/    function () {        function Point(x, y) {            _classCallCheck(this, Point);            this.x = x;            this.y = y;        }        _createClass(Point, [{            key: "getX",            value: function getX() {                return this.x;            }        }]);        return Point;    }();var cp = new ColorPoint(25, 8);

看起来，似乎并没有什么问题，但是你想一下，如果你有10个文件中都使用了这个 `class`，是不是意味着 `_classCallCheck`、`_defineProperties`、`_createClass` 这些方法被 `inject` 了10次。这显然会导致包体积增大，最关键的是，我们并不需要它 `inject` 多次。

这个时候，就是 `@babel/plugin-transform-runtime` 插件大显身手的时候了，使用 `@babel/plugin-transform-runtime` 插件，所有帮助程序都将引用模块 `@babel/runtime`，这样就可以避免编译后的代码中出现重复的帮助程序，有效减少包体积。


### @babel/plugin-transform-runtime

`@babel/plugin-transform-runtime` 是一个可以重复使用 `Babel` 注入的帮助程序，以节省代码大小的插件。

> 注意：诸如 `Array.prototype.flat()` 等实例方法将不起作用，因为这需要修改现有的内置函数(可以使用 `@babel/polyfill` 来解决这个问题) ——\> 对此需要说明的是如果你配置的是`corejs3`， **`core-js@3` 现在已经支持原型方法，同时不污染原型**。

另外，`@babel/plugin-transform-runtime` 需要和 `@babel/runtime` 配合使用。

首先安装依赖，`@babel/plugin-transform-runtime` 通常仅在开发时使用，但是运行时最终代码需要依赖 `@babel/runtime`，所以 `@babel/runtime` 必须要作为生产依赖被安装，如下 :

    npm install --save-dev @babel/plugin-transform-runtimenpm install --save @babel/runtime

除了前文所说的，`@babel/plugin-transform-runtime` 可以减少编译后代码的体积外，我们使用它还有一个好处，它可以为代码创建一个沙盒环境，如果使用 `@babel/polyfill` 及其提供的内置程序（例如 `Promise` ，`Set` 和 `Map` ），则它们将污染全局范围。虽然这对于应用程序或命令行工具可能是可以的，但是如果你的代码是要发布供他人使用的库，或者无法完全控制代码运行的环境，则将成为一个问题。

`@babel/plugin-transform-runtime` 会将这些内置别名作为 `core-js` 的别名，因此您可以无缝使用它们，而无需 `polyfill`。

修改 `.babelrc` 的配置，如下:

    //.babelrc{    "presets": [        [            "@babel/preset-env",            {                "useBuiltIns": "usage",                "corejs": 3            }        ]    ],    "plugins": [        [            "@babel/plugin-transform-runtime"        ]    ]}

重新编译 `npm run compiler` , 现在，编译出来的内容为(`lib/index.js`):

    "use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));var Point =    /*#__PURE__*/    function () {        function Point(x, y) {            (0, _classCallCheck2.default)(this, Point);            this.x = x;            this.y = y;        }        (0, _createClass2.default)(Point, [{            key: "getX",            value: function getX() {                return this.x;            }        }]);        return Point;    }();var cp = new ColorPoint(25, 8);

可以看出，帮助函数现在不是直接被 `inject` 到代码中，而是从 `@babel/runtime` 中引入。前文说了使用 `@babel/plugin-transform-runtime` 可以避免全局污染，我们来看看是如何避免污染的。

修改 `src/index.js` 如下：

    let isHas = [1,2,3].includes(2);new Promise((resolve, reject) => {    resolve(100);});

编译出来的代码如下(`lib/index.js`):

    "use strict";require("core-js/modules/es.array.includes");require("core-js/modules/es.object.to-string");require("core-js/modules/es.promise");var isHas = [1, 2, 3].includes(2);new Promise(function (resolve, reject) {    resolve(100);});

`Array.prototype` 上新增了 `includes` 方法，并且新增了全局的 `Promise` 方法，污染了全局环境，这跟不使用 `@babel/plugin-transform-runtime` 没有区别嘛。


如果我们希望 `@babel/plugin-transform-runtime` 不仅仅处理帮助函数，同时也能加载 `polyfill` 的话，我们需要给 `@babel/plugin-transform-runtime` 增加配置信息。

首先新增依赖 `@babel/runtime-corejs3`:

    npm install @babel/runtime-corejs3 --save

修改配置文件如下(移除了 `@babel/preset-env` 的 `useBuiltIns` 的配置，不然不就重复了嘛嘛嘛，不信的话，你用 `async/await` 编译下试试咯):

    {    "presets": [        [            "@babel/preset-env"        ]    ],    "plugins": [        [            "@babel/plugin-transform-runtime",{                "corejs": 3            }        ]    ]}

然后重新编译，看一下，编译出来的结果(`lib/index.js`):

    "use strict";var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));var _context;var isHas = (0, _includes.default)(_context = [1, 2, 3]).call(_context, 2);new _promise.default(function (resolve, reject) {  resolve(100);});

可以看出，没有直接去修改 `Array.prototype`，或者是新增 `Promise` 方法，避免了全局污染。如果上面 `@babel/plugin-transform-runtime` 配置的 `core-js` 是 "2"，其中不包含实例的 `polyfill` 需要单独引入。

> 划重点：如果我们配置的 `corejs` 是 `3` 版本，那么不管是实例方法还是全局方法，都不会再污染全局环境。

看到这里，不知道大家有没有这样一个疑问？给 `@babel/plugin-transform-runtime` 配置 `corejs` 是如此的完美，既可以将帮助函数变成引用的形式，又可以动态引入 `polyfill`，并且不会污染全局环境。何必要给 `@babel/preset-env` 提供 `useBuiltIns` 功能呢，看起来似乎不需要呀。

带着这样的疑问，我新建了几个文件(内容简单且基本一致，使用了些新特性)，然后使用 `webpack` 构建，以下是我对比的数据:

序号

.babelrc 配置

webpack mode production

0

不使用 `@babel/plugin-transform-runtime`

36KB

1

使用`@babel/plugin-transform-runtime`，并配置参数 `corejs`: 3。不会污染全局环境

37KB

2

使用`@babel/plugin-transform-runtime`，不配置 `corejs`

22KB

我猜测是 `@babel/runtime-corejs3/XXX` 的包本身比 `core-js/modules/XXX` 要大一些~


### 插件/预设补充知识

> **插件的排列顺序很重要！！！**

如果两个转换插件都将处理“程序（Program）”的某个代码片段，则将根据转换插件或 `preset` 的排列顺序依次执行。

*   插件在 Presets 前运行。
*   插件顺序从前往后排列。
*   Preset 顺序是颠倒的（从后往前）。

例如:

    {    "plugins": ["@babel/plugin-proposal-class-properties", "@babel/plugin-syntax-dynamic-import"]}

先执行 `@babel/plugin-proposal-class-properties`，后执行 `@babel/plugin-syntax-dynamic-import`

    {  "presets": ["@babel/preset-env", "@babel/preset-react"]}

`preset` 的执行顺序是**颠倒**的，先执行 `@babel/preset-react`， 后执行 `@babel/preset-env`。

#### 插件参数

插件和 `preset` 都可以接受参数，参数由插件名和参数对象组成一个数组。`preset` 设置参数也是这种格式。

如:

    {    "plugins": [        [            "@babel/plugin-proposal-class-properties",             { "loose": true }        ]    ]}

##### 插件的短名称

如果插件名称为 `@babel/plugin-XXX`，可以使用短名称`@babel/XXX` :

    {    "plugins": [        "@babel/transform-arrow-functions" //同 "@babel/plugin-transform-arrow-functions"    ]}

如果插件名称为 `babel-plugin-XXX`，可以使用短名称 `XXX`，该规则同样适用于带有 `scope` 的插件:

    {    "plugins": [        "newPlugin", //同 "babel-plugin-newPlugin"        "@scp/myPlugin" //同 "@scp/babel-plugin-myPlugin"    ]}

#### 创建 Preset

> 可以简单的返回一个插件数组

    module.exports = function() {    return {        plugins: [            "A",            "B",            "C"        ]    }}

> `preset` 中也可以包含其他的 `preset`，以及带有参数的插件。

    module.exports = function() {    return {        presets: [            require("@babel/preset-env")        ],        plugins: [            [require("@babel/plugin-proposal-class-properties"), { loose: true }],            require("@babel/plugin-proposal-object-rest-spread")        ]    }}

### 配置文件

Babel 支持多种格式的配置文件。这部分内容补充了解下即可，谁管你用哪种配置文件，只要你的配置是OK的就可以了(敷衍)~

所有的 `Babel` API 参数都可以被配置，但是如果该参数需要使用的 JS 代码，那么可能需要使用 JS 代码版的配置文件。

> 根据使用场景可以选择不同的配置文件:

如果希望以编程的方式创建配置文件或者希望编译 `node_modules` 目录下的模块：那么 `babel.config.js` 可以满足你的需求。

如果只是需要一个简单的并且中用于单个软件包的配置：那么 `.babelrc` 即可满足你的需求。

#### babel.config.js

在项目根目录下创建一个名为 `babel.config.js` 的文件。

    module.exports = function(api) {    api.cache(true);    const presets = [...];    const plugins = [...];    return {        presets,        plugins    };} 

具体的配置可以查看：[babel.config.js 文档](https://www.babeljs.cn/docs/config-files#project-wide-configuration)

#### .babelrc

在项目根目录下创建一个名为 `.babelrc` 的文件：

    {    "presets": [],    "plugins": []}

具体的配置可以参考 [.babelrc 文档](https://www.babeljs.cn/docs/config-files#file-relative-configuration)

#### package.json

可以将 `.babelrc` 中的配置信息作为 `babel` 键(key) 添加到 `package.json` 文件中:

    {    "name": "my-package",    "babel": {        "presets": [],        "plugins": []    }}

#### .babelrc.js

与 `.babelrc` 配置相同，但是可以使用JS编写。

    //可以在其中调用 Node.js 的APIconst presets = [];const plugins = [];module.exports = { presets, plugins };

## 原文
https://juejin.cn/post/6844904008679686152#heading-0
    
