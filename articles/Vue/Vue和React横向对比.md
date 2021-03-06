
## Vue和React相同和差异
**相同**
- 都使用虚拟节点
- 都提供响应式、组件化的视图组件
- 核心库，路由和全局状态的管理都是脱离开来

**区别**
- react采用html in js，使用jsx渲染，vue使用template模板
- vue脚手架vue-cli，react则是用create-react-app
- 数据和视图中，vue是双向绑定，react则是单向数据流
- 路由和状态管理库，vue使用vue-router和vuex，react则是用react-router和redux
- 开发模式，vue是mvvm，react是mvc
- 使用场景，vue
- 服务端渲染，vue有nuxt.js，react有next.js
- vue文档阅读性比react好，react生态比vue庞大，react后台是facebook，vue则是自由开发者尤雨溪。
- 件状态改变时，react会触发整个子组件数重新渲染，使用PureComponent可以避免，vue中则会自动根据属性依赖关系针对子组件前后差异进行渲染。

**使用场景**

vue适合中小型应用，react适合大型应用。

vue基于模板更直观容易理解，并且vue能更快跑起来，但模板易出现运行时错误，同时较难去测试、重构和分解。

react的js模板可以组成拥有很好的分解性的干代码，干代码的复用性和测试性更好。它的immutable应用状态透明度和测试性更高。

## 总结
Vue的优势包括：
- 模板和渲染函数的弹性选择
- 简单的语法及项目创建
- 更快的渲染速度和更小的体积

React的优势包括：
- 更适用于大型应用和更好的可测试性
- 同时适用于Web端和原生App
- 更大的生态圈带来的更多支持和工具

它们大部分最棒的功能是相通的：
- 利用虚拟DOM实现快速渲染
- 轻量级
- 响应式和组件化
- 服务器端渲染
- 易于集成路由工具，打包工具以及状态管理工具
- 优秀的支持和社区

**面试时陈述**

相同

协助记忆关键词：`组件、虚拟节点、设计模式、脚手架、服务端渲染、社区`

都支持响应式的可视化组件，使用虚拟节点渲染，设计模式上都将核心库与状态管理库、路由库等剥离，有各自的初始化项目脚手架、服务端渲染框架，有优秀的社区支持

区别

协助记忆关键词：`模板、开发模式、渲染机制、维护、文档`

vue使用template渲染模板，react使用jsx形式渲染；
vue使用mvvm开发模式数据支持双向绑定，react使用mvc模式数据是单向流；
dom变更时，vue根据数据劫持配合发布者订阅者实现差异视图的自动渲染，react默认重新渲染整个组件，需设置pureComponent调整渲染规则；vue之前是由个人开发者尤雨溪维护，vue3时渐渐也有开发者加入，react是由facebook团队维护；vue的文档阅读性比react好。

应用场景

vue适合中小型应用，react更适合大型应用

由于vue使用template模板，更直观和易理解，缺点是难以排查运行时错误，不利于测试和重构，业务复杂代码多的时候不好维护。react是使用jsx的语法，测试和重构上更方便。