import{_ as e,c as t,o as n,a2 as a}from"./chunks/framework.Bek_Mmwg.js";const f=JSON.parse('{"title":"H5 拖放","description":"","frontmatter":{},"headers":[],"relativePath":"前端业务/H5拖拽/拖拽.md","filePath":"前端业务/H5拖拽/拖拽.md"}'),r={name:"前端业务/H5拖拽/拖拽.md"},o=a(`<h1 id="h5-拖放" tabindex="-1">H5 拖放 <a class="header-anchor" href="#h5-拖放" aria-label="Permalink to &quot;H5 拖放&quot;">​</a></h1><blockquote><p>Create by wenf on 2019-04-14 13:55:00</p></blockquote><h3 id="_1-浏览器支持" tabindex="-1">1.浏览器支持： <a class="header-anchor" href="#_1-浏览器支持" aria-label="Permalink to &quot;1.浏览器支持：&quot;">​</a></h3><p>IE 9以上、Firefox、Opera、Chrome以及Safari 12支持拖放</p><h3 id="_2-拖放组成部分" tabindex="-1">2.拖放组成部分： <a class="header-anchor" href="#_2-拖放组成部分" aria-label="Permalink to &quot;2.拖放组成部分：&quot;">​</a></h3><p>分为两部分： 拖拽<strong>drag</strong> 和 释放 <strong>drop</strong></p><p>可以理解为：</p><p>源对象=&gt;拖动的元素；</p><p>目标对象=&gt;接收被拖动目标的元素</p><p><img src="https://img-blog.csdn.net/20180610141232779" alt=""></p><h3 id="_3-api" tabindex="-1">3.API <a class="header-anchor" href="#_3-api" aria-label="Permalink to &quot;3.API&quot;">​</a></h3><ul><li><p>设置元素为可拖放</p><p><code>&lt;img draggable=&quot;true&quot;/&gt;</code></p></li><li><p>被拖动的源对象可以触发的事件</p><ol><li><p>ondragstart：源对象开始被拖动</p></li><li><p>ondrag：源对象被拖动过程中(鼠标可能在移动也可能未移动)</p></li><li><p>ondragend：源对象被拖动结束</p></li></ol></li><li><p>目标对象可以触发的事件</p><ol><li><p>ondragenter：目标对象被源对象拖动着进入</p></li><li><p>ondragover：目标对象被源对象拖动着悬停在上方</p></li><li><p>ondragleave：源对象拖动着离开了目标对象</p></li><li><p>ondrop：源对象拖动着在目标对象上方释放/松手</p></li></ol></li><li><p>源对象事件和目标对象事件间传递数据</p><p>HTML5为所有的拖动相关事件提供了一个新的属性dataTransfer用于数据传递。</p><p>使用：</p><pre><code>  源对象设置值：

  // key为设置值的名称，value为具体值（两个参数必须为string类型）
  e.dataTransfer.setData( key, value);

  目标对象获取值：

  // key为设置值的名称
  e.dataTransfer.getData( key);
</code></pre></li></ul><h3 id="_4-demo" tabindex="-1">4.demo <a class="header-anchor" href="#_4-demo" aria-label="Permalink to &quot;4.demo&quot;">​</a></h3><p>开始动手前，把系统的默认事件阻止，否则部分API的事件无法触发。</p><pre><code>    window.onload = function () {
        //监听document的drop事件——取消其默认行为：在新窗口中打开图片
        document.ondragover = function(e){
            e.preventDefault(); //使得drop事件可以触发
        }
        document.ondrop = function(e) {
            e.preventDefault(); //阻止在新窗口中打开图片，否则仍然会执行下载操作！！！
        }
    }
</code></pre><p>上个简单的例子：<strong>基础拖拽</strong></p><pre><code>html：

       &lt;div id=&quot;drag&quot;
             class=&quot;drag&quot;
             onselectstart=&quot;return false&quot;
             ondragstart=&quot;drag(event)&quot;
             draggable=&quot;true&quot;&gt;被拖拽元素&lt;/div&gt;
        &lt;div id=&quot;drop&quot;
             ondrop=&quot;drop(event)&quot;
             class=&quot;drop&quot;&gt;接收拖拽元素&lt;/div&gt;

js:

	    function drag(e) {
	        let self = e.target;
	        // 传递当前拖拽id
	        e.dataTransfer.setData(&#39;dragId&#39;,self.id);
	    }
	    function drop(e) {
	        let self = e.target,
	            dragId = e.dataTransfer.getData(&#39;dragId&#39;);// 接收id
	        self.appendChild(document.getElementById(dragId));// 插入节点
	    }
</code></pre><p>效果：<a href="https://wenfujie.github.io/document-library/js-library/H5-drag-drop/%E6%8B%96%E6%8B%BDdemo-%E5%9F%BA%E7%A1%80%E7%89%88.html" target="_blank" rel="noreferrer"><strong>Demo</strong></a></p><p>再来一个：<strong>拖拽批量上传图片</strong></p><p><strong>备注</strong>：仅需ondrop事件，以下用到ondragenter和ondragleave是用于修改样式， 还需用到H5文件处理API。</p><pre><code>html：
	
	&lt;p&gt;将电脑图片拖到下方即可上传&lt;/p&gt;
    &lt;div class=&quot;up-area&quot;
         ondragenter=&quot;dragEnter(event)&quot;
         ondragleave=&quot;dragLeave(event)&quot;
         ondrop=&quot;getImg(event)&quot;&gt;&lt;/div&gt;

js：

	function getImg(e) {
        setDragingStyle(e,{borderColor: &#39;#dcdcdc&#39;});// 取消拖放中样式

        var imgArea = document.getElementsByClassName(&#39;up-area&#39;);
        // 限制上传数量
        if(imgArea[0].childNodes.length &gt;= 9){
            alert(&#39;一次最多上传9张图片..&#39;)
            return;
        }

        var f = e.dataTransfer.files[0];      //找到拖放的文件
        var fr = new FileReader();        //创建文件读取器
        fr.readAsDataURL(f);         //读取文件内容

        fr.onload = function () {       //读取完成
            var img = new Image();
            img.src = fr.result;        //使用读取到的数据
            img.style.width = &#39;100px&#39;;
            img.style.height = &#39;100px&#39;;
            e.target.appendChild(img);
        }
    }
</code></pre><p>效果：<a href="https://wenfujie.github.io/document-library/js-library/H5-drag-drop/%E6%8B%96%E6%8B%BDdemo-%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87%E7%89%88.html" target="_blank" rel="noreferrer"><strong>Demo</strong></a></p>`,22),d=[o];function l(i,p,s,g,u,c){return n(),t("div",null,d)}const m=e(r,[["render",l]]);export{f as __pageData,m as default};
