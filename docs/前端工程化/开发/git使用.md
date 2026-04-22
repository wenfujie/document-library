<!--
 * @Date: 2021-06-16 17:11:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2026-01-06 11:31:37
-->

- [实操](#实操)
  - [撤销 git pull](#撤销-git-pull)
- [git 指令](#git-指令)
  - [【git reset】回滚代码并删除 commit 记录](#git-reset回滚代码并删除-commit-记录)
  - [【git revert】 回滚代码不删除 commit 记录](#git-revert-回滚代码不删除-commit-记录)
  - [【git rebase -i】删除单个/多个 commit](#git-rebase--i删除单个多个-commit)
  - [合并代码冲突处理](#合并代码冲突处理)
  - [git add](#git-add)
  - [git commit](#git-commit)
  - [git pull](#git-pull)
  - [git branch](#git-branch)
  - [git stash](#git-stash)
  - [git worktree](#git-worktree)

## 实操

### 撤销 git pull

```bash
# 查看历史变更记录
git reflog

# 回滚到拉取前
git reset --hard 2aee3f
```

## git 指令

> HEAD 指代当前分支最新的 commit_id

### 【git reset】回滚代码并删除 commit 记录

git reset 可将代码回滚到指定的 commit ，期间所有 commit 记录都被删除

其中 --soft 可将回滚的代码恢复到暂存区，以供修改

```bash
git reset --soft commit_id # 本地回退
git push origin HEAD --force # 同步到远程

# 取消回退  git reset --soft 最新commit_id（去网页查看）
```

其中 --hard 表示回滚代码在本地为已提交状态，代码不可编辑

```bash
git reset --hard commit_id # 本地回退
git push origin HEAD --force # 同步到远程

# 取消回退 git push origin [当前分支名]
```

### 【git revert】 回滚代码不删除 commit 记录

git revert 是用一次新的 commit 来回滚之前的 commit ，旧的提交记录仍会保留。

```bash
# 查看 commit 记录
git log

# 撤回最新的提交
git revert HEAD

# 撤回某次 commit（若非当前分支的commit需加 -m）
git revert commit_id

# 撤回几个连续的 commit（..语法，左开右闭即：不含commit_id1包含commit_id2）
git revert --no-commit commit_id1..commit_id2
```

### 【git rebase -i】删除单个/多个 commit

找到要删除 commit 的上一个 commit_id，然后执行如下命令：

```bash
git rebase -i commit_id
```

会进入 `vi/vim` 编辑器，输入 `i` 进入编辑模式，将要删除的 commit_id 前的 `pick` 修改为 `drop` ，按 `esc` 退出编辑模式，输入 `:wq` 保存此时本地已完成删除，再执行如下命令推送到远程即可

```bash
git push --force # 提交到远程
```

### 合并代码冲突处理

```bash
git reset --hard HEAD
```

### git add

```bash
  # 添加某个文件到暂存区，后面可以跟多个文件，以空格区分
  git add xxx
  # 添加当前更改的所有文件到暂存区。
  git add .
```

### git commit

```bash
# 提交暂存的更改，会新开编辑器进行编辑
git commit
# 提交暂存的更改，并记录下备注
git commit -m "you message"
# 等同于 git add . && git commit -m
git commit -am
# 对最近一次的提交的信息进行修改,此操作会修改commit的hash值
git commit --amend
```

### git pull

```bash
# 从远程仓库拉取代码并合并到本地，等同于git fetch && git merge
git pull
```

### git branch

```bash
# 新建本地分支，但不切换
git branch <branch-name>
# 查看本地分支
git branch
# 查看远程分支
git branch -r
# 查看本地和远程分支
git branch -a
# 删除本地分支
git branch -D <branch-nane>
# 删除远程分支
git push origin :<branch-nane>
# 重新命名分支
git branch -m <old-branch-name> <new-branch-name>
# 更新远程分支列表
git remote update origin -p
```

### git stash

`git stash ` 能把所有未提交的代码都保存起来，并把当前工作目录恢复至未修改的干净状态。

```bash
# 储存代码指令 "test-cmd-stash" 用于记录版本
$ git stash save "test-cmd-stash"

# 查看储存记录
git stash list
# 打印结果
# stash@{0}: WIP on master: 049d078 added the index file
# stash@{1}: WIP on master: c264051 Revert "added file_size"

# 恢复最新存储代码
git stash apply

# 恢复最新存储代码，并将该存储记录删除
git stash pop

# 恢复指定的stash
git stash apply stash@{1}

# 删除最新的stash
git stash drop

# 删除指定的stash
git stash drop stash@{0}

# 删除所有stash
git stash clear
```

### git worktree

允许一个仓库有多个工作目录，每个工作目录都对应一个分支，解决多分支同时开发问题。

**注意**

- 工作目录建议放在与项目同级，避免嵌套
- 一个分支只能被一个工作目录使用，否则报错
- 删除主仓库，所有工作目录失效

```bash

# 查看工作目录
git worktree list

# 基于已有分支创建工作目录
git worktree add ../<目录名> <分支名>

# 基于新分支创建工作目录
git worktree add -b <新分支名> ../<目录名> [起点分支/提交]

# 删除工作目录
git worktree remove ../<目录名>

# 强制删除（含未提交修改）
git worktree remove -f ../<目录名>

# 亦可手动删除工作目录，并执行命令清除记录，否则记录仍然保留
git worktree prune


```
