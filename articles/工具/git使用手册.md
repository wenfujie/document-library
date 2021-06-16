
## git基本操作

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
# 重新命名分支
git branch -m <old-branch-name> <new-branch-name>
```