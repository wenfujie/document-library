## 介绍

shell 脚本就是由 Shell 命令组成的执行文件，将一些命令整合到一个文件中，进行处理业务逻辑，脚本不用编译即可运行。

## 常用 shell 脚本

### docker 打包镜像

1. 根目录添加 `/docker_run.sh` 文件，并写入以下内容

```bash
# /bin/bash

# 镜像名称
IMAGE_NAME="test:1.0.0"
# 参数1
API_URL="http://192.168.1.111:3000/webpayserver/"
# 参数2
API_URL_FOR_CHINA="http://192.168.1.222:3000/webpayserver/"


# npm run build:sit # 有修改前端代码时再开启，提高启动速度
docker stop $(docker ps -aq) # 停止所有容器（否则无法删除镜像）
docker rmi -f ${IMAGE_NAME} # 删除镜像（防止镜像已存在）
docker build -t ${IMAGE_NAME} ./ # 打包镜像
docker run -p 8080:5001 -e API_URL=${API_URL} -e API_URL_FOR_CHINA=${API_URL_FOR_CHINA} ${IMAGE_NAME} # 启动容器

```

2. 添加 npm 启动指令

```json
{
	...
  "scripts": {
    "docker_run": "sh docker_run.sh"
  },
  ...
}
```

确保 docker 已启动，运行 `npm run docker_run ` 即可打包和启动容器。

### git 多平台推送代码

1. 根目录添加文件 `/code_push.sh` ，并写入以下内容

```bash
# /bin/bash

# 确保脚本抛出遇到的错误
set -e

git init
git add -A
git commit -m '编辑【xxx文章】'

# 推送到 github
git push -f git@github.com:wenfujie/document-library.git master
# 推送到 gitee
git push -f git@gitee.com:mozhata/document-library.git master

echo '----- 恭喜，代码推送成功！ -----'
```

2. 添加 npm 启动指令

```json
{
	...
  "scripts": {
    "code_push": "sh code_push.sh"
  },
  ...
}
```

运行 `npm run code_push ` 即可推送代码到 `github` 和 `gitee` 。
