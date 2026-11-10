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
# CI 专用：更新 Jpom 文档站版本号、在线升级 JSON、下载页与更新日志
#
# 用法（在 jpom-docs 仓库根目录执行）：
#   bash script/release-docs-ci.sh --version 2.11.14 --channel release \
#     [--changelog-file /path/to/CHANGELOG.md] [--legacy-zip] [--no-legacy-zip] [--online-ext tar.gz]
#
# 说明：
#   - 默认 JPOM_LEGACY_ZIP=true（过渡期下载页同时列 zip），JPOM_ONLINE_UPGRADE_EXT=zip；
#     过渡窗口结束后传 --no-legacy-zip --online-ext tar.gz。
#   - --changelog-file 从 Jpom 的 CHANGELOG.md/CHANGELOG-BETA.md 提取对应段落到文档站更新日志页；
#     找不到段落时只警告，不阻塞。
#   - 只修改文件，不 commit/push（由 CI 工作流或发布脚本负责提交）。
#-----------------------------------------------------------

set -euo pipefail

script_dir=$(cd "$(dirname "$0")" && pwd)
repo_dir=$(cd "${script_dir}/.." && pwd)
cd "${repo_dir}"

version=""
channel="release"
changelog_file=""
legacy_zip="true"
online_ext="zip"

while [ $# -gt 0 ]; do
	case "$1" in
	--version)
		version="${2:?}"
		shift 2
		;;
	--channel)
		channel="${2:?}"
		shift 2
		;;
	--changelog-file)
		changelog_file="${2:?}"
		shift 2
		;;
	--legacy-zip)
		legacy_zip="true"
		shift
		;;
	--no-legacy-zip)
		legacy_zip="false"
		shift
		;;
	--online-ext)
		online_ext="${2:?}"
		shift 2
		;;
	-h | --help)
		sed -n '/^# 用法/,/^#---/p' "$0" | sed 's/^# \{0,1\}//'
		exit 0
		;;
	*)
		echo "ERROR: 不支持的参数 $1" >&2
		exit 2
		;;
	esac
done

[ -n "${version}" ] || {
	echo "ERROR: 必须指定 --version" >&2
	exit 2
}
case "${channel}" in
release | beta) ;;
*)
	echo "ERROR: --channel 只支持 release|beta" >&2
	exit 2
	;;
esac
case "${online_ext}" in
zip | tar.gz) ;;
*)
	echo "ERROR: --online-ext 只支持 zip|tar.gz" >&2
	exit 2
	;;
esac

export JPOM_LEGACY_ZIP="${legacy_zip}"
export JPOM_ONLINE_UPGRADE_EXT="${online_ext}"

echo "[release-docs-ci] 更新文档站版本：${version}（${channel}, legacy_zip=${legacy_zip}, online_ext=${online_ext}）"
bash script/replaceVersion.sh "${version}" "${channel}"

if [ -z "${changelog_file}" ]; then
	echo "[release-docs-ci][WARN] 未指定 --changelog-file，跳过更新日志同步" >&2
elif [ ! -s "${changelog_file}" ]; then
	echo "[release-docs-ci][WARN] changelog 文件不存在，跳过更新日志同步：${changelog_file}" >&2
else
	if [ "${channel}" = "release" ]; then
		docs_changelog="docs/日志&下载/01.更新日志/01.最新.md"
		heading="## ${version}-release"
	else
		docs_changelog="docs/日志&下载/01.更新日志/02.最新beta.md"
		heading="## ${version}-beta"
	fi
	python3 - "${changelog_file}" "${docs_changelog}" "${heading}" <<'PY'
import sys

source, target, heading = sys.argv[1:4]
lines = open(source, encoding="utf-8").read().splitlines(keepends=True)
index = next((i for i, line in enumerate(lines) if line.startswith(heading)), None)
if index is None:
    print("[release-docs-ci][WARN] 源 CHANGELOG 中未找到段落：%s" % heading, file=sys.stderr)
    sys.exit(0)
end = len(lines)
for i in range(index + 1, len(lines)):
    if lines[i].startswith("## "):
        end = i
        break
section = "".join(lines[index:end]).rstrip() + "\n\n"

target_lines = open(target, encoding="utf-8").read().splitlines(keepends=True)
if any(line.startswith(heading) for line in target_lines):
    print("[release-docs-ci] 更新日志已存在，跳过：%s" % heading)
    sys.exit(0)
for i, line in enumerate(target_lines):
    if line.startswith("## "):
        target_lines.insert(i, section)
        break
else:
    target_lines.append(section)
open(target, "w", encoding="utf-8").write("".join(target_lines))
print("[release-docs-ci] 已同步更新日志段落：%s -> %s" % (heading, target))
PY
fi

echo "[release-docs-ci] 变更文件："
git status --short
echo "[release-docs-ci] 完成（未提交，请由工作流/发布脚本提交并推送 main）"
