- [多工作空间](#多工作空间)
  - [workspace 用法](#workspace-用法)
  - [catalog 用法](#catalog-用法)
- [npm 和 yarn 存在的问题](#npm-和-yarn-存在的问题)
- [pnpm 怎么解决这些问题](#pnpm-怎么解决这些问题)
  - [如何省磁盘空间](#如何省磁盘空间)
  - [如何速度快](#如何速度快)
  - [如何解决幽灵依赖](#如何解决幽灵依赖)
- [pnpm 常用指令](#pnpm-常用指令)

## 多工作空间

### workspace 用法

[官方说明](https://pnpm.io/zh/workspaces)

在根目录新建 `pnpm-workspace.yaml` 文件，并添加 packages 配置来指定工作空间的路径。

```md
packages:

- pkg1
- pkg2
```

创建文件夹 `pkg1` 和 `pkg2` ，并分别执行 `pnpm init` 为两个文件夹新建 package.json 文件。
此时 `pkg1` 要引用 `pkg2` 内容，在自己的 `package.json` 中添加包并制定版本为 `workspace:*` 即可，其中包名应为 `pkg2` 的 package.json 中的 name

```js
  "dependencies": {
    "pkg2": "workspace:*",
  }
```

- `安装所有工作空间依赖` ：根目录或子包目录运行 `pnpm i` 都会为所有工作空间安装依赖
- `安装指定工作空间依赖` ：根目录或子包目录运行 `pnpm -F <package name>... i` ，会安装当前包的依赖（包含被当前包依赖的其他子包依赖），[详见](https://pnpm.io/zh/filtering#--filter-package_name-1)

### catalog 用法

[官方说明](https://pnpm.io/zh/catalogs)

`pnpm 9.5 才开始引入，即需要 node >= 18`

为多仓库统一依赖版本

在根目录的 `pnpm-workspace.yaml` 添加 `catalog` 配置来制定包的版本

```js
packages:
  - internal/*

catalog:
  'vue': ^0.37.0
```

子包中在 `package.json` 添加依赖时版本号用 `catalog:` 表示，最终发布时会被替换为 `pnpm-workspace.yaml` 中的版本

```js
  "dependencies": {
    "pinia": "catalog:",
    "vue": "catalog:",
  },
```

## npm 和 yarn 存在的问题

npm v2 版本之前采用包嵌套形式，导致了以下问题：

1. 不同包底下会出现相同的依赖，占用了额外的硬盘空间
2. 依赖层层嵌套，会出现引用路径过长问题（windows 的文件路径最长是 260 多个字符）

npm v3 和 yarn 针对以上问题的解决方式：

> 依赖不做嵌套，而是提升到外层平铺开来。

引发新的问题：

1. 幽灵依赖：没有声明在 dependencies 里的依赖，仍然可以 import。（因为依赖已平铺到外层）
2. 由于提升依赖只能提升一个版本，其他版本依然是以嵌套的形式存在，还是会存在浪费硬盘空间的情况

## pnpm 怎么解决这些问题

先了解[软硬链接](https://www.cnblogs.com/itech/archive/2009/04/10/1433052.html)概念：

1. 软链接 symbolic link：新建一个文件，文件内容指向另一个路径；
2. 硬链接 hard link：直接引用文件的地址；

pnpm 实现原理：将包及包的相关依赖平铺地安装到一个全局仓库（node_modules/.pnpm），项目中 `package.json` 下的依赖通过硬链接引用，包与包之间的依赖则是通过软链接引用。

![pnpm官方原理图](./images/pnpm官方原理图.jpg)

### 如何省磁盘空间

- 不会重复安装同一个包。使用 `npm/yarn` 时，100 个项目都使用了 `lodash` ，那 `lodash` 会被安装 100 次，磁盘中有 100 个地方写入这个包的代码。使用 `pnpm` 时每个包只会在全局仓库安装一次，不同项目使用 `硬链接（hardlink）` 引用。
- 安装了不同版本的包，新版本会最大程度去复用旧版的代码。比如 `lodash` 有 100 个文件，新版有 101 个文件，那么新版的包会保留旧版 100 个文件的硬链接和写入一个新文件。

### 如何速度快

- 已存在包不再下载。若全局仓库中已存在项目所需包，则直接复用不再下载。
- 节省复制文件的时间。采用链接形式来引用，无需将包复制到项目下。

### 如何解决幽灵依赖

`幽灵依赖` 指的是未在 `package.json` 中声明也可以直接导入使用的包。通常是因为 `npm/yarn` 将包与依赖包在项目下平铺，导致包虽然没声明，但也能引入使用。若包在更新后将部分依赖包删除，但业务代码使用了幽灵依赖是无法感知的，就会出现业务代码无法正常运行的安全问题。

`pnpm` 在全局仓库平铺所有包，而在项目中， `node_modules` 的包跟 `package.json` 会保持一致，要使用包必须先在 `package.json` 中声明，安装后，`node_modules` 中的包会硬链接到全局仓库的包，包与包的依赖则是用软链接来处理，从而解决了幽灵依赖问题。

## pnpm 常用指令

执行 `npm i -g pnpm` 安装 pnpm

**通用指令**

```bash
# 安装包
pnpm i eslint

# 更新包
pnpm update eslint@6.7.2

# 删除包
pnpm rm eslint
# or
pnpm uninstall eslint

# 移除不需要的包
pnpm prune

# 执行 package.json 中 scripts 指令
pnpm serve
```

**工作空间指令**

```bash
# 仅安装当前子包依赖，忽略查找命名空间。
# 需确认当前仓库未使用 `workspace:*` `catalog:` 版本标记，否则报错
pnpm i --ignore-workspace

# 安装指定工作空间依赖
# 会安装当前包的依赖（包含被当前包依赖的其他子包依赖）
pnpm -F <package name>... i
```
