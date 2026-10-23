export default [
  {
    text: "📢项目公告",
    link: "/pages/project-suspended/",
  },
  {
    text: "📖安装文档",
    link: "/pages/install/",
    items: [
      {
        text: "立马上手安装",
        items: [
          { text: "一键安装", link: "/pages/fe28e9/" },
          { text: "下载安装", link: "/pages/db3065/" },
          { text: "容器安装", link: "/pages/820286/" },
          { text: "安装服务", link: "/pages/929085/" },
        ],
      },
      {
        text: "大版本升级",
        items: [
          {
            text: "v2.10.X迁移到v2.11.X指南",
            link: "/pages/upgrade/2.10.x-to-2.11.x/",
          },
          {
            text: "v2.9.X迁移到v2.10.X指南",
            link: "/pages/upgrade/2.9.x-to-2.10.x/",
          },
          {
            text: "v2.8.X迁移到v2.9.X指南",
            link: "/pages/upgrade/2.8.x-to-2.9.x/",
          },
          { text: "数据库迁移到 mysql", link: "/pages/db/4cfb46/" },
          { text: "数据库迁移到 mariadb", link: "/pages/db/5622b5/" },
          { text: "数据库迁移到 postgresql", link: "/pages/db/e59f84/" },
        ],
      },
      {
        text: "文档碎片",
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
      { text: "Oauth2平台登录", link: "/pages/oauth/898d2e/" },
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
    text: "❓常见问题",
    link: "/pages/FQA/",
    items: [
      { text: "名词解释", link: "/pages/FQA/proper-noun/" },
      { text: "账户相关", link: "/pages/FQA/839836/" },
      { text: "构建相关", link: "/pages/FQA/6a1f29/" },
      { text: "工作空间", link: "/pages/workspace/d3f985/" },
      { text: "权限说明", link: "/pages/permissions/ca90a5/" },
      { text: "资产说明", link: "/pages/350118/" },
    ],
  },
  {
    text: "💡DSL说明",
    link: "/pages/FQA/DSL/",
    items: [
      { text: "万能的 DSL 项目模板（Java）", link: "/pages/practice/4756ec/" },
      {
        text: "本地构建 + 自定义管理 python 项目",
        link: "/pages/practice/project-dsl-python/",
      },
      {
        text: "DSL 项目接口探活监控报警",
        link: "/pages/practice/610387/",
      },
      {
        text: "DSL 项目来管理 NGINX",
        link: "/pages/practice/dc2837/",
      },
    ],
  },
  {
    text: "💖开源周边",
    link: "/pages/shop/",
    items: [
      { text: "🔋赞赏支持💰", link: "/pages/praise/" },
      { text: "📑赞赏记录", link: "/pages/praise/publicity/" },
      { text: "🎁专属纪念品", link: "/pages/souvenir/" },
      { text: "💬社群讨论", link: "/pages/praise/join/" },
      { text: "💪🏻如何贡献", link: "/pages/dc18b8/" },
      { text: "👥贡献者们", link: "/pages/praise/friends/" },
      {
        text: " 🚩我们用户",
        link: "/pages/user/",
      },
      {
        text: "🤝企业服务",
        link: "/pages/enterprise-service/",
      },
    ],
  },

  {
    text: "📰更新记录",
    link: "/pages/changelog/new/",
    items: [
      {
        text: "发版日志",
        items: [
          { text: "稳定版本-release", link: "/pages/changelog/new/" },
          { text: "内测版本-beta", link: "/pages/changelog/new-beta/" },
        ],
      },
      {
        text: "下载中心",
        items: [
          { text: "稳定版本-release", link: "/pages/all-downloads/" },
          { text: "内测版本-beta", link: "/pages/all-beta-downloads/" },
        ],
      },
    ],
  },
  {
    text: "📦开源仓库",
    items: [
      { text: "Gitee", link: "https://gitee.com/dromara/Jpom" },
      { text: "Github", link: "https://github.com/dromara/Jpom" },
      { text: "Gitcode", link: "https://gitcode.com/dromara/Jpom/" },
    ],
  },
];
