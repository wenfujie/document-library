# 个人博客

访问域名： https://wenfujie.github.io/document-library/

## 开发说明

使用 [vitepress](https://vitepress.dev/zh/) 搭建的博客。

### 目录说明

- .github/workflows/deploy.yml：github ci 配置（github action）
- docs/.vitepress：vitepress 配置文件及打包产物
- docs：存放博客 md 文件

### 开发

master 为主分支，在该分支修改即可。

本地启动

```js
pnpm docs:dev
```

### 部署

已配置 `github action` 自动部署，在 master 分支提交代码即可触发。

[当前项目 workflows](https://github.com/wenfujie/document-library/actions)

[github action 配置说明](https://vitepress.dev/zh/guide/deploy#github-pages)
