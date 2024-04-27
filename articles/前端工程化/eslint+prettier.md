- [eslint](#eslint)
  - [如何在 vscode 中启用 eslint](#如何在-vscode-中启用-eslint)
- [prettier](#prettier)
  - [如何在 vscode 中使用 prettier](#如何在-vscode-中使用-prettier)
- [问题](#问题)
  - [formatOnSave vs codeActionsOnSave](#formatonsave-vs-codeactionsonsave)
  - [shift+option+f](#shiftoptionf)
  - [代码格式化执行慢](#代码格式化执行慢)
- [最佳实践](#最佳实践)

## eslint

作用：代码质量检查、格式化代码

### 如何在 vscode 中启用 eslint

1. 在 vscode 中安装 ESLint 插件，并在 setting.json 中配置启用 `"eslint.enable": true`
2. 安装 eslint 相关 npm 包
3. 在项目根目录有配置文件.eslintrc.js 或者.eslintrc.json，或者在根项目的 package.json 中配置项 eslintConfig 中配置 eslint 的规则。

## prettier

作用：格式化代码，格式化效果比 eslint 更强大。

### 如何在 vscode 中使用 prettier

vscode 中安装 Prettier 插件

在 vscode `setting.json` 中配置格式化工具，然后使用快捷键 `shift+option+f`即可触发代码格式化。

```json
{
  // 指定默认格式化工具
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

```json
// 仅指定某个语言格式化工具
{
   "[javascript]" {
       "editor.defaultFormatter": "esbenp.prettier-vscode"
   }
}

```

## 问题

### formatOnSave vs codeActionsOnSave

两者都能触发保存后格式化代码，如果都开启则两种同时触发。

`formatOnSave` 会触用默认格式化工具进行格式化 ，即 editor.defaultFormatter 所配置的工具。

```json
{
  "editor.formatOnSave": true,
  // 指定默认格式化工具
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

`codeActionsOnSave` 可以在格式化前运行一些指令，或者配置多个格式化指令。

```json
{
  // 使用eslint进行格式化
  "editor.codeActionsOnSave": ["source.fixAll.eslint"]
}
```

```json
{
  // 使用vscode默认格式化工具进行格式化
  "editor.codeActionsOnSave": ["source.formatDocument"]
}
```

```json
{
  // 同时进行两种格式化，先用默认工具格式化，然后再用eslint格式化
  "editor.codeActionsOnSave": ["source.formatDocument", "source.fixAll.eslint"]
}
```

### shift+option+f

快捷键触发代码格式化，使用 vscode 默认格式化工具或 `editor.defaultFormatter` 所配置工具进行格式化。

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

### 代码格式化执行慢

格式化慢的原因：

1. 使用 eslint 格式化，但根目录无配置文件 .eslintrc.js 、setting.json ，查找不到配置规则导致。
2. 文件过大，代码数千行

解决 1，检查当前 vscode 打开的项目根目录是否有 eslint 的配置文件，没有添加即可。

解决 2，减小单文件代码行数 😄。

## 最佳实践

1. 使用 prettier 作为默认格式化工具，它支持多种语言并且格式化功能更强大。
2. 需同时用 prettier 和 eslint 格式化前端代码，因为他两并不完美，比如 prettier 可以自动换行、eslint 可以删除多于空格和可在函数名与括号间添加空格，这些都是他们独有的。所以建议 formatOnSave:false 并配置 codeActionsOnSave 同时用 prettier、eslint 格式化代码

```json
{
  "eslint.format.enable": true,
  "eslint.validate": ["javascript", "typescript", "vue", "html", "json"],
  "eslint.options": {
    //指定vscode的eslint所处理的文件的后缀
    "extensions": [".js", ".vue", ".ts", ".tsx"]
  },
  // 保存代码时，先 prettier 格式化，再用 eslint 修复
  "editor.codeActionsOnSave": ["source.formatDocument", "source.fixAll.eslint"],
  // 自动格式化工具
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "prettier.semi": false,
  "prettier.singleQuote": true,
  "prettier.trailingComma": "none", // 对象最后一个key末尾不加逗号
  "prettier.bracketSpacing": true,
  // 函数名与括号间加空格
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  // 选择vue文件的格式化工具
  "[vue]": {
    // 1.prettier无法配置函数名后的空格
    // "editor.defaultFormatter": "esbenp.prettier-vscode"
    // 2.使用prettier-eslint修复该问题
    "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"
  }
}
```
