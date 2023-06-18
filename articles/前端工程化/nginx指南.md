## 安装

```bash
brew install nginx

nginx -v
```

配置文件位置 `/usr/local/etc/nginx/nginx.conf`

> 若 mac m1 电脑安装异常： Cannot install in Homebrew on ARM processor in Intel default prefix (/usr/local)!
> 解决：1.右键终端图标，显示简介，将【使用 Rosetta 打开】勾上；2.重启终端即可。

## 指令

```bash
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
```

## 如果打印调试

1. 安装 echo-nginx-module ，安装步骤有点复杂，[安装说明](https://blog.csdn.net/qq_38874734/article/details/105551618)
2. 使用 return 200 "request_method: ${request_method}";

## 语法

### if

#### 单个判断

```bash
# 判断相等
if ($arg_paramName = "0") {}

# 判断不相等
if ($arg_paramName != "0") {}

```

注意：if 后必须要有空格，若写 `if($arg_paramName)` 会报错。

#### 且、或判断

nginx 不支持 `&&` 和 `||` 语法，只能用变量的方式来实现且和或

```bash
# 且逻辑
set $flag "";
if ($request_method = "POST") {
  set $flag "${flag}0";
}
if ($arg_myCardData) {
  set $flag "${flag}1";
}
if ($flag = "01") {
  rewrite ^/(.*)$ $scheme://$host$request_uri redirect;
}
```

```bash
# 或逻辑
set $flag "";
if ($request_method = "POST") {
  set $flag "1";
}
if ($arg_myCardData) {
  set $flag "1";
}
if ($flag = "1") {
  rewrite ^/(.*)$ $scheme://$host$request_uri redirect;
}
```

#### 结合正则判断

```bash
# 获取地址上某个参数
if ($query_string ~ ".*(?:^|\?|&)key=(.+?)(?:(?:&.*)|$)") {
  set $key "$1";
}
if ($uid != $key) {
  return 301 "https://www.baidu.com"
}
```

### rewrite 请求重写或重定向

rewrite 只能放在 server{}, location{}, if{}中。

语法：`rewrite regex replacement [flag];`

flag 标志位

1. last : 相当于 Apache 的[L]标记，表示完成 rewrite
2. break : 停止执行当前虚拟主机的后续 rewrite 指令集
3. redirect : 返回 302 临时重定向，地址栏会显示跳转后的地址
4. permanent : 返回 301 永久重定向，地址栏会显示跳转后的地址

#### 修改入参并重定向

```bash
if ($key) {
  # 对当前请求地址新增code参数，并重定向
  rewrite ^/(.*)$ $scheme://$host$request_uri&code=1? redirect;
}
```

注意：replacement 末尾加 `?` 地址不会去拼接原本的query，若不加则会拼接。


### location

```js
location [ = | ~ | ~* | ^~ ] /URI { … }
```

location 匹配命令解释

| 参数      | 解释                                                                                                |
| --------- | --------------------------------------------------------------------------------------------------- |
| **`空`**  | location 后没有参数直接跟着 **标准 URI**，表示前缀匹配，代表跟请求中的 URI 从头开始匹配。           |
| **`=`**   | 用于**标准 URI** 前，要求请求字符串与其精准匹配，成功则立即处理，nginx 停止搜索其他匹配。           |
| **`^~`**  | 用于**标准 URI** 前，并要求一旦匹配到就会立即处理，不再去匹配其他的那些个正则 URI，一般用来匹配目录 |
| **`~`**   | 用于**正则 URI** 前，表示 URI 包含正则表达式， **区分**大小写                                       |
| **`~\*`** | 用于**正则 URI** 前， 表示 URI 包含正则表达式， **不区分**大小写                                    |

location 匹配顺序，以下序号越小优先级越高

```bash
1. location =    # 精准匹配
2. location ^~   # 带参前缀匹配
3. location ~    # 正则匹配（区分大小写）
4. location ~*   # 正则匹配（不区分大小写）
5. location /a   # 普通前缀匹配，优先级低于带参数前缀匹配。
6. location /    # 任何没有匹配成功的，都会匹配这里处理
```

其中要注意：

- 前缀匹配下，返回最长匹配的 location，与 location 的位置先后顺序无关
- 正则匹配下，按照 location 的位置先后顺序，优先返回前面的

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

代理后地址：代理后地址：proxy_pass url + 访问路径。

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

代理后地址：proxy_pass url + (访问地址截取掉 location url 的地址)。

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

以下为错误使用例子 ❎：

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
