
#!/bin/sh
DB_HOST="127.0.0.1"
DB_NAME="kwe"
OUT_DIR="/home/data/mongod/tmp" #临时备份目录
TAR_DIR="/home/data/mongod" #备份存放路径
DATE=$(date +%Y_%m_%d) #获取当前系统时间

echo "-----当前时间为$DATE-----"

DAYS=7 #DAYS=7代表删除7天前的备份，即只保留最近7天的备份
TAR_BAK="mongod_bak_$DATE.tar.gz" #最终保存的数据库备份文件名
cd $OUT_DIR

echo "-----删除原有备份文件-----"

find $OUT_DIR/ -print
mkdir -p $OUT_DIR/$DATE
rm -rf $OUT_DIR/*
mkdir -p $OUT_DIR/$DATE

echo "-----开始备份全部数据库-----"

mongodump -h $DB_HOST -o $OUT_DIR/$DATE #备份全部数据库，具体可以参照：  mongodump --help

echo "-----开始压缩备份文件-----"

tar -zcvf $TAR_DIR/$TAR_BAK $OUT_DIR/$DATE #压缩为.tar.gz格式

echo "-----删除7天前的备份文件-----"

find $TAR_DIR/ -mtime +$DAYS -delete #删除7天前的备份文件
