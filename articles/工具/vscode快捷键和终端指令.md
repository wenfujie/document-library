- [vscode 代码片段](#vscode-代码片段)
  - [Import and export](#import-and-export)
  - [Various methods](#various-methods)
  - [Console methods](#console-methods)
- [vscode 快捷键](#vscode-快捷键)
  - [1、工作区快捷键](#1工作区快捷键)
  - [2、跳转操作](#2跳转操作)
  - [3、移动光标](#3移动光标)
  - [4、编辑、折叠代码](#4编辑折叠代码)
  - [5、删除操作](#5删除操作)
  - [6、多光标选择/多光标编辑](#6多光标选择多光标编辑)
  - [7、多列选择/多列编辑](#7多列选择多列编辑)
  - [8、编程语言相关](#8编程语言相关)
  - [9、搜索相关](#9搜索相关)
  - [10、方法和文件头注释](#10方法和文件头注释)
- [Mac 常用终端指令](#mac-常用终端指令)
- [后语](#后语)

## vscode 代码片段

### Import and export

| Trigger | Content                                                      |
| ------: | ------------------------------------------------------------ |
|  `imp→` | imports entire module `import fs from 'fs';`                 |
|  `imn→` | imports entire module without module name `import 'animate.css'` |
|  `imd→` | imports only a portion of the module using destructing `import {rename} from 'fs';` |
|  `env→` | exports name variable `export const nameVariable = localVariable;` |



### Various methods

|  Trigger | Content                                                      |
| -------: | ------------------------------------------------------------ |
|   `fre→` | forEach loop in ES6 syntax `array.forEach(currentItem => {})` |
|   `fof→` | for ... of loop `for(const item of object) {}`               |
|   `fin→` | for ... in loop `for(const item in object) {}`               |
|  `anfn→` | creates an anonymous function `(params) => {}`               |
|   `nfn→` | creates a named function `const add = (params) => {}`        |
|   `dob→` | destructing object syntax `const {rename} = fs`              |
|   `dar→` | destructing array syntax `const [first, second] = [1,2]`     |
| `thenc→` | adds then and catch declaration to a promise `.then((res) => {}).catch((err) => {});` |
|   `met→` | creates a method inside a class `add() {}`                   |



### Console methods

| Trigger | Content                                                      |
| ------: | ------------------------------------------------------------ |
|  `clg→` | console log `console.log(object)`                            |
|  `clo→` | console log object with name `console.log('object :>> ', object);` |

## vscode 快捷键

vscode 用得熟不熟，就看你是否会用快捷键。

### 1、工作区快捷键

| Mac 快捷键           | Win 快捷键               | 作用                                          | 备注                 |
| -------------------- | ------------------------ | --------------------------------------------- | -------------------- |
| **Cmd + Shift + P**  | **Ctrl + Shift + P**，F1 | 显示命令面板                                  |                      |
| **Cmd + B**          | **Ctrl + B**             | 显示/隐藏侧边栏                               | 很实用               |
| **Cmd + +、Cmd + -** | **ctrl + +、ctrl + -**   | 将工作区放大/缩小（包括代码字体、左侧导航栏） | 在投影仪场景经常用到 |
| Cmd + J              | Ctrl + J                 | 显示/隐藏控制台                               |                      |
| **Cmd + Shift + N**  | **Ctrl + Shift + N**     | 重新开一个软件的窗口                          | 很常用               |
| Cmd + Shift + W      | Ctrl + Shift + W         | 关闭软件的当前窗口                            |                      |
| Cmd + N              | Ctrl + N                 | 新建文件                                      |                      |
| Cmd + W              | Ctrl + W                 | 关闭当前文件                                  |                      |

### 2、跳转操作

| Mac 快捷键                    | Win 快捷键             | 作用                                                 | 备注     |
| ----------------------------- | ---------------------- | ---------------------------------------------------- | -------- |
| **Cmd + Option + 左右方向键** | Ctrl + Pagedown/Pageup | 在已经打开的**多个文件**之间进行切换                 | 非常实用 |
| Cmd + Shift + O               | Ctrl + shift + O       | 在当前文件的各种**方法之间**（符号：Symbol）进行跳转 |          |

### 3、移动光标

| Mac 快捷键                      | Win 快捷键                                 | 作用                               | 备注           |
| ------------------------------- | ------------------------------------------ | ---------------------------------- | -------------- |
| Cmd + k  Cmd + q                |                                            | 回到编辑位置                       | 不影响编辑内容 |
| **option + 左右方向键**         | **Ctrl + 左右方向键**                      | 在**单词**之间移动光标             | 很常用         |
| **Cmd + 左右方向键**            | **Fn + 左右方向键**（或 Win + 左右方向键） | 将光标定位到当前行的最左侧、最右侧 | 很常用         |
| **Option + Shift + 左右方向键** | **Alt + Shift + 左右方向键**               | 左右扩大/缩小选中的范围            | 很酷，极为高效 |
| Cmd + ↑                         | Ctrl + Home                                | 将光标定位到文件的第一行           |                |
| Cmd + ↓                         | Ctrl + End                                 | 将光标定位到文件的最后一行         |                |
| Cmd + Shift + \                 |                                            | 在代码块之间移动光标               |                |

### 4、编辑、折叠代码

| Mac 快捷键             | Win 快捷键          | 作用                                                         | 备注                                   |
| ---------------------- | ------------------- | ------------------------------------------------------------ | -------------------------------------- |
| cmd + option + [       |                     | 折叠光标所在代码块的代码                                     | '['替换为']' 即展开                    |
| cmd + k && cmd + [     |                     | 折叠光标所在代码块的代码，包含子代码块                       | '['替换为']' 即展开                    |
| cmd + k && cmd + 0     |                     | 折叠代码，其中0代表等级，支持0,1,2,3,4,5 ，0折叠所有1折叠第一层 |                                        |
| cmd + k && cmd + j     |                     | 展开所有代码                                                 |                                        |
| **Cmd + Enter**        | **Ctrl + Enter**    | 在当前行的下方新增一行，然后跳至该行                         | 即使光标不在行尾，也能快速向下插入一行 |
| Cmd+Shift+Enter        | Ctrl+Shift+Enter    | 在当前行的上方新增一行，然后跳至该行                         | 即使光标不在行尾，也能快速向上插入一行 |
| **Option + Shift + ↓** | **Alt + Shift + ↓** | 将代码向下复制一行                                           | 写重复代码的利器                       |

补充：

1. 折叠光标所在代码块所有的子代码块：先 cmd + k && cmd + [ ，再 cmd + option + ] 展开即可。
2. 将光标点击到某一行的任意位置时，默认就已经是**选中全行**了，此时可以直接**复制**或**剪切**，无需点击鼠标。这个非常实用，是所有的编辑操作中，使用得最频繁的。

### 5、删除操作

| Mac 快捷键             | Win 快捷键           | 作用                   | 备注                                      |
| ---------------------- | -------------------- | ---------------------- | ----------------------------------------- |
| Cmd + shift + K        | Ctrl + Shift + K     | 删除整行               | 「Cmd + X」的作用是剪切，但也可以删除整行 |
| **option + Backspace** | **Ctrl + Backspace** | 删除光标之前的一个单词 | 英文有效，很常用                          |
| option + delete        | Ctrl + delete        | 删除光标之后的一个单词 | delete 键为 fn + backspace                |
| **Cmd + Backspace**    |                      | 删除光标之前的整行内容 | 很常用                                    |
| Cmd + delete           |                      | 删除光标之后的整行内容 |                                           |

备注：上面所讲到的移动光标、编辑操作、删除操作的快捷键，在其他编辑器里，大部分都适用。

### 6、多光标选择/多光标编辑

多光标选择在编程的**提效**方面可谓立下了汗马功劳。因为比较难记住，所以你要时不时回来复习这一段。

| Mac 快捷键                        | Win 快捷键                     | 作用                                                                                                                 | 备注                                     |
| --------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| **Option + 鼠标连续点击任意位置** | **Alt + 鼠标连续点击任意位置** | 在任意位置，同时出现多个光标                                                                                         | 很容易记住                               |
| Cmd + D                           | Ctrl + D                       | 将光标放在某个单词的位置（或者先选中某个单词），然后反复按下「 **Cmd + D** 」键， 即可将下一个相同的词逐一加入选择。 | 较常用                                   |
| **Cmd + Shift + L**               | **Ctrl + Shift + L**           | 将光标放在某个单词的位置（或者先选中某个单词），然后按下快捷键，则所有的相同内容处，都会出现光标。                   | 很常用。比如变量重命名的时候，就经常用到 |

### 7、多列选择/多列编辑

多列选择是更高效的多光标选择，所以单独列成一小段。

| Mac 快捷键             | Win 快捷键          | 作用                                                               | 备注   |
| ---------------------- | ------------------- | ------------------------------------------------------------------ | ------ |
| **Option + Shift + i** | **Alt + Shift + I** | 选中一堆文本后，按下快捷键，既可在**每一行的末尾**都出现一个光标。 | 很常用 |

### 8、编程语言相关

| Mac 快捷键             | Win 快捷键      | 作用         | 备注   |
| ---------------------- | --------------- | ------------ | ------ |
| Cmd + /                | Ctrl + /        | 添加单行注释 | 很常用 |
| **Option + Shift + F** | Alt + shift + F | 代码格式化   | 很常用 |

### 9、搜索相关

| Mac 快捷键          | Win 快捷键          | 作用                                       | 备注   |
| ------------------- | ------------------- | ------------------------------------------ | ------ |
| **Cmd + Shift + F** | **Ctrl + Shift +F** | 全局搜索代码                               | 很常用 |
| **Cmd + P**         | **Ctrl + P**        | 在当前的项目工程里，**全局**搜索文件名     |        |
| **Cmd + G**         | **F3**              | 在当前文件中搜索代码，光标仍停留在编辑器里 | 很巧妙 |

### 10、方法和文件头注释

安装 `koroFileHeader` 扩展插件，用来在 vscode 中增加文件头备注和方法备注快捷键。

| mac                | 作用             |
| :----------------- | :--------------- |
| ctrl + command + i | 自动生成头部     |
| ctrl + command + t | 自动生成方法备注 |

可配置自动更新头部，可参考：[相关配置项](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE%E5%AD%97%E6%AE%B5)

## Mac 常用终端指令

|    命令名     |        功能描述        |           使用举例           |
| :-----------: | :--------------------: | :--------------------------: |
|     mkdir     |      创建一个目录      |        mkdir dirname         |
|     rmdir     |  删除一个目录(空目录)  |        rmdir dirname         |
|      rm       |     删除文件或目录     | rm filename 或者 rm -rf dist |
|      cd       |      改变当前目录      |          cd dirname          |
|      ls       |   显示当前目录的内容   |              ls              |
|     touch     |        创建文件        |        touch test.txt        |
|     open      |     打开并编辑文件     |       open -e test.txt       |
|      cat      |   在终端显示文件内容   |         cat test.txt         |
|      rm       |        删除文件        |         rm test.txt          |
| lsof -i :8080 | 查看什么进程在使用端口 |        lsof -i :8080         |
| kill 进程 id  |        杀死进程        |          kill 22908          |

解决进程被占用：

- lsof -i :8080 查看被什么进程使用（PID 为进程 id）
- kill PID

## 后语

参考文章

[vscode 的使用（star 20K）](https://github.com/qianguyihao/Web/blob/master/00-%E5%89%8D%E7%AB%AF%E5%B7%A5%E5%85%B7/01-VS%20Code%E7%9A%84%E4%BD%BF%E7%94%A8.md)
