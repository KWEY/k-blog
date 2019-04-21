#!/bin/bash
# 网站的根目录
WEB_PATH='/home/www/test'
 
echo "start deployment   test"
cd $WEB_PATH
echo "fetching from remote..."
# 为了避免冲突，强制更新本地文件
git pull
# git reset --hard origin/master
echo "done"
