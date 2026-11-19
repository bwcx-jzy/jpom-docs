import { HeadTags } from "vuepress/config";
import baidutj from "../common/baidutj.js";

/**
 * 说明：
 *   - description / canonical / og:* / twitter:* 已交由 ./seo.ts 本地插件按页面生成，
 *     这里只保留全站固定标签，避免出现「全站共用一条描述」和重复标签。
 *   - 结构化数据（JSON-LD）用于让搜索引擎识别品牌、站点与软件本体。
 */

const HOST = "https://jpom.top";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${HOST}/#organization`,
      name: "Jpom",
      alternateName: "Jpom 项目运维管理系统",
      url: `${HOST}/`,
      logo: {
        "@type": "ImageObject",
        url: `${HOST}/images/logo/jpom_logo_big.svg`,
      },
      sameAs: [
        "https://gitee.com/dromara/Jpom",
        "https://github.com/dromara/Jpom",
        "https://gitcode.com/dromara/Jpom",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${HOST}/#website`,
      url: `${HOST}/`,
      name: "Jpom项目运维",
      inLanguage: "zh-CN",
      publisher: { "@id": `${HOST}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${HOST}/#software`,
      name: "Jpom",
      alternateName: "Jpom 项目运维管理系统",
      applicationCategory: "DeveloperApplication",
      applicationSubCategory: "CI/CD、自动部署、运维监控",
      operatingSystem: "Linux, Windows, macOS",
      url: `${HOST}/`,
      downloadUrl: `${HOST}/pages/all-downloads/`,
      description:
        "Jpom 是一款简而轻的低侵入式在线构建、自动部署、日常运维、项目监控软件，支持节点管理、SSH 终端、在线构建、定时脚本、Docker 管理与项目监控告警。",
      license: "https://license.coscl.org.cn/MulanPSL2",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      sameAs: [
        "https://gitee.com/dromara/Jpom",
        "https://github.com/dromara/Jpom",
      ],
    },
  ],
};

// JSON-LD 内不能出现裸 < 字符，避免提前闭合 script
const jsonLdScript = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

// head
export default <HeadTags>[
  ["link", { rel: "icon", href: "/favicon.ico" }], // favicons，资源放在public文件夹
  ["link", { rel: "shortcut icon", href: "/favicon.ico" }],
  ["link", { rel: "apple-touch-icon", href: "/favicon.ico" }],
  [
    "meta",
    {
      name: "keywords",
      content:
        "Jpom,Jpom官网,Jpom文档,开源,管理系统,运维,项目运维,服务器运维,原生 ops,CI/CD,devops,自动部署,在线构建,项目管理系统,open source",
    },
  ],
  ["meta", { name: "author", content: "Jpom" }],
  ["meta", { name: "theme-color", content: "#11a8cd" }], // 移动浏览器主题颜色
  // 解决 Chrome 网站统计不准确问题
  ["meta", { name: "referrer", content: "no-referrer-when-downgrade" }],
  // 结构化数据：Organization / WebSite / SoftwareApplication
  ["script", { type: "application/ld+json" }, jsonLdScript],
  // 阿里在线矢量库
  [
    "link",
    {
      rel: "stylesheet",
      href: "//at.alicdn.com/t/font_3114978_qe0b39no76.css",
    },
  ],
  ["meta", { name: "baidu-site-verification", content: "code-te8iliecTI" }],
  [
    "meta",
    {
      name: "360-site-verification",
      content: "0a5e4a367ff77232a3c1e9bc83edf7ba",
    },
  ],
  [
    "meta",
    { name: "wwads-cn-verify", content: "6da9003b743b65f4c0ccd295cc484e57" },
  ],
  [
    "meta",
    {
      name: "google-site-verification",
      content: "MA1Gbd51TsfBQa-4bZiaJfOnFiufsvLf5groklfa138",
    },
  ],
  // 广告相关，你可以去掉
  [
    "script",
    {
      async: true,
      src: "https://cdn.wwads.cn/js/makemoney.js",
      type: "text/javascript",
    },
  ],
  [
    "meta",
    {
      name: "google-adsense-account",
      content: "ca-pub-8458956478992681",
    },
  ],
  ["script", { src: "/assets/js/common.js" }],
  // 百度统计 js
  ["script", {}, baidutj],
  [
    "script",
    {
      src: "https://agi-dev-platform-web.bj.bcebos.com/ai_apaas/embed/output/embedLiteSDK.js?responseExpires=0",
    },
  ],
  [
    "link",
    {
      rel: "preload",
      href: "/images/index/light.svg",
      as: "image",
      type: "image/svg+xml",
      fetchpriority: "high",
    },
  ],
  [
    "link",
    {
      rel: "preload",
      href: "/images/index/dark.svg",
      as: "image",
      type: "image/svg+xml",
      fetchpriority: "high",
    },
  ],
  [
    "link",
    {
      rel: "preload",
      href: "/images/index/read.svg",
      as: "image",
      type: "image/svg+xml",
      fetchpriority: "high",
    },
  ],
];
