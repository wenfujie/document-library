<!--
 * @Date: 2021-06-16 17:11:17
 * @LastEditors: wfj
 * @LastEditTime: 2023-02
 * @FilePath: /document-library/articles/工具/git使用手册.md
-->

## git 基本操作

### code revert

```bash
# 查看 commit 记录
git log

# 撤回某次 commit（若非当前分支的commit需加 -m）
git revert commit_id

# 撤回几个连续的 commit（..语法，左开右闭即：不含commit_id1包含commit_id2）
git revert --no-commit commit_id1..commit_id2

# 回滚到指定 commit 代码
git reset --hard commit_id # HEAD 就会指向该 commit_id（若要取消，直接拉取远程即可）
git push origin HEAD --force

```

> HEAD 可指代当前分支最新的 commit_id，撤回最新的提交：git revert HEAD

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

# 删除最新的stash
git stash drop

# 删除指定的stash
git stash drop stash@{0}

# 删除所有stash
git stash clear
```
