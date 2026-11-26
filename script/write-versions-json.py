#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#
# Copyright (c) 2019 Of Him Code Technology Studio
# Jpom is licensed under Mulan PSL v2.
# You can use this software according to the terms and conditions of the Mulan PSL v2.
# You may obtain a copy of Mulan PSL v2 at:
# 			http://license.coscl.org.cn/MulanPSL2
# THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
# See the Mulan PSL v2 for more details.
#
"""
生成文档站的版本清单 JSON（release-versions.json / beta-versions.json / versions.json）

背景（2026-11 遗漏点修复）：
  - zip 发布包已进入下线窗口，在线升级地址以 tar.gz 为准；
  - Go 插件端有 5 个平台的安装包与升级容器，清单里必须给出各自地址，
    否则页面/客户端只能靠「从 Java 插件端地址推导同目录文件名」这一隐含约定。

结构约定（新增字段只增不改，旧客户端忽略即可）：
  agentUrl / serverUrl            Java 插件端与服务端在线升级包（tar.gz；--online-ext zip 时仍为 zip）
  agentZipUrl / serverZipUrl      过渡期 zip 兼容包地址（--legacy-zip true 且主地址不是 zip 时出现）
  goAgentUrls                     Go 插件端安装包，key 为平台 os/arch（与 go-agent 版本清单一致）
  goUpgradeUrls                   Go 插件端在线升级容器，key 同上
  auth.agentUrl / auth.serverUrl / auth.goAgentUrls / auth.goUpgradeUrls
                                  带 {token} 占位的国内 CDN 地址（客户端用 JPOM_REMOTE_VERSION_AUTH 替换）

用法：
  python3 script/write-versions-json.py --file docs/.vuepress/public/docs/release-versions.json \
      --channel release --version 2.11.15.4 [--online-ext tar.gz|zip] [--legacy-zip true|false] [--profile full|min]
"""
import argparse
import json

PLATFORMS = ["linux/amd64", "linux/arm64", "darwin/amd64", "darwin/arm64", "windows/amd64"]
D2_BASE = "https://d2.jpom.download"
AUTH_BASE = "https://download.jpom.top"
DOWNLOAD_PAGE = "https://jpom.top/pages/all-downloads/"
CHANGELOG_RELEASE = "https://gitee.com/dromara/Jpom/raw/master/CHANGELOG.md"
CHANGELOG_BETA = "https://gitee.com/dromara/Jpom/raw/beta/CHANGELOG-BETA.md"
VERSIONS_URL = "https://jpom.top/docs/{channel}-versions.json"


def platform_file_name(platform):
    """linux/amd64 -> linux-amd64（下载中心文件名用连字符）"""
    return platform.replace("/", "-")


def build(channel, version, online_ext, legacy_zip, profile):
    prefix = f"{D2_BASE}/{channel}/{version}"
    auth_prefix = f"{AUTH_BASE}/{channel}/{version}"
    agent_url = f"{prefix}/agent-{version}-release.{online_ext}"
    server_url = f"{prefix}/server-{version}-release.{online_ext}"
    go_agent = {p: f"{prefix}/agent-go-{version}-release-{platform_file_name(p)}.tar.gz" for p in PLATFORMS}
    go_upgrade = {p: f"{prefix}/agent-go-{version}-upgrade-{platform_file_name(p)}.jar" for p in PLATFORMS}

    data = {}
    if profile == "full":
        data["url"] = VERSIONS_URL.format(channel=channel)
    data["tag_name"] = f"v{version}"
    data["tagName"] = f"v{version}"
    data["agentUrl"] = agent_url
    data["serverUrl"] = server_url
    # 过渡期兼容包：主地址已切 tar.gz 时仍给出 zip 地址，供下载页/旧客户端说明使用
    if legacy_zip and online_ext != "zip":
        data["agentZipUrl"] = f"{prefix}/agent-{version}-release.zip"
        data["serverZipUrl"] = f"{prefix}/server-{version}-release.zip"
    data["goAgentUrls"] = go_agent
    data["goUpgradeUrls"] = go_upgrade
    data["changelogUrl"] = CHANGELOG_RELEASE if channel == "release" else CHANGELOG_BETA
    if profile == "full":
        data["downloadUrl"] = DOWNLOAD_PAGE
        data["downloadSource"] = "cloudflare"
        auth = {
            "agentUrl": f"{auth_prefix}/agent-{version}-release.{online_ext}?token={{token}}",
            "serverUrl": f"{auth_prefix}/server-{version}-release.{online_ext}?token={{token}}",
            "goAgentUrls": {p: f"{auth_prefix}/agent-go-{version}-release-{platform_file_name(p)}.tar.gz?token={{token}}" for p in PLATFORMS},
            "goUpgradeUrls": {p: f"{auth_prefix}/agent-go-{version}-upgrade-{platform_file_name(p)}.jar?token={{token}}" for p in PLATFORMS},
            "downloadSource": "cn-cdn",
        }
        if legacy_zip and online_ext != "zip":
            auth["agentZipUrl"] = f"{auth_prefix}/agent-{version}-release.zip?token={{token}}"
            auth["serverZipUrl"] = f"{auth_prefix}/server-{version}-release.zip?token={{token}}"
        data["auth"] = auth
    return data


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--file", required=True)
    parser.add_argument("--channel", required=True, choices=["release", "beta"])
    parser.add_argument("--version", required=True)
    parser.add_argument("--online-ext", default="tar.gz", choices=["tar.gz", "zip"])
    parser.add_argument("--legacy-zip", default="true", choices=["true", "false"])
    parser.add_argument("--profile", default="full", choices=["full", "min"])
    args = parser.parse_args()

    version = args.version.lstrip("v")
    data = build(args.channel, version, args.online_ext, args.legacy_zip == "true", args.profile)
    with open(args.file, "w", encoding="utf-8") as handler:
        json.dump(data, handler, indent=2, ensure_ascii=False)
        handler.write("\n")
    print(f"[write-versions-json] {args.file} <- {args.channel} {version} "
          f"(online_ext={args.online_ext}, legacy_zip={args.legacy_zip}, profile={args.profile})")


if __name__ == "__main__":
    main()
