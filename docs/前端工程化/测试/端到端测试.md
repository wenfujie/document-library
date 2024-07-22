- [### 相关技术栈和工具](#-相关技术栈和工具)
    - [BDD介绍](#bdd介绍)
      - [什么是BDD？](#什么是bdd)
      - [BDD具体实现](#bdd具体实现)
- [### 搭建e2e测试框架](#-搭建e2e测试框架)
    - [初始化目录结构](#初始化目录结构)
    - [初始化配置和环境](#初始化配置和环境)
      - [修改wdio配置](#修改wdio配置)
    - [测试用例编写和实现](#测试用例编写和实现)
      - [测试用例编写](#测试用例编写)
      - [测试用例自动化的实现](#测试用例自动化的实现)
      - [执行自动化测试](#执行自动化测试)
    - [输出测试结果报告，并在浏览器展示](#输出测试结果报告并在浏览器展示)

### 相关技术栈和工具
---
- [行为驱动开发（BDD）](https://cucumber.io/docs/bdd/)：软件团队工作的一种方式
- [webdriverio](https://webdriver.io/)：适用于node的端到端测试框架
- [cucumber.js](https://cucumber.io/)：实现BDD开发的框架
- [selenium](http://www.selenium.org.cn/)：免费的分布式的自动化测试工具
- [chai](https://www.chaijs.com/)：测试中用到的断言工具
- [cukeTest](http://cuketest.com/)：快速编辑自动化脚本的编辑器
- [mongodb](https://www.mongodb.org.cn/)：数据库，断言会用到

**实现效果：** 自动打开谷歌浏览器，并模拟用户进行操作，测试后生成一份测试报告。

**备注：** ==主要用到wdio（webdriverio简写）框架，wdio内置了cucumber.js、selenium，嫌麻烦重点看wdio和chai说明文档即可。==

#### BDD介绍
##### 什么是BDD？

BDD是软件团队工作的一种方式，它可以通过以下方式缩小业务人员和技术人员之间的差距：

> 1. 鼓励跨角色协作以建立对要解决问题的共识
> 1. 进行快速，小的迭代，以增加反馈和价值
> 1. 生成系统文档，并根据系统行为自动检查

为此，我们将重点放在具体的实际示例上来开展协作工作，这些示例说明了我们希望系统如何运行。在持续的协作过程中，我们使用这些示例来指导我们从概念到实现。

##### BDD具体实现
本质上，日常的BDD活动是一个三步骤的迭代过程：

> 1. 首先，对系统进行一个小更改命名为“用户故事”，并讨论其新功能的具体测试用例，就预期要做的细节达成一致。
> 1. 接下来，以一种可以自动化的方式记录这些测试用例。
> 1. 最后，实现每个记录的测试用例所描述的行为，并以实现自动化测试的目标来指导功能代码的开发。

这样做的想法是改动较少的代码并快速迭代，将功能给到测试或产品。每次您自动化并实现一个新示例时，便为应用添加了一些有价值的东西，并得到及时的响应反馈，提高团队开发效率。


### 搭建e2e测试框架
---
#### 初始化目录结构
[![自动化测试目录结构](https://s2.ax1x.com/2020/03/10/8iaua4.png)](https://imgchr.com/i/8iaua4)

#### 初始化配置和环境
```bash
# 安装wdio依赖，安装后会生成./node_modules/.bin/wdio文件
npm i --save-dev @wdio/cli

# 生成wdio配置文件。
# 注意：生成配置文件过程会让你选择报告插件、BDD框架、是否开启同步模式、浏览器驱动。
# 我的配置是选择allure-reporter报告、cucumber框架、开启同步模式、chromedriver驱动，选择后会自动安装所需依赖
./node_modules/.bin/wdio config -y

# 安装断言依赖
npm i chai --save-dev

# 添加启动指令到package.json
{
    ...
    "scripts": {
        "test:e2e": "wdio ./test/e2e/wdio.conf.js"
    },
    ...
}

```

注意：
1. 电脑需安装Java 8
2. 依赖包chromedriver版本要和chrome浏览器版本一致，否则自动打开浏览器会闪退
3. node需要版本10以上，否则报错

##### 修改wdio配置

```javascript
// 将wdio.conf.js移到test/e2e/下

// 修改wdio.conf.js中配置

exports.config = {
    ...
    path: '/wd/hub',// 由于使用chromedriver，此处配置成谷歌服务路径
    specs: [
        './test/e2e/features/*.feature'// 要检索测试用例的路径
    ],
    bail: 100,// 运行测试失败对应次数后，停止测试
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
        // 配置 无浏览器测试（如不需要将goog:chromeOptions注释）
        'goog:chromeOptions': {
          args: ['--headless', '--disable-gpu'],
        }
    }],
    logLevel: 'silent',// 日志等级silent简单，info详细
    baseUrl: 'http://localhost:9528/',// 基础路径
    services: ['chromedriver'],// 浏览器驱动
    framework: 'cucumber',// BDD框架
    // 报告生成路径
    reporters: [['allure', {
        outputDir: './test/e2e/reports/allure-results/',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
    }]],
    // cucumber配置
    cucumberOpts: {
        ...
            require: ['./test/e2e/stepDefinitions/**/*.js'],// 实现步骤代码的路径

        ...
    }，
    ...
}
```
#### 测试用例编写和实现
##### 测试用例编写
由于上文wdio配置中已配置specs: ['./test/e2e/features/*.feature']，
所以wdio会检索该目录下的所有feature文件
```feature
// 新建test.feature于目录test/e2e/features/
// 并增加如下内容

# 剧本标题
Feature: 百度使用测试

  # 场景名称
  Scenario Outline: 百度标题是否正确
    # 具体步骤，共有Given、When、Then三个关键词来标识所有步骤
    When 进入百度网站
    Then 网站标题为"<title>"
    # 例子：程序会按照例子中每一行数据来执行场景步骤
    Examples:
      | title     |
      | 百度一下，你就知道 |
```
##### 测试用例自动化的实现

```javascript
// 新建hook.js 与目录test/e2e/
// 自动化测试钩子

module.exports = {
  before: function() {
    // 将一些常用api设置成全局变量
    const chai = require('chai');
    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should();

    const { Given, When, Then } = require('cucumber')
    global.Given = Given;
    global.When = When;
    global.Then = Then;

    const Page = require('./pageObjects/page.js')
    global.global_page = new Page();
  },
  // 每个场景结束后，增加截图展示
  afterScenario: function(scenarioResult) {
    browser.takeScreenshot();
  },
}
```

```javascript
// wdio.conf.js
// 将hook导入wdio配置中

const hook = require('./hook');

exports.config = {
  ...
  // 导入自定义配置
  ...hook,
  ...
}
```

```javascript
// 新建given.js、when.js、then.js于目录test/e2e/stepDefinitions/
// feature文件中Given、When、Then步骤的逻辑要在这三个文件中实现

// when.js

When("进入百度网站", function () {
  browser.url('https://www.baidu.com/');
});


// then.js

Then("网站标题为{string}", function (title) {
  const browserTitle = browser.getTitle();
  expect(browserTitle).to.be.equal(title);
});
```
**其中**

- **browser**为wdio的全局对象，用来操作浏览器，具体看[官网api](https://webdriver.io/docs/api.html)
- **expect**为chai断言中的一种，用于预期结果的判断（如上例子判断当前浏览器的标题和例子中'百度一下，你就知道'是相等的）

##### 执行自动化测试

```bash
# 由于上文已将启动指令添加到package.json中，直接运行即可

npm run test:e2e
```
运行后，浏览器会自动执行步骤，控制台会打印执行日志信息

#### 输出测试结果报告，并在浏览器展示

```bash
# 安装测试报告生成工具
npm install -g allure-commandline --save-dev

# package.json 中增加scripts指令，用于生成报告
"allure-report": "cd test/e2e/reports && allure generate --clean ./allure-results && allure open"

# 生成allure报告，并在浏览器打开（此时不可打开vpn，否则读取不到服务数据）
# 先手动删除test/e2e/reports/allure-results 文件夹，否则有旧的测试缓存
npm run allure-report
```

[![测试报告](https://s2.ax1x.com/2020/03/10/8iaKIJ.md.png)](https://imgchr.com/i/8iaKIJ)
