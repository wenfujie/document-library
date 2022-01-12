#!/usr/bin/env sh
###
 # @Date: 2022-01-07 16:15:13
 # @LastEditors: wenfujie
 # @LastEditTime: 2022-01-12 13:59:56
 # @FilePath: /document-library/deploy.sh
 # @describe: 该脚本用于将代码同时推送到 github、gitee
 # @use: 运行指令 sh deploy.sh
### 

# 确保脚本抛出遇到的错误
set -e

git init
git add -A
git commit -m '更新文章【articles/开发相关知识/学习正则表达式.md】'

git push -f git@github.com:wenfujie/document-library.git master
git push -f git@gitee.com:mozhata/document-library.git master

cd -