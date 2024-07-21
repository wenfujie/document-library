- [### 传统的手工部署](#-传统的手工部署)
- [### 实现自动化部署流程](#-实现自动化部署流程)
      - [具体步骤](#具体步骤)
      - [node中运行指令](#node中运行指令)
      - [文件打包成zip（archiver）](#文件打包成ziparchiver)
      - [连接远程服务（node-ssh）](#连接远程服务node-ssh)
      - [具体实现代码](#具体实现代码)

### 传统的手工部署
---

1. 打包，本地运行npm run build打包生成dist文件夹。
1. ssh连接服务器，切换路径到web对应目录下。
1. 上传代码到web目录，一般通过xshell或者xftp完成。

![image](https://s1.ax1x.com/2020/08/06/agWs5d.png)

传统的手工部署存在以下缺点：
1. 每次都需要打开xshell软件与服务器建立连接。
1. 当负责多个项目且每个项目都具有测试环境和线上环境时，容易引起部署错误。

### 实现自动化部署流程
---

##### 具体步骤
1. 读取配置文件，包含服务器host、port、web目录及本地目录等信息
1. 本地打包，npm run build生成dist包
1. 打包成zip，使用archiver将dist包打包成dist.zip
1. 连接服务器，node-ssh读取配置连接服务器
1. 上传zip，使用ssh.putFile上传dist.zip
1. 解压缩zip，使用ssh.execCommand解压dist.zip
1. 删除本地dist.zip，使用fs.unlink删除本地dist.zip

![image](https://s1.ax1x.com/2020/08/06/agW6PA.png)

##### node中运行指令
```javascript
// child_process包可用于执行shell指令
const childProcess = require('child_process');
childProcess.execSync('npm run build');
```

##### 文件打包成zip（archiver）
archiver用于打包文件生成zip、rar等

```javascript
 const archiver = require('archiver');

  // 设置压缩类型及级别
  const archive = archiver('zip', {
    zlib: { level: 9 },
  }).on('error', err => {
    throw err;
  });

  // 创建文件输出流
  const output = fs.createWriteStream(__dirname + '/dist.zip');

  // 通过管道方法将输出流存档到文件
  archive.pipe(output);

  // 从subdir子目录追加内容并重命名
  archive.directory('subdir/', 'new-subdir');

  // 完成打包归档
  archive.finalize();
```



##### 连接远程服务（node-ssh）
node-ssh是一个基于ssh2的轻量级npm包，主要用于ssh连接服务器、上传文件、执行命令。


```javascript
const node_ssh = require('node-ssh')
const ssh = new node_ssh()

// 连接服务器
ssh.connect({
  host: 'localhost',
  username: 'steel',
  privateKey: '/home/steel/.ssh/id_rsa'
})

// 上传文件
  ssh.putFile('/home/steel/Lab/localPath', '/home/steel/Lab/remotePath').then(function() {
    console.log("The File thing is done")
  }, function(error) {
    console.log("Something's wrong")
    console.log(error)
  })

// 在远程服务执行命令
  ssh.execCommand('hh_client --json', { cwd:'/var/www' }).then(function(result) {
    console.log('STDOUT: ' + result.stdout)
    console.log('STDERR: ' + result.stderr)
  })
```



##### 具体实现代码


```javascript
// deploy.js

const path = require('path');
const fs = require('fs');
const childProcess = require('child_process');
const ora = require('ora');
const node_ssh = require('node-ssh');
const archiver = require('archiver');
const { successLog, errorLog, underlineLog } = require('../utils/index');
const projectDir = process.cwd();

let ssh = new node_ssh(); // 生成ssh实例

// 部署流程入口
async function deploy(config) {
  const { script, webDir, distPath, projectName, name } = config;
  try {
    execBuild(script);
    await startZip(distPath);
    await connectSSH(config);
    await uploadFile(webDir);
    await unzipFile(webDir);
    await deleteLocalZip();
    successLog(`\n 恭喜您，${underlineLog(projectName)}项目${underlineLog(name)}部署成功了^_^\n`);
    process.exit(0);
  } catch (err) {
    errorLog(`  部署失败 ${err}`);
    process.exit(1);
  }
}

// 第一步，执行打包脚本
function execBuild(script) {
  try {
    console.log(`\n（1）${script}`);
    const spinner = ora('正在打包中');
    spinner.start();
    console.log();
    childProcess.execSync(script, { cwd: projectDir });
    spinner.stop();
    successLog('  打包成功');
  } catch (err) {
    errorLog(err);
    process.exit(1);
  }
}

// 第二部，打包zip
function startZip(distPath) {
  return new Promise((resolve, reject) => {
    distPath = path.resolve(projectDir, distPath);
    console.log('（2）打包成zip');
    const archive = archiver('zip', {
      zlib: { level: 9 },
    }).on('error', err => {
      throw err;
    });
    const output = fs.createWriteStream(`${projectDir}/dist.zip`);
    output.on('close', err => {
      if (err) {
        errorLog(`  关闭archiver异常 ${err}`);
        reject(err);
        process.exit(1);
      }
      successLog('  zip打包成功');
      resolve();
    });
    archive.pipe(output);
    archive.directory(distPath, '/');
    archive.finalize();
  });
}

// 第三步，连接SSH
async function connectSSH(config) {
  const { host, port, username, password, privateKey, passphrase, distPath } = config;
  const sshConfig = {
    host,
    port,
    username,
    password,
    privateKey,
    passphrase
  };
  try {
    console.log(`（3）连接${underlineLog(host)}`);
    await ssh.connect(sshConfig);
    successLog('  SSH连接成功');
  } catch (err) {
    errorLog(`  连接失败 ${err}`);
    process.exit(1);
  }
}

// 第四部，上传zip包
async function uploadFile(webDir) {
  try {
    console.log(`（4）上传zip至目录${underlineLog(webDir)}`);
    await ssh.putFile(`${projectDir}/dist.zip`, `${webDir}/dist.zip`);
    successLog('  zip包上传成功');
  } catch (err) {
    errorLog(`  zip包上传失败 ${err}`);
    process.exit(1);
  }
}


// 运行命令
async function runCommand(command, webDir) {
  await ssh.execCommand(command, { cwd: webDir });
}

// 第五步，解压zip包
async function unzipFile(webDir) {
  try {
    console.log('（5）开始解压zip包');
    await runCommand(`cd ${webDir}`, webDir);
    await runCommand('unzip -o dist.zip && rm -f dist.zip', webDir);
    successLog('  zip包解压成功');
  } catch (err) {
    errorLog(`  zip包解压失败 ${err}`);
    process.exit(1);
  }
}

// 第六步，删除本地dist.zip包
async function deleteLocalZip() {
  return new Promise((resolve, reject) => {
    console.log('（6）开始删除本地zip包');
    fs.unlink(`${projectDir}/dist.zip`, err => {
      if (err) {
        errorLog(`  本地zip包删除失败 ${err}`, err);
        reject(err);
        process.exit(1);
      }
      successLog('  本地dist.zip删除成功\n');
      resolve();
    });
  });
}

module.exports = deploy;
```
