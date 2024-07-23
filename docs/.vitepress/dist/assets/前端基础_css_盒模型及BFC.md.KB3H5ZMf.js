import{_ as e,c as t,o as a,a2 as n}from"./chunks/framework.Bek_Mmwg.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"前端基础/css/盒模型及BFC.md","filePath":"前端基础/css/盒模型及BFC.md"}'),o={name:"前端基础/css/盒模型及BFC.md"},r=n(`<h2 id="题目-谈一谈你对css盒模型的认识" tabindex="-1">题目：谈一谈你对CSS盒模型的认识 <a class="header-anchor" href="#题目-谈一谈你对css盒模型的认识" aria-label="Permalink to &quot;题目：谈一谈你对CSS盒模型的认识&quot;">​</a></h2><p>专业的面试，一定会问 CSS 盒模型。对于这个题目，我们要回答一下几个方面：</p><p>（1）基本概念：content、padding、margin。</p><p>（2）标准盒模型、IE盒模型的区别。不要漏说了IE盒模型，通过这个问题，可以筛选一部分人。</p><p>（3）CSS如何设置这两种模型（即：如何设置某个盒子为其中一个模型）？如果回答了上面的第二条，还会继续追问这一条。</p><p>（4）JS如何设置、获取盒模型对应的宽和高？这一步，已经有很多人答不上来了。</p><p>（5）实例题：根据盒模型解释 <strong>边距重叠</strong> 。</p><p>前四个方面是逐渐递增，第五个方面，却鲜有人知。</p><p>（6）BFC（边距重叠解决方案）或IFC。</p><p>如果能回答第五条，就会引出第六条。BFC是面试频率较高的。</p><p><strong>总结</strong> ：以上几点，从上到下，知识点逐渐递增，知识面从理论、CSS、JS，又回到CSS理论。</p><p>接下来，我们把上面的六条，依次讲解。</p><h2 id="标准盒模型和ie盒子模型" tabindex="-1">标准盒模型和IE盒子模型 <a class="header-anchor" href="#标准盒模型和ie盒子模型" aria-label="Permalink to &quot;标准盒模型和IE盒子模型&quot;">​</a></h2><p>标准盒子模型：</p><p><a href="https://camo.githubusercontent.com/9354ddb1b4fd57a640f7499c8ab225e112fa85b923bfd2c56e35e69b076e2a45/687474703a2f2f696d672e736d79687661652e636f6d2f323031352d31302d30332d6373732d32372e6a7067" target="_blank" rel="noreferrer"><img src="https://camo.githubusercontent.com/9354ddb1b4fd57a640f7499c8ab225e112fa85b923bfd2c56e35e69b076e2a45/687474703a2f2f696d672e736d79687661652e636f6d2f323031352d31302d30332d6373732d32372e6a7067" alt=""></a></p><p>IE盒子模型：</p><p><a href="https://camo.githubusercontent.com/7e3a407fe0cde86b612cfe989ca0f55a45396020e23f06897b4f6c1d81f5477a/687474703a2f2f696d672e736d79687661652e636f6d2f323031352d31302d30332d6373732d33302e6a7067" target="_blank" rel="noreferrer"><img src="https://camo.githubusercontent.com/7e3a407fe0cde86b612cfe989ca0f55a45396020e23f06897b4f6c1d81f5477a/687474703a2f2f696d672e736d79687661652e636f6d2f323031352d31302d30332d6373732d33302e6a7067" alt=""></a></p><p>上图显示：</p><p>在 CSS 盒子模型 (Box Model) 规定了元素处理元素的几种方式：</p><ul><li>width和height： <strong>内容</strong> 的宽度、高度（不是盒子的宽度、高度）。</li><li>padding：内边距。</li><li>border：边框。</li><li>margin：外边距。</li></ul><p>CSS盒模型和IE盒模型的区别：</p><ul><li><p>在 <strong>标准盒子模型</strong> 中， <strong>width 和 height 指的是内容区域</strong> 的宽度和高度。增加内边距、边框和外边距不会影响内容区域的尺寸，但是会增加元素框的总尺寸。</p></li><li><p><strong>IE盒子模型</strong> 中， <strong>width 和 height 指的是内容区域+border+padding</strong> 的宽度和高度。</p></li></ul><h2 id="css如何设置这两种模型" tabindex="-1">CSS如何设置这两种模型 <a class="header-anchor" href="#css如何设置这两种模型" aria-label="Permalink to &quot;CSS如何设置这两种模型&quot;">​</a></h2><p>代码如下：</p><pre><code>    /* 设置当前盒子为 标准盒模型（默认） */
    box-sizing: content-box;

    /* 设置当前盒子为 IE盒模型 */
    box-sizing: border-box;
