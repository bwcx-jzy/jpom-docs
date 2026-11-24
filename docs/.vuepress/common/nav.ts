/**
 * 顶部导航
 *
 * 结构原则：
 * 1. 一级菜单控制在 7 个以内（4 字短标签），保证 1280px 及以下的笔记本屏幕不会横向溢出；
 * 2. 同类内容收进下拉分组（每组带标题），重要入口（快速上手 / 安装部署 / 实践案例 / DSL / 常见问题）仍保留一级直达链接；
 * 3. 公告、发版日志、下载中心合并为「更新公告」，开源周边与仓库合并为「社区支持」，避免一级菜单过长。
 */
export default [
  {
    text: "🚀快速上手",
    link: "/pages/quickstart/",
    items: [
      {
        text: "新手路线",
        items: [
          { text: "十分钟上手（图文）", link: "/pages/quickstart/" },
          { text: "菜单地图与路径速查", link: "/pages/menu-map/" },
        ],
      },
      {
        text: "先看演示",
        items: [
          { text: "在线演示系统（免安装体验）", link: "/pages/2e4ffc/" },
        ],
      },
      {
        text: "典型操作（图文）",
        items: [
          { text: "节点项目：新增与启停", link: "/pages/b3e508/" },
          { text: "节点脚本：定时任务", link: "/pages/8a95bf/" },
          { text: "节点分发：多节点发布", link: "/pages/e35370/" },
          { text: "日志搜索：集中查日志", link: "/pages/c5cbe6/" },
          { text: "在线构建：仓库到发布", link: "/pages/build-guide/" },
          { text: "监控与告警", link: "/pages/monitor-guide/" },
        ],
      },
    ],
  },
  {
    text: "📖安装部署",
    link: "/pages/install/",
    items: [
      {
        text: "立马上手安装",
        items: [
          { text: "一键安装", link: "/pages/fe28e9/" },
          { text: "下载安装", link: "/pages/db3065/" },
          { text: "容器安装", link: "/pages/820286/" },
          { text: "安装服务", link: "/pages/929085/" },
          { text: "Go 插件端（安装/切换/升级）", link: "/pages/go-agent/install/" },
        ],
      },
      {
        text: "大版本升级",
        items: [
          { text: "v2.10.X 迁移到 v2.11.X", link: "/pages/upgrade/2.10.x-to-2.11.x/" },
          { text: "v2.9.X 迁移到 v2.10.X", link: "/pages/upgrade/2.9.x-to-2.10.x/" },
          { text: "v2.8.X 迁移到 v2.9.X", link: "/pages/upgrade/2.8.x-to-2.9.x/" },
        ],
      },
      {
        text: "数据迁移",
        items: [
          { text: "数据库迁移到 mysql", link: "/pages/db/4cfb46/" },
          { text: "数据库迁移到 mariadb", link: "/pages/db/5622b5/" },
          { text: "数据库迁移到 postgresql", link: "/pages/db/e59f84/" },
        ],
      },
      {
        text: "文档检索",
        items: [
          { text: "分类", link: "/categories/" },
          { text: "标签", link: "/tags/" },
          { text: "归档", link: "/archives/" },
        ],
      },
    ],
  },
  {
    text: "🔥实践案例",
    link: "/pages/practice/",
    items: [
      { text: "实践案例目录", link: "/pages/practice/catalogue/" },
      { text: "Oauth2 平台登录", link: "/pages/oauth/898d2e/" },
      {
        text: "安装实践",
        items: [
          { text: "一键安装教程", link: "/pages/practice/15b7a2/" },
          { text: "Docker 容器安装教程", link: "/pages/practice/c846d3/" },
          { text: "离线安装教程", link: "/pages/practice/af288b/" },
        ],
      },
      {
        text: "通用教程",
        items: [
          { text: "Jpom 为 Jpom 发版", link: "/pages/practice/build-jpom/" },
          { text: "自定义第三方通知", link: "/pages/practice/ea3667/" },
          { text: "DSL 项目来管理 NGINX", link: "/pages/practice/dc2837/" },
          { text: "管理证书文件", link: "/pages/practice/jpom-server-cert-manage/" },
        ],
      },
    ],
  },
  {
    text: "💡DSL说明",
    link: "/pages/FQA/DSL/",
    items: [
      {
        text: "DSL 入门与场景",
        items: [
          { text: "DSL 是什么、能做什么", link: "/pages/FQA/DSL/" },
          { text: "配置字段详解（YAML）", link: "/pages/dsl-config/" },
          { text: "常见问题与排查", link: "/pages/9c85bc/" },
        ],
      },
      {
        text: "配置示例",
        items: [
          { text: "管理 Java 项目（含 JDK 版本）", link: "/pages/519020/" },
          { text: "管理 Python 项目", link: "/pages/eb9c6e/" },
          { text: "容器构建的 DSL", link: "/pages/5020f7/" },
        ],
      },
      {
        text: "实践案例（当前写法）",
        items: [
          { text: "DSL 管理 NGINX", link: "/pages/practice/dc2837/" },
          { text: "DSL 接口探活监控报警", link: "/pages/practice/610387/" },
          { text: "DSL 管理 Tomcat", link: "/pages/practice/dc2836/" },
          { text: "DSL 管理 Elasticsearch", link: "/pages/practice/8017a2/" },
        ],
      },
      {
        text: "老版本写法（2.9 及以前）",
        items: [
          { text: "万能的 DSL 项目模板（Java）", link: "/pages/practice/4756ec/" },
          { text: "自定义管理 python 项目", link: "/pages/practice/project-dsl-python/" },
          { text: "接口探活（旧写法）", link: "/pages/practice/ac7b66/" },
        ],
      },
    ],
  },
  {
    text: "❓常见问题",
    link: "/pages/FQA/",
    items: [
      {
        text: "问题合集",
        items: [
          { text: "问题合集（总览）", link: "/pages/FQA/" },
          { text: "更多问题", link: "/pages/FQA/fa9335/" },
        ],
      },
      {
        text: "按主题查",
        items: [
          { text: "名词解释", link: "/pages/FQA/proper-noun/" },
          { text: "账户相关", link: "/pages/FQA/839836/" },
          { text: "构建相关", link: "/pages/FQA/6a1f29/" },
          { text: "工作空间", link: "/pages/workspace/d3f985/" },
          { text: "权限说明", link: "/pages/permissions/ca90a5/" },
          { text: "资产说明", link: "/pages/350118/" },
        ],
      },
    ],
  },
  {
    text: "💖社区支持",
    link: "/pages/shop/",
    items: [
      {
        text: "支持项目",
        items: [
          { text: "🔋赞赏支持💰", link: "/pages/praise/" },
          { text: "📑赞赏记录", link: "/pages/praise/publicity/" },
          { text: "🎁专属纪念品", link: "/pages/souvenir/" },
          { text: "💬社群讨论", link: "/pages/praise/join/" },
        ],
      },
      {
        text: "参与共建",
        items: [
          { text: "💪🏻如何贡献", link: "/pages/dc18b8/" },
          { text: "👥贡献者们", link: "/pages/praise/friends/" },
          { text: "🚩我们用户", link: "/pages/user/" },
          { text: "🤝企业服务", link: "/pages/enterprise-service/" },
        ],
      },
      {
        text: "开源仓库",
        items: [
          { text: "Gitee", link: "https://gitee.com/dromara/Jpom" },
          { text: "Github", link: "https://github.com/dromara/Jpom" },
          { text: "Gitcode", link: "https://gitcode.com/dromara/Jpom/" },
        ],
      },
    ],
  },
  {
    text: "📣更新公告",
    link: "/pages/changelog/new/",
    items: [
      {
        text: "项目公告",
        items: [
          { text: "🛡️安全公告", link: "/pages/security/" },
          { text: "2.11.13 安全修复公告", link: "/pages/security/2.11.13/" },
          { text: "📢项目维护状态公告", link: "/pages/project-suspended/" },
        ],
      },
      {
        text: "发版日志",
        items: [
          { text: "稳定版本 release", link: "/pages/changelog/new/" },
          { text: "内测版本 beta", link: "/pages/changelog/new-beta/" },
        ],
      },
      {
        text: "下载中心",
        items: [
          { text: "稳定版本 release", link: "/pages/all-downloads/" },
          { text: "内测版本 beta", link: "/pages/all-beta-downloads/" },
        ],
      },
    ],
  },
];
