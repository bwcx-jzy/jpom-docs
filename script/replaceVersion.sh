#!/bin/bash
#
# Copyright (c) 2019 Of Him Code Technology Studio
# Jpom is licensed under Mulan PSL v2.
# You can use this software according to the terms and conditions of the Mulan PSL v2.
# You may obtain a copy of Mulan PSL v2 at:
# 			http://license.coscl.org.cn/MulanPSL2
# THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
# INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
# See the Mulan PSL v2 for more details.
#

#-----------------------------------------------------------
# 此脚本用于每次升级时替换相应位置的版本号，并生成下载页条目
#
# 用法：
#   sh script/replaceVersion.sh <version> <release|beta>
#
# 可选环境变量：
#   JPOM_LEGACY_ZIP              是否在下载页同时生成 zip 链接（过渡期默认 true；过渡窗口结束后设 false）
#   JPOM_ONLINE_UPGRADE_EXT      在线升级 URL 的后缀：zip（默认，过渡期）| tar.gz（过渡窗口结束后）
#-----------------------------------------------------------

set -o errexit

current_path=$(pwd)
case "$(uname)" in
Linux)
	bin_abs_path=$(readlink -f "$(dirname "$0")")
	;;
*)
	bin_abs_path=$(
		cd "$(dirname "$0")" || exit
		pwd
	)
	;;
esac

pwd=${bin_abs_path}/../

echo "当前路径：${current_path},脚本路径：${bin_abs_path}"

use_tag=""

if [ "$2" = "release" ]; then
	use_tag="release"
elif [ "$2" = "beta" ]; then
	use_tag="beta"
else
	echo "不支持的模式 $2"
	exit 1
fi

new_version="$1"
if [ -z "$new_version" ]; then
	echo "ERROR: 请指定新版本！"
	exit 1
fi

tag_file="${pwd}/docs/.vuepress/public/docs/versions.${use_tag}.tag"
old_version=$(cat "${tag_file}")
echo "${old_version} 替换为新版本 ${new_version}"

if [ -z "$old_version" ]; then
	echo "ERROR: 旧版本不存在，请确认 ${tag_file} 中信息正确"
	exit 1
fi

legacy_zip="${JPOM_LEGACY_ZIP:-true}"
case "$legacy_zip" in
true | false) ;;
*)
	echo "ERROR: JPOM_LEGACY_ZIP 只支持 true|false，当前：${legacy_zip}"
	exit 1
	;;
esac

online_ext="${JPOM_ONLINE_UPGRADE_EXT:-zip}"
case "$online_ext" in
zip | tar.gz) ;;
*)
	echo "ERROR: JPOM_ONLINE_UPGRADE_EXT 只支持 zip|tar.gz，当前：${online_ext}"
	exit 1
	;;
esac

# sed 替换后立即删除 .bak，避免被误提交
replace_in_file() {
	local file=$1
	local old=$2
	local new=$3
	sed -i.bak "s/${old}/${new}/g" "${file}"
	rm -f "${file}.bak"
}

downloads=""
json_files=()
if [ "$use_tag" = "release" ]; then
	replace_in_file "${pwd}/docs/.vuepress/public/docs/versions.json" "${old_version}" "${new_version}"
	replace_in_file "${pwd}/docs/.vuepress/public/docs/release-versions.json" "${old_version}" "${new_version}"
	replace_in_file "${pwd}/package.json" "${old_version}" "${new_version}"
	replace_in_file "${pwd}/docs/.vuepress/public/docs/versions.show" "${old_version}" "${new_version}"
	replace_in_file "${pwd}/docs/.vuepress/public/assets/js/common.js" "${old_version}" "${new_version}"
	downloads="01.下载链接.md"
	json_files=(
		"${pwd}/docs/.vuepress/public/docs/versions.json"
		"${pwd}/docs/.vuepress/public/docs/release-versions.json"
	)
