#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 百度链接推送（HTTPS 接口，token 保持不变）
curl -sS -H 'Content-Type:text/plain' --data-binary @urls.txt "https://data.zz.baidu.com/urls?site=https://jpom.top&token=nsCuv521afD4tyA"

printf '\n'

rm -f urls.txt # 删除文件