</code></pre><p>备注：盒子默认为标准盒模型。</p><h2 id="js如何设置、获取盒模型对应的宽和高" tabindex="-1">JS如何设置、获取盒模型对应的宽和高 <a class="header-anchor" href="#js如何设置、获取盒模型对应的宽和高" aria-label="Permalink to &quot;JS如何设置、获取盒模型对应的宽和高&quot;">​</a></h2><h3 id="方式一-通过dom节点的-style-样式获取" tabindex="-1">方式一：通过DOM节点的 style 样式获取 <a class="header-anchor" href="#方式一-通过dom节点的-style-样式获取" aria-label="Permalink to &quot;方式一：通过DOM节点的 style 样式获取&quot;">​</a></h3><pre><code>	element.style.width/height;
</code></pre><p>缺点：通过这种方式，只能获取 <strong>行内样式</strong> ，不能获取<code>内嵌</code>的样式和<code>外链</code>的样式。</p><p>这种方式有局限性，但应该了解。</p><h3 id="方式二-通用型" tabindex="-1">方式二（通用型） <a class="header-anchor" href="#方式二-通用型" aria-label="Permalink to &quot;方式二（通用型）&quot;">​</a></h3><pre><code>    window.getComputedStyle(element).width/height;
</code></pre><p>方式二能兼容 Chrome、火狐。是通用型方式。</p><h3 id="方式三-ie独有的" tabindex="-1">方式三（IE独有的） <a class="header-anchor" href="#方式三-ie独有的" aria-label="Permalink to &quot;方式三（IE独有的）&quot;">​</a></h3><pre><code>	element.currentStyle.width/height;
</code></pre><p>和方式二相同，但这种方式只有IE独有。获取到的即时运行完之后的宽高（三种css样式都可以获取）。</p><h3 id="方式四" tabindex="-1">方式四 <a class="header-anchor" href="#方式四" aria-label="Permalink to &quot;方式四&quot;">​</a></h3><pre><code>	element.getBoundingClientRect().width/height;
</code></pre><p>此 api 的作用是：获取一个元素的绝对位置。绝对位置是视窗 viewport 左上角的绝对位置。</p><p>此 api 可以拿到四个属性：left、top、width、height。</p><p><strong>总结：</strong></p><p>上面的四种方式，要求能说出来区别，以及哪个的通用型更强。</p><h2 id="margin塌陷-margin重叠" tabindex="-1">margin塌陷/margin重叠 <a class="header-anchor" href="#margin塌陷-margin重叠" aria-label="Permalink to &quot;margin塌陷/margin重叠&quot;">​</a></h2><p><strong>标准文档流中，竖直方向的margin不叠加，只取较大的值作为margin</strong> (水平方向的margin是可以叠加的，即水平方向没有塌陷现象)。</p><p>PS：如果不在标准流，比如盒子都浮动了，那么两个盒子之间是没有margin重叠的现象的。</p><p>我们来看几个例子。</p><h3 id="兄弟元素之间" tabindex="-1">兄弟元素之间 <a class="header-anchor" href="#兄弟元素之间" aria-label="Permalink to &quot;兄弟元素之间&quot;">​</a></h3><p>如下图所示：</p><p><a href="https://camo.githubusercontent.com/da4fbd4cfe8786f6ee92710945adc5c3cc722c849711d3e5badb47483dd7f02a/687474703a2f2f696d672e736d79687661652e636f6d2f32303137303830355f303930345f322e706e67" target="_blank" rel="noreferrer"><img src="https://camo.githubusercontent.com/da4fbd4cfe8786f6ee92710945adc5c3cc722c849711d3e5badb47483dd7f02a/687474703a2f2f696d672e736d79687661652e636f6d2f32303137303830355f303930345f322e706e67" alt=""></a></p><h3 id="子元素和父元素之间" tabindex="-1">子元素和父元素之间 <a class="header-anchor" href="#子元素和父元素之间" aria-label="Permalink to &quot;子元素和父元素之间&quot;">​</a></h3><pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;Document&lt;/title&gt;
    &lt;style&gt;

        * {
            margin: 0;
            padding: 0;
        }

        .father {
            background: green;

        }

        /* 给儿子设置margin-top为10像素 */
        .son {
            height: 100px;
            margin-top: 10px;
            background: red;
        }

    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class=&quot;father&quot;&gt;
    &lt;div class=&quot;son&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><p>上面的代码中，儿子的height是 100px，magin-top 是10px。注意，此时父亲的 height 是100，而不是110。因为儿子和父亲在竖直方向上，共一个margin。</p><p>儿子这个盒子：</p><p><a href="https://camo.githubusercontent.com/d56701f034920b9601a97c99c132cb2db1ec49b8262e8665e7802a805c16390e/687474703a2f2f696d672e736d79687661652e636f6d2f32303138303330355f323231362e706e67" target="_blank" rel="noreferrer"><img src="https://camo.githubusercontent.com/d56701f034920b9601a97c99c132cb2db1ec49b8262e8665e7802a805c16390e/687474703a2f2f696d672e736d79687661652e636f6d2f32303138303330355f323231362e706e67" alt=""></a></p><p>父亲这个盒子：</p><p><a href="https://camo.githubusercontent.com/778f1bfd7f334caa6a5a373ee9da2ada4546d00434aa97be61348bd8ccc62465/687474703a2f2f696d672e736d79687661652e636f6d2f32303138303330355f323231372e706e67" target="_blank" rel="noreferrer"><img src="https://camo.githubusercontent.com/778f1bfd7f334caa6a5a373ee9da2ada4546d00434aa97be61348bd8ccc62465/687474703a2f2f696d672e736d79687661652e636f6d2f32303138303330355f323231372e706e67" alt=""></a></p><p>上方代码中，如果我们给父亲设置一个属性：<code>overflow: hidden</code>，就可以避免这个问题，此时父亲的高度是110px，这个用到的就是BFC（下一段讲解）。</p><h3 id="善于使用父亲的padding-而不是儿子的margin" tabindex="-1">善于使用父亲的padding，而不是儿子的margin <a class="header-anchor" href="#善于使用父亲的padding-而不是儿子的margin" aria-label="Permalink to &quot;善于使用父亲的padding，而不是儿子的margin&quot;">​</a></h3><blockquote><p>其实，这一小段讲的内容与上一小段相同，都是讲父子之间的margin重叠。</p></blockquote><p>我们来看一个奇怪的现象。现在有下面这样一个结构：（div中放一个p）</p><pre><code>	&lt;div&gt;
		&lt;p&gt;&lt;/p&gt;
	&lt;/div&gt;
