<!--
 * @Date: 2021-06-16 17:22:48
 * @LastEditors: wenfujie
 * @LastEditTime: 2022-03-29 15:15:47
 * @FilePath: /document-library/articles/Mac/mac系统及软件快捷键.md
-->

- [Mac 常用终端指令](#mac-常用终端指令)
- [Mac vscode 快捷键](#mac-vscode-快捷键)
- [Mac 自带快捷键](#mac-自带快捷键)

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

## Mac vscode 快捷键

安装 `IntelliJ IDEA Keybindings` 插件，用来在 vscode 中使用 idea 的快捷键。

| windows  | mac                        | 功能                                                                     |
| :------- | :------------------------- | :----------------------------------------------------------------------- |
| ctrl + w | option + ↑                 | 范围选中代码                                                             |
| alt + j  | control + g                | 选中下一个已选中范围文字                                                 |
|          | alt + shift + ← 或 →       | 选中光标左侧或右侧单词                                                   |
|          | alt + ← 或 →               | 光标快速移动                                                             |
|          | shift+tab                  | 选择范围文字往左退一格                                                   |
| crtl + p | command + p                | 根据文件名搜索文件                                                       |
|          | command + j                | 显示或隐藏终端                                                           |
|          | control + - 或 +           | 回到光标上次位置                                                         |
|          | shift + enter              | command + f 搜索时，向上文搜索                                           |
|          | command + shift + （+或-） | 展开/折叠所有代码(焦点位于编辑框)；放大/缩小编辑器（焦点位于编辑器外框） |

安装 `koroFileHeader` 插件，用来在 vscode 中增加文件头备注和方法备注快捷键。

| windows | mac                | 功能             |
| :------ | :----------------- | :--------------- |
|         | ctrl + command + i | 自动生成头部     |
|         | ctrl + command + t | 自动生成方法备注 |

可配置自动更新头部，可参考：[相关配置项](https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE%E5%AD%97%E6%AE%B5)

## Mac 自带快捷键

**使用 shift 快速选中一段文字**

在要复制的文字起始位置点击左键，按住 `shift` 键并在要复制的文字结束位置点击左键
