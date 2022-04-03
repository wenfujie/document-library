<!--
 * @Date: 2022-01-06 15:57:52
 * @LastEditors: wenfujie
 * @LastEditTime: 2022-04-03 15:16:31
 * @FilePath: /document-library/articles/工具/Docker使用说明.md
-->

- [Docker 常用指令](#docker-常用指令)
  - [查看容器/镜像](#查看容器镜像)
  - [增、删容器/镜像](#增删容器镜像)
  - [启、停容器/镜像](#启停容器镜像)




## Docker 常用指令

### 查看容器/镜像

**镜像**

```bash
# 查看本地镜像
docker images

# 查看所有镜像id
docker images -aq
```

**容器**

```bash
# 查看容器（已启动）
docker ps 
  # or
  docker container ls

# 查看容器（所有容器，包括未启动）
docker ps -a

# 查看所有容器id
docker ps -aq

```

 

### 增、删容器/镜像

**镜像**

```bash
# 拉取镜像
docker pull node:latest

# 打包镜像（-t 表示 以【xx:xx】tagName形式）
docker build -t 镜像名:镜像版本 ./

# 删除一个镜像
docker rmi -f [image_id]

# 删除所有本地镜像
# -a, --all: 删除所有没有用的镜像，而不仅仅是临时文件；
# -f, --force：强制删除镜像文件，无需弹出提示确认；
docker image prune
```

**容器**

```bash
# 删除一个容器
docker rm -f [container_id]

# 删除所有处于终止状态的容器
# -f, --force：强制删除镜像文件，无需弹出提示确认；
docker container prune
```

### 启、停容器/镜像

**启动**

```bash
# 启动容器
docker run -p 8090:80 镜像:镜像版本  

# 启动容器并传参(-e指令传参)
docker run -p 8080:5001 -e API_URL=http://192.168.5.200:31282 -e APP_ID=123 test:1.0.0

# 启动一个容器
docker start [container_id]
```

**停止**

```bash
# 停止一个容器
直接在docker可视化界面删除container
	# or
docker stop [启动时返回的key]
	# or 
docker stop [container_id]

# 停止所有容器
docker stop $(docker ps -aq)
```

