- [npm 常用指令](#npm-常用指令)
- [发布 npm 包](#发布-npm-包)
- [拓展](#拓展)
  - [替换 npm 源为淘宝源](#替换-npm-源为淘宝源)
  - [解决 electron 包下载慢](#解决-electron-包下载慢)
## npm 常用指令

```bash
# 初始化package.json文件（自定义内容）
npm init

# 初始化package.json文件（默认内容）
npm init -y

# 安装package.json上所有的包
npm install  或 npm i

# 安装指定包到开发环境
npm i vue --save-dev 或 npm i vue -D

# 安装制定包到生产环境
npm i vue --save 或 npm i vue -S

# 全局安装
npm install webpack -g

# 查看非全局安装的包（--depth表示依赖深度，是否显示包的相关依赖）
npm list --depth 0 或 npm ls --depth 0

# 查看所有的全局包
npm list -g --depth 0 或 npm ls -g --depth 0

# 查看包的版本
npm view packName versions

# 更新指定包
npm update @wenfujie/sonicmoving-deploy-frontend

# 卸载包
npm uninstall vue
```

**npm 账号相关**
```bash
# 注册 npm 账号(根据 提示输入用户名、密码、邮箱，等待账号创建完成)
npm adduser

# 登录npm
npm login

# 查看当前账号
npm whoami
```

## 发布 npm 包
**初始化 package.json**
```bash
# 若未登录，需先登录npm

# 初始化package.json文件，--scope表示包的范围（免费的仅支持使用登录人名称）
npm init --scope=wenfujie
```
以下包的配置信息最好详细填写，会在 npm 官网中展示，便于让用户找到代码仓库和了解相关信息。
```json
// package.json
{
  "name": "@wenfujie/cli", // 包名
  "version": "1.0.0", // 版本编号
  "description": "个人cli工具", // 描述
  "main": "index.js", // 包执行的入口
  "repository": {
    "type": "git",
    "url": "" // 代码仓库地址
  },
  "keywords": [ // 关键词
    "deploy" 
  ],
  "bin": {
    // 全局安装时的全局指令，值为要执行的文件路径
    "wfj-cli": "./index.js"
  },
  "author": "fujie.wen" // 作者
}
```

**发布**

发布前，修改版本号

如果是一个新的包，他的版本号必须从 1.0.0 开始，尽管npm上的有些项目并没有遵循该标准。在此之后，版本更新应遵循一下原则： 
- bug修复和其他小的改动：补丁发布，增加最后一个数字，例如 1.0.1
- 增加新特性，不打破现有特性：小版本，增加中间的数字，如 1.1.0
- 打破向后兼容性的变化：主要版本，增加第一个数字，例如 2.0.0

执行以下发布指令，即可发布成功
```bash
# 参数 access=public 表示发布公有包
# 不加 access 参数发布私有包，私有包需付费
# 每次发版版本号需递增（具体看下文《公共包语义化版本号》
npm publish --access=public
```
**撤销发布**

官方对撤销发布有所限制：
- 不允许撤销发布已经超过24小时的包（unpublish is only allowed with versions published in the last 24 hours）
- 如果在24小时内确实要撤销，需要加--force参数
- 即使撤销了发布的包，再次发布的版本号不能与之前被撤销的包的名称/版本其中之一相同，因为这两者构成的唯一性已经被占用，官方并没有随着撤销而删除
```bash
npm unpublish packName --force
```


## 拓展

### 替换 npm 源为淘宝源
在国内下载部分国外的包，速度较慢，此时修改 npm 源来提升下载速度
```bash
# 查看当前源
npm get registry # https://registry.npmjs.org/

# 使用淘宝源代替 npm 源
npm config set registry http://registry.npm.taobao.org/

# 切换回 npm 默认源
npm config set registry=http://registry.npmjs.org
```

### 解决 electron 包下载慢

```bash
# 先安装cross=-env
npm i cross-env -D

# 使用淘宝源下载 electron
cross-env ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/" npm install electron --save-dev
```