</code></pre><p>上面的结构中，我们尝试通过给儿子<code>p</code>一个<code>margin-top:50px;</code>的属性，让其与父亲保持50px的上边距。结果却看到了下面的奇怪的现象：</p><p><a href="https://camo.githubusercontent.com/3d60e1843d805adfc9d910134789355b7363f928a6a68d8c8826bb1e08746479/687474703a2f2f696d672e736d79687661652e636f6d2f32303137303830365f313533372e706e67" target="_blank" rel="noreferrer"><img src="https://camo.githubusercontent.com/3d60e1843d805adfc9d910134789355b7363f928a6a68d8c8826bb1e08746479/687474703a2f2f696d672e736d79687661652e636f6d2f32303137303830365f313533372e706e67" alt=""></a></p><p>此时我们给父亲div加一个border属性，就正常了：</p><p><a href="https://camo.githubusercontent.com/bf5d8a61b1f014549702a760b46549bc8db235306e0fddc6d32e21bfe0541283/687474703a2f2f696d672e736d79687661652e636f6d2f32303137303830365f313534342e706e67" target="_blank" rel="noreferrer"><img src="https://camo.githubusercontent.com/bf5d8a61b1f014549702a760b46549bc8db235306e0fddc6d32e21bfe0541283/687474703a2f2f696d672e736d79687661652e636f6d2f32303137303830365f313534342e706e67" alt=""></a></p><p>如果父亲没有border，那么儿子的margin实际上踹的是“流”，踹的是这“行”。所以，父亲整体也掉下来了。</p><p><strong>margin这个属性，本质上描述的是兄弟和兄弟之间的距离； 最好不要用这个marign表达父子之间的距离。</strong></p><p>所以，如果要表达父子之间的距离，我们一定要善于使用父亲的padding，而不是儿子的margin。</p><h2 id="bfc-边距重叠解决方案" tabindex="-1">BFC（边距重叠解决方案） <a class="header-anchor" href="#bfc-边距重叠解决方案" aria-label="Permalink to &quot;BFC（边距重叠解决方案）&quot;">​</a></h2><h3 id="bfc的概念" tabindex="-1">BFC的概念 <a class="header-anchor" href="#bfc的概念" aria-label="Permalink to &quot;BFC的概念&quot;">​</a></h3><p>BFC（Block Formatting Context）：块级格式化上下文。你可以把它理解成一个独立的区域。</p><p>另外还有个概念叫IFC。不过，BFC问得更多。</p><h3 id="bfc-的原理-bfc的布局规则【非常重要】" tabindex="-1">BFC 的原理/BFC的布局规则【非常重要】 <a class="header-anchor" href="#bfc-的原理-bfc的布局规则【非常重要】" aria-label="Permalink to &quot;BFC 的原理/BFC的布局规则【非常重要】&quot;">​</a></h3><p>BFC 的原理，其实也就是 BFC 的渲染规则（能说出以下四点就够了）。包括：</p><ul><li><p>（1）BFC <strong>内部的</strong> 子元素，在垂直方向， <strong>边距会发生重叠</strong> 。</p></li><li><p>（2）BFC在页面中是独立的容器，外面的元素不会影响里面的元素，反之亦然。（稍后看<code>举例1</code>）</p></li><li><p>（3） <strong>BFC区域不与旁边的<code>float box</code>区域重叠</strong>。（可以用来清除浮动带来的影响）。（稍后看<code>举例2</code>）</p></li><li><p>（4）计算BFC的高度时，浮动的子元素也参与计算。（稍后看<code>举例3</code>）</p></li></ul><h3 id="如何生成bfc" tabindex="-1">如何生成BFC <a class="header-anchor" href="#如何生成bfc" aria-label="Permalink to &quot;如何生成BFC&quot;">​</a></h3><p>有以下几种方法：</p><ul><li><p>方法1：overflow: 不为visible，可以让属性是 hidden、auto。【最常用】</p></li><li><p>方法2：浮动中：float的属性值不为none。意思是，只要设置了浮动，当前元素就创建了BFC。</p></li><li><p>方法3：定位中：只要posiiton的值不是 static或者是relative即可，可以是<code>absolute</code>或<code>fixed</code>，也就生成了一个BFC。</p></li><li><p>方法4：display为inline-block, table-cell, table-caption, flex, inline-flex</p></li></ul><p>参考链接：</p><ul><li><p><a href="https://segmentfault.com/a/1190000006740129" target="_blank" rel="noreferrer">BFC原理详解</a></p></li><li><p><a href="https://www.jianshu.com/p/bf927bc1bed4" target="_blank" rel="noreferrer">BFC详解</a></p></li><li><p><a href="https://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html" target="_blank" rel="noreferrer">前端精选文摘：BFC 神奇背后的原理</a></p></li></ul><p>下面来看几个例子，看看如何生成BFC。</p><h3 id="bfc-的应用" tabindex="-1">BFC 的应用 <a class="header-anchor" href="#bfc-的应用" aria-label="Permalink to &quot;BFC 的应用&quot;">​</a></h3><p>**举例1：**解决 margin 重叠</p><p>当父元素和子元素发生 margin 重叠时，解决办法： <strong>给子元素或父元素创建BFC</strong> 。</p><p>比如说，针对下面这样一个 div 结构：</p><pre><code>&lt;div class=&quot;father&quot;&gt;
    &lt;p class=&quot;son&quot;&gt;
    &lt;/p&gt;
