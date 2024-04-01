#!/usr/bin/env sh
###
 # @Date: 2022-01-07 16:15:13
 # @LastEditors: 温富杰 wenfujie@dianchu.com
 # @LastEditTime: 2024-04-01 18:00:57
 # @FilePath: /document-library/deploy.sh
 # @describe: 该脚本用于将代码同时推送到 github、gitee
 # @use: 运行指令 sh deploy.sh
### 

# 确保脚本抛出遇到的错误
set -e

# git init
git add -A
git commit -m 'docs: add doc [articles/前端工程化/babel+polyfill兼容旧版浏览器.md]'

git push -f git@github.com:wenfujie/document-library.git master
git push -f git@gitee.com:mozhata/document-library.git master

echo '----- 恭喜，代码推送成功！ -----'