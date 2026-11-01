# 自动部署前端项目到 github pages

把前端项目通过 GitHub Actions 自动部署到 GitHub Pages 上

### 添加 GitHub Actions 工作流文件

在你的项目根目录下创建：  
`.github/workflows/deploy.yml`

内容如下（最简单版本）：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main'] # 当推送到 main 分支时触发

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      # 需使用pnpm，npm安装依赖经常报错
      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

---

### 在仓库设置中启用 GitHub Pages

- 进入仓库的 **Settings → Pages**
- **Source** 选择 **GitHub Actions**

---

### 推送代码

把上面创建的工作流文件 `push` 到你的 `main` 分支（或者你配置的分支）。  
GitHub Actions 会自动运行，完成后你的网站会部署到：

`https://你的用户名.github.io/仓库名/`

---
