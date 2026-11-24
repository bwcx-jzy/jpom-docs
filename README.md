# Jpom 文档 

[https://jpom.top](https://jpom.top)

使用 [Vdoing](https://github.com/xugaoyi/vuepress-theme-vdoing)

相关插件：[Kele-Bingtang](https://github.com/Kele-Bingtang/Kele-Bingtang.github.io)

## 本地开发与构建

```shell
npm install
npm run ldev     # 本地开发，默认端口 2216
npm run lbuild   # 构建到 dist/
```

## 站点与部署

- 线上站点：<https://jpom.top>，由 GitHub Pages 托管；自定义域名以 `docs/.vuepress/public/CNAME` 为准（构建后进入 `dist/CNAME`）。
- 发布流程：push 到 `main` 后，`.github/workflows/deploy.yml` 自动构建并推送到 `dist` 分支，GitHub Pages 再从 `dist` 分支发布。
- 下载中心：已迁移至 Cloudflare R2（<https://d2.jpom.download>）。
- 项目状态：Jpom 于 2026-02-05 暂停常规功能迭代；2026-11-02 起暂时继续使用 AI 开发、继续维持更新（安全优先、BUG 其次、其他功能按反馈与评估），详见 <https://jpom.top/pages/project-suspended/>。

> 历史 OSS 回退工作流（`ali-oss.yml`）及其 `Refresh.py`、`cdn-urllist.txt` 已随阿里云 OSS 停用一并删除；文档站只通过 GitHub Pages 发布。

## 生成补丁文件

### 到对应仓库修改代码

### 执行 命令

```shell
git diff > log.patch
```

### 将 log.patch 放到本项目

修改 log.patch 

- /vdoing/ -> /node_modules/vuepress-theme-vdoing/
