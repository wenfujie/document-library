# H5 拖放 #

----------

> Create by wenf on 2019-04-14 13:55:00


##### 1.浏览器支持：
IE 9以上、Firefox、Opera、Chrome以及Safari 12支持拖放

##### 2.拖放组成部分：
分为两部分： 拖拽drag 和 释放 drop

可以理解为：

源对象=>拖动的元素；

目标对象=>接收被拖动目标的元素

![](https://img-blog.csdn.net/20180610141232779)

##### 3.API
- 设置元素为可拖放

	`<img draggable="true"/>`

- 被拖动的源对象可以触发的事件

	1. ondragstart：源对象开始被拖动

	2. ondrag：源对象被拖动过程中(鼠标可能在移动也可能未移动)

	3. ondragend：源对象被拖动结束

- 目标对象可以触发的事件

	1. 	ondragenter：目标对象被源对象拖动着进入
	
	1. 	ondragover：目标对象被源对象拖动着悬停在上方
	
	1. 	ondragleave：源对象拖动着离开了目标对象
	
	1. 	ondrop：源对象拖动着在目标对象上方释放/松手

- 源对象事件和目标对象事件间传递数据

	HTML5为所有的拖动相关事件提供了一个新的属性dataTransfer用于数据传递。

	使用：

		源对象设置值：

        // key为设置值的名称，value为具体值（两个参数必须为string类型）
        e.dataTransfer.setData( key, value);

		目标对象获取值：

        // key为设置值的名称
        e.dataTransfer.getData( key);

##### 4.demo
开始动手前，把系统的默认事件阻止，否则部分API的事件无法触发。

        window.onload = function () {
	        //监听document的drop事件——取消其默认行为：在新窗口中打开图片
	        document.ondragover = function(e){
	            e.preventDefault(); //使得drop事件可以触发
	        }
	        document.ondrop = function(e) {
	            e.preventDefault(); //阻止在新窗口中打开图片，否则仍然会执行下载操作！！！
	        }
	    }

上个简单的例子


		html：

            <div id="drag"
	             class="drag"
	             onselectstart="return false"
	             ondragstart="drag(event)"
	             draggable="true">被拖拽元素</div>
	        <div id="drop"
	             ondrop="drop(event)"
	             class="drop">接收拖拽元素</div>

		js:

		    function drag(e) {
		        let self = e.target;
		        // 传递当前拖拽id
		        e.dataTransfer.setData('dragId',self.id);
		    }
		    function drop(e) {
		        let self = e.target,
		            dragId = e.dataTransfer.getData('dragId');// 接收id
		        self.appendChild(document.getElementById(dragId));// 插入节点
		    }