&lt;/div&gt;
</code></pre><p>上面的div结构中，如果父元素和子元素发生margin重叠，我们可以给子元素创建一个 BFC，就解决了：</p><pre><code>&lt;div class=&quot;father&quot;&gt;
    &lt;p class=&quot;son&quot; style=&quot;overflow: hidden&quot;&gt;
    &lt;/p&gt;
&lt;/div&gt;
</code></pre><p>因为 <strong>第二条：BFC区域是一个独立的区域，不会影响外面的元素</strong> 。</p><p><strong>举例2</strong> ：BFC区域不与float区域重叠：</p><p>针对下面这样一个div结构；</p><pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;Document&lt;/title&gt;
    &lt;style&gt;

        .father-layout {
            background: pink;
        }

        .father-layout .left {
            float: left;
            width: 100px;
            height: 100px;
            background: green;
        }

        .father-layout .right {
            height: 150px;  /*右侧标准流里的元素，比左侧浮动的元素要高*/
            background: red;
        }

    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;section class=&quot;father-layout&quot;&gt;
    &lt;div class=&quot;left&quot;&gt;
        左侧，生命壹号
    &lt;/div&gt;
    &lt;div class=&quot;right&quot;&gt;
        右侧，smyhvae，smyhvae，smyhvae，smyhvae，smyhvae，smyhvae，smyhvae，smyhvae，smyhvae，smyhvae，smyhvae，smyhvae，
    &lt;/div&gt;
