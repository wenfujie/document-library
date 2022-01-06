<!--
 * @Date: 2022-01-06 15:57:52
 * @LastEditors: wenfujie
 * @LastEditTime: 2022-01-06 16:06:54
 * @FilePath: /document-library/articles/工具/Docker使用说明.md
-->

## Docker 常用指令

### 增、删、查容器（镜像）
```bash
# 拉取镜像
docker pull node:latest

# 打包镜像（-t 表示 以【xx:xx】tagName形式）
docker build -t 镜像名:镜像版本 ./

# 查看本地镜像
docker images 

# 查看本地容器列表
docker container ls

# 查看本地已启动容器
# -a 显示所有的容器，包括未运行的
docker ps  

# 删除一个镜像/容器
docker rmi -f [image_id]
docker rm -f [container_id]

# 删除所有本地镜像
# -a, --all: 删除所有没有用的镜像，而不仅仅是临时文件；
# -f, --force：强制删除镜像文件，无需弹出提示确认；
docker image prune

# 删除所有处于终止状态的容器
docker container prune
```

### 启动、停止容器（镜像）
```bash
# 启动容器中的镜像   第一种方式
docker run -p 8090:80 镜像:镜像版本

# 启动容器中的镜像   第二种方式
docker container create -p 2333:80 test:1.0.0
# xxx 为上一条命令运行得到的结果
docker container start xxx   

# 启动容器时添加传参(使用-e指令)
docker run -p 8080:5001 -e API_URL=http://192.168.5.200:31282 -e APP_ID=123 test:1.0.0

# 停止运行镜像(或直接在docker desktop删除container)
docker stop [启动时返回的key]

# 停止/开始一个容器
docker stop [container_id]
docker start [container_id]
```