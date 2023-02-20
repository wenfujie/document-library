- [相关指令](#相关指令)
- [反向代理 proxy\_pass 的坑](#反向代理-proxy_pass-的坑)
  - [纯域名](#纯域名)
  - [非纯域名](#非纯域名)
  - [使用正则](#使用正则)
  - [重写代理链接](#重写代理链接)


## 相关指令

```bash
#安装
brew install nginx

#启动
brew services start nginx

##停止
brew services stop nginx

#重启nginx
brew services restart nginx

#重新加载配置文件
nginx -s reload

#验证nginx配置文件是否正确
nginx -t

#配置文件位置
/usr/local/etc/nginx/nginx.conf
```

> 若 mac m1 电脑安装异常： Cannot install in Homebrew on ARM processor in Intel default prefix (/usr/local)!
> 解决：1.右键终端图标，显示简介，将【使用 Rosetta 打开】勾上；2.重启终端即可。

## 反向代理 proxy_pass 的坑

前端经常利用 nginx 的 proxy_pass 实现反向代理，利用服务端没有跨域限制来实现前端的跨域请求。

语法

```bash
location / {
    proxy_pass http://node:8080;
}
```

先理解下 `纯域名` 的概念：

- http://host - √
- https://host - √
- http://host:port - √
- https://host:port - √
- http://host/ - x
- http://host:port/ - x
- http://host:port/test - x

从例子可看出，不带后缀路径即为 `纯域名` 。下面从 `纯域名` 和 `非纯域名` 两个角度来分析 `proxy_pass` 配置的坑。

### 纯域名

访问路径直接拼在 proxy_pass url 的 url 后。

```js
// 访问：   /                               后端：   /
// 访问：   /api/xx                         后端：   /api/xx
// 访问：   /api/xx?aa                      后端：   /api/xx?aa
location / {
    proxy_pass http://node:8080;
}

// 访问：   /api/                           后端：   /api/
// 访问：   /api/xx                         后端：   /api/xx
// 访问：   /api/xx?aa                      后端：   /api/xx?aa
// 访问：   /api-xx?aa                      后端：
location /api/ {
    proxy_pass http://node:8080;
}

// 访问：   /api/                           后端：   /api/
// 访问：   /api/xx                         后端：   /api/xx
// 访问：   /api/xx?aa                      后端：   /api/xx?aa
// 访问：   /api-xx?aa                      后端：   /api-xx?aa
location /api {
    proxy_pass http://node:8080;
}
```

### 非纯域名

proxy_pass + 访问地址截取掉 location url 的地址。

```js
// 访问：   /                               后端：   /
// 访问：   /api/xx                         后端：   /api/xx
// 访问：   /api/xx?aa                      后端：   /api/xx?aa
location / {
    proxy_pass http://node:8080/;
}

// 访问：   /api/                           后端：   /
// 访问：   /api/xx                         后端：   /xx
// 访问：   /api/xx?aa                      后端：   /xx?aa
// 访问：   /api-xx?aa                      未匹配
location /api/ {
    proxy_pass http://node:8080/;
}

// 访问：   /api                            后端：   /
// 访问：   /api/                           后端：   //
// 访问：   /api/xx                         后端：   //xx
// 访问：   /api/xx?aa                      后端：   //xx?aa
// 访问：   /api-xx?aa                      后端：   /-xx?aa
location /api {
    proxy_pass http://node:8080/;
}

// 访问：   /api/                           后端：   /v1
// 访问：   /api/xx                         后端：   /v1xx
// 访问：   /api/xx?aa                      后端：   /v1xx
// 访问：   /api-xx?aa                      未匹配
location /api/ {
    proxy_pass http://node:8080/v1;
}

// 访问：   /api/                           后端：   /v1/
// 访问：   /api/xx                         后端：   /v1/xx
// 访问：   /api/xx?aa                      后端：   /v1/xx
// 访问：   /api-xx?aa                      未匹配
location /api/ {
    proxy_pass http://node:8080/v1/;
}
```

由以上规则可以看出，当 `proxy_pass url` 中包含路径时，结尾的 `/` 最好同 `location` 匹配规则一致。

### 使用正则

`proxy_pass` 结合正则使用时，不允许配置为非纯域名。

以下为错误使用例子❎：

```js
location ~* ^/api/ {
    proxy_pass http://host/;
}

location / {
    if ($uri ~* ^/api/) {
        proxy_pass http://host/;
    }
}
```

### 重写代理链接

把匹配 `/api/` 的链接重写为 `/?path=` 的链接透传给 `node:8080` 服务，有意思的是当使用 `rewrite` 指令并且生效后，`proxy_pass url` 链接中的路径会被忽略。

```js
// 访问：   /                               后端：   /node/
// 访问：   /api                            后端：   /node/api
// 访问：   /api/                           后端：   /?path=
// 访问：   /api/a/b/c                      后端：   /?path=a/b/c
location / {
    rewrite ^/api/(.*) /?path=$1 break;
    proxy_pass http://node:8080/node/;
}
```