else
	replace_in_file "${pwd}/docs/.vuepress/public/docs/beta-versions.json" "${old_version}" "${new_version}"
	downloads="02.下载链接beta.md"
	json_files=(
		"${pwd}/docs/.vuepress/public/docs/beta-versions.json"
	)
fi

# 在线升级 URL 默认仍指向 zip（兼容旧客户端）；过渡窗口结束后切换为 tar.gz
if [ "$online_ext" != "zip" ]; then
	for file in "${json_files[@]}"; do
		sed -i.bak "s/-release\.zip/-release.${online_ext}/g" "${file}"
		rm -f "${file}.bak"
	done
fi

d2_base="https://d2.jpom.download/${use_tag}/${new_version}"

updateDocUrlItem() {
	local version=$1
	local md_path="${pwd}/docs/日志&下载/02.下载链接/${downloads}"

	if grep -qF "## ${version}-${use_tag}" "${md_path}"; then
		echo "下载地址已经更新啦"
		return 0
	fi

	local tmp_log="${pwd}/temp-docs.log"
	{
		echo "## ${version}-${use_tag}"
		echo
		echo "- [server-${version}-release.tar.gz](${d2_base}/server-${version}-release.tar.gz) | [sha1sum](${d2_base}/server-${version}-release.tar.gz.sha1)"
		echo "- [agent-${version}-release.tar.gz](${d2_base}/agent-${version}-release.tar.gz) | [sha1sum](${d2_base}/agent-${version}-release.tar.gz.sha1)"
		if [ "$legacy_zip" = "true" ]; then
			echo "- [server-${version}-release.zip](${d2_base}/server-${version}-release.zip) | [sha1sum](${d2_base}/server-${version}-release.zip.sha1)（过渡期兼容包，仅用于旧版本在线升级）"
			echo "- [agent-${version}-release.zip](${d2_base}/agent-${version}-release.zip) | [sha1sum](${d2_base}/agent-${version}-release.zip.sha1)（过渡期兼容包，仅用于旧版本在线升级）"
		fi
		echo
		echo "**Go 插件端（可选，单二进制免 JDK；按目标平台下载对应 tar.gz 包）**"
		echo
		local platform
		for platform in linux-amd64 linux-arm64 darwin-amd64 darwin-arm64 windows-amd64; do
			echo "- [agent-go-${version}-release-${platform}.tar.gz](${d2_base}/agent-go-${version}-release-${platform}.tar.gz) | [sha1sum](${d2_base}/agent-go-${version}-release-${platform}.tar.gz.sha1)"
		done
		echo
		echo "**Go 插件端在线升级容器（按节点平台选择，平台必须匹配）**"
		echo
		for platform in linux-amd64 linux-arm64 darwin-amd64 darwin-arm64 windows-amd64; do
			echo "- [agent-go-${version}-upgrade-${platform}.jar](${d2_base}/agent-go-${version}-upgrade-${platform}.jar) | [sha1sum](${d2_base}/agent-go-${version}-upgrade-${platform}.jar.sha1)"
		done
		echo
		echo "--------"
		echo
	} >"${tmp_log}"

	# 插入到第一个版本标题（## x.y.z）之前，避免页面新增提示块后固定行号失效
	python3 - "${md_path}" "${tmp_log}" <<'PY'
import sys

md_path, block_path = sys.argv[1], sys.argv[2]
lines = open(md_path, encoding="utf-8").read().splitlines(keepends=True)
block = open(block_path, encoding="utf-8").read()
for index, line in enumerate(lines):
    if line.startswith("## "):
        lines.insert(index, block)
        break
else:
    lines.append(block)
open(md_path, "w", encoding="utf-8").write("".join(lines))
PY
	rm -f "${tmp_log}"
}

updateDocUrlItem "${new_version}"

echo "${new_version}" >"${tag_file}"
echo "完成：${new_version}（下载页 ${downloads}，legacy_zip=${legacy_zip}，online_ext=${online_ext}）"
