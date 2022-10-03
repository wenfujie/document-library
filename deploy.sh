#!/usr/bin/env sh
###
 # @Date: 2022-01-07 16:15:13
 # @LastEditors: wfj
 # @LastEditTime: 2022-10
 # @FilePath: /document-library/deploy.sh
 # @describe: 该脚本用于将代码同时推送到 github、gitee
 # @use: 运行指令 sh deploy.sh
### 

# 确保脚本抛出遇到的错误
set -e

git init
git add -A
git commit -m '增加文章【articles/js相关/js小技巧.md】;调整readme目录结构'

git push -f git@github.com:wenfujie/document-library.git master
git push -f git@gitee.com:mozhata/document-library.git master

echo '----- 恭喜，代码推送成功！ -----'