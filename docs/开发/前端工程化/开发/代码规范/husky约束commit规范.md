## husky 代码提交检查

husky 覆盖了原生的 git hook ，能让我们更简单的配置 git hook 从而实现自动代码检查。

### husky 简单使用

初始化相关指令

```bash
npm install husky --save-dev

# 初始化.husky文件夹
npx husky install

# 往 package.json 添加 prepare 指令，它会在 npm i 后自动执行
npm pkg set scripts.prepare "husky install"

```

创建 hook，会在 .husky 下生成对应文件

- pre-commit

  ```bash
  npx husky add .husky/pre-commit "npm test"
  ```

- commit-msg

  ```bash
  npx husky add .husky/commit-msg "npm test"
  ```

`.husky/pre-commit` 负责检查要提交的代码是否符合规范

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# 需调整为项目检查代码指令
npm run lint:js

# 获取上面脚本的退出码
exitCode="$?"
exit $exitCode
```

`.husky/commit-msg` 负责检查 commit 消息是否符合规范。

commit 消息检查主流的做法是使用 `commitlint`

增加如下 `commitlint` 配置后，就能使用 `commitlint` 的指令。

```bash
npm install --save-dev @commitlint/config-conventional @commitlint/cli

# 根目录添加 commitlint.config.js 文件
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

结合 `commitlint` 指令完善 `.husky/pre-commit`

```bash
#!/usr/bin/env sh

# $1 为 commit 消息
npx --no -- commitlint --edit $1
```

到此配置完毕，此时 commit 代码可以看到 `.husky/pre-commit` 和 `.husky/commit-msg` 会被执行，若不符合规范则 commit 会被终止。
