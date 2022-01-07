#!/usr/bin/env sh
###
 # @Date: 2022-01-07 16:15:13
 # @LastEditors: wenfujie
 # @LastEditTime: 2022-01-07 16:21:12
 # @FilePath: /document-library/deploy.sh
### 

# 确保脚本抛出遇到的错误
set -e

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:wenfujie/document-library.git master
git push -f git@gitee.com:mozhata/document-library.git master

cd -