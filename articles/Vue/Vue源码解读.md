- [vue内部机制流程图](#vue内部机制流程图)
- [双向绑定实现](#双向绑定实现)
- [依赖收集](#依赖收集)
  - [为什么要依赖收集？](#为什么要依赖收集)
  - [Dep类](#dep类)
  - [Watcher](#watcher)
  - [开始依赖收集](#开始依赖收集)
- [虚拟节点VNode](#虚拟节点vnode)

### vue内部机制流程图

![image](https://s1.ax1x.com/2020/08/05/asdyWR.png)

### 双向绑定实现

首先通过一次渲染操作触发Data的getter（这里保证只有视图中需要被用到的data才会触发getter）进行依赖收集，这时候其实Watcher与data可以看成一种被绑定的状态（实际上是data的闭包中有一个 `Deps` 订阅者，在修改的时候会通知所有的Watcher观察者），在data发生变化的时候会触发它的setter，setter通知 `Watcher` ，Watcher进行回调通知组件重新渲染的函数，之后根据 `diff算法` 来决定是否发生视图的更新。

```javascript
  <script>
      // 给对象每个key都增加数据劫持
      function observe(obj, cb) {
          for (key in obj) {
              reactive(obj, key, cb)
          }
      }

      // 给对象的单个key增加数据劫持
      function reactive(obj, key, cb) {
          Object.defineProperty(obj, key, {
              enumerable: true, // 可枚举
              configurable: true, // 可配置
              get: () => {
                  /*....依赖收集等逻辑....*/
                  return obj[key];
              },
              set: (newVal) => {
                  obj[key] = newVal;
                  cb(); // 执行订阅者收到消息的回调 更新节点
              }
          })
      }

      class Vue {
          constructor(option) {
              this._data = option.data;
              observe(this._data, option.render);
          }
      }
      
      new Vue({
          el: '#app',
          data: {
              name: 'wfj',
              gender: 'boy'
          },
          render() {
              console.log('执行渲染逻辑');
          }
      });
  </script>
```

### 依赖收集
#### 为什么要依赖收集？

如下代码，test2属性并无关联视图，但从上文“双向绑定”原理可知：当修改值this.test2 = 'hello'时会触发setter从而更新视图

```javascript
  // html
  <div>
      <span>{{test1}}</span>
  </div>

  // js
  data(){
      return {
          test1: '',
          test2: ''
      };
  }
```

#### Dep类
在最开始初始化vue的render函数时，将此时触发getter的对应Watcher收集到Dep的subs中去。在对data中的数据进行修改的时候setter只要触发Dep的subs的函数即可。


```javascript
class Dep {
    constructor () {
        this.subs = [];
    }

    addSub (sub: Watcher) {
        this.subs.push(sub)
    }

    removeSub (sub: Watcher) {
        remove(this.subs, sub)
    }
    /*Github:https://github.com/answershuto*/
    notify () {
        // stabilize the subscriber list first
        const subs = this.subs.slice()
        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update()
        }
    }
}
function remove (arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}
```

#### Watcher
订阅者，当依赖收集的时候会addSub到sub中，在修改data中数据的时候会触发dep对象的notify，通知所有Watcher对象去修改对应视图。

```javascript
class Watcher {
    constructor (vm, expOrFn, cb, options) {
        this.cb = cb;
        this.vm = vm;

        /*在这里将观察者本身赋值给全局的target，只有被target标记过的才会进行依赖收集*/
        Dep.target = this;
        /*Github:https://github.com/answershuto*/
        /*触发渲染操作进行依赖收集*/
        this.cb.call(this.vm);
    }

    update () {
        this.cb.call(this.vm);
    }
}
```

#### 开始依赖收集

```javascript
class Vue {
    constructor(options) {
        this._data = options.data;
        observer(this._data, options.render);
        let watcher = new Watcher(this, );
    }
}

function defineReactive (obj, key, val, cb) {
    /*在闭包内存储一个Dep对象*/
    const dep = new Dep();

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: ()=>{
            if (Dep.target) {
                /*Watcher对象存在全局的Dep.target中*/
                dep.addSub(Dep.target);
            }
        },
        set:newVal=> {
            /*只有之前addSub中的函数才会触发*/
            dep.notify();
        }
    })
}

Dep.target = null;
```
将观察者Watcher实例赋值给全局的Dep.target，然后触发render操作只有被Dep.target标记过的才会进行依赖收集。有Dep.target的对象会将Watcher的实例push到subs中，在对象被修改触发setter操作的时候dep会调用subs中的Watcher实例的update方法进行渲染。


### 虚拟节点VNode


```javascript

// Vue.js源码中对VNode类的定义

export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  functionalContext: Component | void; // only for functional component root nodes
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?

  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions
  ) {
    /*当前节点的标签名*/
    this.tag = tag
    /*当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息*/
    this.data = data
    /*当前节点的子节点，是一个数组*/
    this.children = children
    /*当前节点的文本*/
    this.text = text
    /*当前虚拟节点对应的真实dom节点*/
    this.elm = elm
    /*当前节点的名字空间*/
    this.ns = undefined
    /*编译作用域*/
    this.context = context
    /*函数化组件作用域*/
    this.functionalContext = undefined
    /*节点的key属性，被当作节点的标志，用以优化*/
    this.key = data && data.key
    /*组件的option选项*/
    this.componentOptions = componentOptions
    /*当前节点对应的组件的实例*/
    this.componentInstance = undefined
    /*当前节点的父节点*/
    this.parent = undefined
    /*简而言之就是是否为原生HTML或只是普通文本，innerHTML的时候为true，textContent的时候为false*/
    this.raw = false
    /*静态节点标志*/
    this.isStatic = false
    /*是否作为根节点插入*/
    this.isRootInsert = true
    /*是否为注释节点*/
    this.isComment = false
    /*是否为克隆节点*/
    this.isCloned = false
    /*是否有v-once指令*/
    this.isOnce = false
  }

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  get child (): Component | void {
    return this.componentInstance
  }
}
```

举例说明，以下VNode


```javascript

{
    tag: 'div'
    data: {
        class: 'test'
    },
    children: [
        {
            tag: 'span',
            data: {
                class: 'demo'
            }
            text: 'hello,VNode'
        }
    ]
}
```
渲染结果

```html
<div class="test">
    <span class="demo">hello,VNode</span>
</div>
```

