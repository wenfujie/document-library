#!/usr/bin/env sh
###
 # @Date: 2022-01-07 16:15:13
 # @LastEditors: wenfujie
 # @LastEditTime: 2022-04-30 23:02:19
 # @FilePath: /document-library/deploy.sh
 # @describe: 该脚本用于将代码同时推送到 github、gitee
 # @use: 运行指令 sh deploy.sh
### 

# 确保脚本抛出遇到的错误
set -e

git init
git add -A
git commit -m '修改文章【articles/工具/git使用手册.md】'

git push -f git@github.com:wenfujie/document-library.git master
git push -f git@gitee.com:mozhata/document-library.git master

echo '----- 恭喜，代码推送成功！ -----'