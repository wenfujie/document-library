- [语法](#语法)
- [作业的复用](#作业的复用)
  - [extends](#extends)
  - [锚点](#锚点)
  - [脚本锚点](#脚本锚点)

[gitlab-ci 官方文档](https://docs.gitlab.cn/jh/ci/yaml/)

[预定义变量](https://docs.gitlab.cn/jh/ci/variables/predefined_variables.html)

## 语法

```yaml
# 所有作业的默认镜像
image: hub.dianchu.cc/library/base-node:1.0.11

# 定义全局静态变量，变量在 script、before_script 和 after_script 使用
# 语法：名称只能使用数字、字母和下划线 (_)；值必须是字符串；
variables:
    VUE_APP_SENTRY_PROJECT_ID_PRO: 7
    VUE_APP_SENTRY_DSN_SIT: http://6637e3be0f0545efa42162382736d561@192.168.5.59:9000

# 定义命令，这些命令会在每个作业的 script 命令之前运行
before_script:
  - export PROJECT_NAME=$(cat package.json | grep name | head -1 | awk -F "[\"]" '/name/{print$4}') # 定义动态变量
  - export BUILD_TAG=$CI_COMMIT_TAG-$PROJECT_NAME # 使用动态变量

# 作业组：1.同一阶段的作业并行运行。2.下一阶段的作业在上一阶段的作业成功完成后运行
stages:
- BuildFront # 若 BuildFront 作业成功，运行 ServerDeploy
- ServerDeploy # 若 ServerDeploy 作业成功，运行 SyncSentry
- SyncSentry # 若 SyncSentry 作业成功，则流水线被标记为 passed

# 单个作业
build_file: # 作业名称随便取
  stage: BuildFront
  variables: # 作业内部变量
    authorization: 92bfb0d2-445f-4ea8-b4e1-c3025baccc8d
    deployment_id: 9082-8184b4a59433
  only: # 何时向流水线添加作业
    - tags # 提交tag触发时
  rules: # 包含或剔除作业，每个if是或的关系
    - if: '$CI_COMMIT_TAG =~ /.*-alpha.*/' # 为true时执行
    - if: '$CI_COMMIT_TAG =~ /.*-rc.*/'
      when: never # 结合该句，表示为true时剔除该作业
  before_script:
    - echo "111"
  script:
    - npm install --registry=https://npm.dianchu.cc/repository/npm-all/
    - export BUILD_COMMAND="npm run build:pro"
    - echo $BUILD_TAG | grep -E ".*-alpha.*" && export BUILD_COMMAND="npm run build:sit"
    - $BUILD_COMMAND
    - curl -o ci-tool https://gitlab.dianchu.cc/DevOpsGroup/ci-common/raw/master/ci-tool?inline=false
    - chmod +x ci-tool && ./ci-tool run -g $GROUP -p $PROJECT_TYPE
  cache: # 缓存文件和目录，使得其他作业共用
    paths: - node_modules/
  tags: - rancher_docker # 指定 runner
  allow_failure: true # 作业失败时，流水线继续运行（默认false）

```

## 作业的复用

### extends

使用 extends 关键字 在多个作业中重用配置，类似于 YAML 锚点，但更简单。

- 支持多级继承，尽力避免使用三个以上级别的继承

简单使用

```yaml
.tests:
  rules:
    - if: $CI_PIPELINE_SOURCE == "push"

.rspec:
  extends: .tests
  script: rake rspec

rspec 1:
  variables:
    RSPEC_SUITE: '1'
  extends: .rspec
```

要从扩展内容中排除某个键，您必须将其分配给 null

```yaml
.base:
  script: test
  variables:
    VAR1: base var 1

test1:
  extends: .base
  variables:
    VAR1: test1 var 1
    VAR2: test2 var 2

test2:
  extends: .base
  variables:
    VAR2: test2 var 2

test3:
  extends: .base
  variables: {}

test4:
  extends: .base
  variables: null
```

合并配置

```yaml
test1:
  script: test
  variables:
    VAR1: test1 var 1
    VAR2: test2 var 2

test2:
  script: test
  variables:
    VAR1: base var 1
    VAR2: test2 var 2

test3:
  script: test
  variables:
    VAR1: base var 1

test4:
  script: test
  variables: null
```

### 锚点

[锚点官方说明](https://docs.gitlab.cn/jh/ci/yaml/yaml_optimization.html)

使用锚点在整个文档中复制内容，当有重复键时，最新包含的键优先，覆盖其他键。

- 只能复制当前文件的内容

```yaml
.server_deploy_base: &deploy_base # &设置锚点的名称（deploy_base）
  script:
    - sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
    - apk add curl --no-cache
    - curl --location --request POST 'https://dc-aeolus.dianchu.cc/api/hook/kubernetes/UpdateDeployment' --header 'authorization:'${AUTHORIZATION} --header 'Content-Type:text/plain' --data-raw '{"deployment_id":"'${DEPLOYMENT_ID}'","tag":"'$BUILD_TAG'"}'
  tags:
    - docker_npm

deploy_sit:
  <<: *deploy_base # 合并锚点到当前作业
  stage: deploy
  variables:
    AUTHORIZATION: $authorization_sit
    DEPLOYMENT_ID: $deployment_id_sit
  rules:
    - if: '$CI_COMMIT_TAG =~ /.*-alpha.*/'

deploy_uat:
  <<: *deploy_base
  stage: deploy
  variables:
    AUTHORIZATION: $authorization_uat
    DEPLOYMENT_ID: $deployment_id_uat
  rules:
    - if: '$CI_COMMIT_TAG =~ /.*-beta.*/'
```

### 脚本锚点

```yaml
.some-script-before: &some-script-before
  - echo "Execute this script first"

.some-script: &some-script
  - echo "Execute this script second"
  - echo "Execute this script too"

.some-script-after: &some-script-after
  - echo "Execute this script last"

job1:
  before_script:
    - *some-script-before
  script:
    - *some-script
    - echo "Execute something, for this job only"
  after_script:
    - *some-script-after

job2:
  script:
    - *some-script-before
    - *some-script
    - echo "Execute something else, for this job only"
    - *some-script-after
```