&lt;/section&gt;

&lt;/body&gt;
&lt;/html&gt;
</code></pre><p>效果如下：</p><p><a href="https://camo.githubusercontent.com/ea8d8ed82d3c51c01918880aa24a0b28a22b25c0a1676348780547239d6f5fb4/687474703a2f2f696d672e736d79687661652e636f6d2f32303138303330365f303832352e706e67" target="_blank" rel="noreferrer"><img src="https://camo.githubusercontent.com/ea8d8ed82d3c51c01918880aa24a0b28a22b25c0a1676348780547239d6f5fb4/687474703a2f2f696d672e736d79687661652e636f6d2f32303138303330365f303832352e706e67" alt=""></a></p><p>上图中，由于右侧标准流里的元素，比左侧浮动的元素要高，导致右侧有一部分会跑到左边的下面去。</p><p><strong>如果要解决这个问题，可以将右侧的元素创建BFC</strong> ，因为 <strong>第三条：BFC区域不与<code>float box</code>区域重叠</strong>。解决办法如下：（将right区域添加overflow属性）</p><pre><code>    &lt;div class=&quot;right&quot; style=&quot;overflow: hidden&quot;&gt;
        右侧，smyhvae，smyhvae，smyhvae，smyhvae，smyhvae，smyhvae，smyhvae，smyhvae，smyhvae，smyhvae，smyhvae，smyhvae，
    &lt;/div&gt;
