
## 什么是BFF
BBF - backend for frontend：**服务于前端的后端**。

通常指基于 node 的 express 或 koa 实现的中间层，该层会向服务端请求获取数据，然后按前端界面需求处理数据并相应给前端。


## 为什么要用BFF
最开始的开发，通常是由 Java 类的语言实现 Api，前端直连 Api 获取、处理数据，最终渲染页面。

近年来微服务逐渐兴起，后端一个大型服务会拆分为多个小服务。前端如果直连多个服务的话成本太高，所以出现了以下几种应对方案：

1. Api Getway
2. cors
3. BBF

前两个简单介绍下：

**Api Gerway**，又称Api网关，本质上是一个服务器，他的功能包含了统一接入、协议适配、流量管理与容错、以及安全防护。所以客户端请求时直接请求Api网关，由网关来分发给不同的服务去处理。

**cors**：跨域资源共享。前端通过cors来实现对不同服务的直连请求。维护成本太高，不推荐此方法。

**BBF是如何处理的呢？**

将组装、聚合、裁剪这部分业务单独拎出来，组成一个叫Back-end for Front-end的中间层。由 node 配合 express 或 koa 做请求转发和数据转化。前端不同平台都通过 BFF 来获取数据。

**优势**

1. 服务端无需过多关心前端界面，只需提供粗粒度的接口
2. 琐碎的api及数据处理都由前端决定，更能适配到前端不同平台
3. BFF借助插件能生成Api文档，无需后端单开这类服务
4. 能更灵活得应对需求改变

**劣势**

1. 由于请求增加了转发过程，所以请求会延时
2. 增加了 BFF 端的开发成本
