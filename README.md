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
- 项目状态：Jpom 已于 2026-02-05 暂停维护，详见 <https://jpom.top/pages/project-suspended/>。

> `.github/workflows/ali-oss.yml` 仅保留为手动触发的回退方案，已停用自动同步。

## 生成补丁文件

### 到对应仓库修改代码

### 执行 命令

```shell
git diff > log.patch
```

### 将 log.patch 放到本项目

修改 log.patch 

- /vdoing/ -> /node_modules/vuepress-theme-vdoing/