</code></pre><p><a href="https://camo.githubusercontent.com/1906dc0f1c1d8fed77868739a3346118d5e292382302f8a2aa45e97a369631eb/687474703a2f2f696d672e736d79687661652e636f6d2f32303138303330365f303832372e706e67" target="_blank" rel="noreferrer"><img src="https://camo.githubusercontent.com/1906dc0f1c1d8fed77868739a3346118d5e292382302f8a2aa45e97a369631eb/687474703a2f2f696d672e736d79687661652e636f6d2f32303138303330365f303832372e706e67" alt=""></a></p><p>上图表明，解决之后，<code>father-layout</code>的背景色显现出来了，说明问题解决了。</p><p>**举例3：**清除浮动</p><p>现在有下面这样的结构：</p><pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;Document&lt;/title&gt;
    &lt;style&gt;

        .father {
            background: pink;
        }

        .son {
            float: left;
            background: green;
        }

    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;section class=&quot;father&quot;&gt;
    &lt;div class=&quot;son&quot;&gt;
        生命壹号
    &lt;/div&gt;

&lt;/section&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><p>效果如下：</p><p><a href="https://camo.githubusercontent.com/fdfb9e52e558164c6d2547ac185270e70fafeeeec5c27ac8f55a6a8699baac26/687474703a2f2f696d672e736d79687661652e636f6d2f32303138303330365f303834302e706e67" target="_blank" rel="noreferrer"><img src="https://camo.githubusercontent.com/fdfb9e52e558164c6d2547ac185270e70fafeeeec5c27ac8f55a6a8699baac26/687474703a2f2f696d672e736d79687661652e636f6d2f32303138303330365f303834302e706e67" alt=""></a></p><p>上面的代码中，儿子浮动了，但由于父亲没有设置高度，导致看不到父亲的背景色（此时父亲的高度为0）。正所谓 <strong>有高度的盒子，才能关住浮动</strong> 。</p><p>如果想要清除浮动带来的影响，方法一是给父亲设置高度，然后采用隔墙法。方法二是 BFC：给父亲增加 <code>overflow=hidden</code>属性即可， 增加之后，效果如下：</p><p><a href="https://camo.githubusercontent.com/2359c4931c343d97cc71b126775bb9d9aef1297495af9aa65f5c176c1491684c/687474703a2f2f696d672e736d79687661652e636f6d2f32303138303330365f303834352e706e67" target="_blank" rel="noreferrer"><img src="https://camo.githubusercontent.com/2359c4931c343d97cc71b126775bb9d9aef1297495af9aa65f5c176c1491684c/687474703a2f2f696d672e736d79687661652e636f6d2f32303138303330365f303834352e706e67" alt=""></a></p><p>为什么父元素成为BFC之后，就有了高度呢？这就回到了 <strong>第四条：计算BFC的高度时，浮动元素也参与计算</strong> 。意思是， <strong>在计算BFC的高度时，子元素的float box也会参与计算</strong> 。</p><p><strong>原文：</strong><a href="https://github.com/qianguyihao/Web/blob/master/13-%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95/01-%E9%9D%A2%E8%AF%95%E5%BF%85%E7%9C%8B/02-CSS%E7%9B%92%E6%A8%A1%E5%9E%8B%E5%8F%8ABFC.md" target="_blank" rel="noreferrer">https://github.com/qianguyihao/Web/blob/master/13-前端面试/01-面试必看/02-CSS盒模型及BFC.md</a></p>`,110),d=[r];function c(l,i,f,p,s,h){return a(),t("div",null,d)}const m=e(o,[["render",c]]);export{b as __pageData,m as default};
