/**
 * 站点级 SEO 增强（本地插件，无外部依赖）
 *
 * 解决三个问题：
 *   1. 全站 200+ 页面共用同一条 meta description → 自动为每页生成唯一摘要（可用 frontmatter.description 覆盖）
 *   2. 缺少 canonical → 自动补 https://jpom.top + 页面路径（可用 frontmatter.canonicalUrl 覆盖）
 *   3. 缺少社交分享信息 → 为每页补 Open Graph / Twitter Card（原 head.ts 里的 og 标签属性写成了 name，社交平台不识别）
 *
 * 所有值都遵循「frontmatter 优先」原则，页面级配置永远覆盖插件默认值。
 */

const HOST = "https://jpom.top";
const SITE_TITLE = "Jpom项目运维";
const OG_IMAGE = `${HOST}/images/seo/og-cover.png`;
const OG_IMAGE_WIDTH = "1200";
const OG_IMAGE_HEIGHT = "630";

/** 去掉 Markdown 语法噪音，得到可用于摘要的纯文本 */
function cleanBlock(block: string): string {
  return block
    .replace(/<[^>]+>/g, " ") // HTML 标签
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // 图片
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // 链接保留文字
    .replace(/^\s*\|.*\|\s*$/gm, " ") // 表格行
    .replace(/^\s*:::.*$/gm, " ") // 容器标记
    .replace(/^\s*[-*+]\s+/gm, "") // 列表符号
    .replace(/^\s*\d+\.\s+/gm, "") // 有序列表
    .replace(/^\s*[#>]+\s*/gm, "") // 标题 / 引用
    .replace(/[*_`~]{1,}/g, "") // 强调符号
    .replace(/\s+/g, " ")
    .trim();
}

const NOISE = /^(目录|本文目录|上一篇|下一篇|更新时间|阅读量|最近更新|赞赏|广告|回到顶部)/;

// 模板化/客套话段落不适合做摘要，尽量跳过
const BOILERPLATE = /(请您|请先|开源不易|多多支持|赞助商|捐赠|本文档还在|努力编写中|扫码|二维码)/;

/** 清理中英文混排里多余的空格 */
function tidy(text: string): string {
  return text
    .replace(/\s*([，。、；：！？）】」》%])\s*/g, "$1")
    .replace(/\s*([（【「《])\s*/g, "$1")
    .replace(/([\u4e00-\u9fa5])\s+(?=[\u4e00-\u9fa5])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** 中文摘要长度（按字符计） */
function cut(text: string, max = 110): string {
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const idx = Math.max(
    slice.lastIndexOf("。"),
    slice.lastIndexOf("！"),
    slice.lastIndexOf("？"),
    slice.lastIndexOf("；"),
    slice.lastIndexOf("，")
  );
  return idx >= 60 ? slice.slice(0, idx + 1) : slice.slice(0, max - 1) + "…";
}

/** 由正文首段推导 description；取不到正文时回退到「标题 + 站点定位」 */
function deriveDescription(page: any): string {
  const raw: string = page._strippedContent || "";
  const blocks = raw
    .replace(/```[\s\S]*?```/g, "\n\n") // 代码块
    .replace(/<!--[\s\S]*?-->/g, "\n\n") // 注释
    .split(/\n\s*\n/);

  // 容器块（::: tip / warning）里的内容常常从半句话开始，优先取容器之前的正文
  const headText = raw.split(/^\s*:::/m)[0];
  const headBlocks = headText === raw ? blocks : headText.split(/\n\s*\n/);

  const collect = (source: string[]): string[] => {
    const list: string[] = [];
    for (const block of source) {
      const text = tidy(cleanBlock(block));
      if (!text || text.length < 12 || NOISE.test(text)) continue;
      list.push(text);
      if (list.length >= 8) break;
    }
    return list;
  };

  let candidates = collect(headBlocks);
  if (!candidates.some((t) => t.length >= 40 && !BOILERPLATE.test(t))) {
    candidates = candidates.concat(collect(blocks));
  }

  // 优先：长度合适且不是模板客套话的段落
  let desc =
    candidates.find((t) => t.length >= 40 && t.length <= 180 && !BOILERPLATE.test(t)) ||
    candidates.find((t) => t.length >= 20 && !BOILERPLATE.test(t)) ||
    candidates[0] ||
    "";

  // 首段偏短时，补上下一段（同样排除模板段落）
  if (desc.length < 60) {
    const rest = candidates.find((t) => t !== desc && !BOILERPLATE.test(t) && t.length >= 20);
    if (rest) desc = `${desc} ${rest}`;
  }

  desc = tidy(desc);
  if (desc.length < 20 && page.title) {
    desc = `${page.title}：Jpom 项目运维管理系统的安装、配置与使用说明。`;
  }
  return cut(desc);
}

function hasMeta(meta: any[], key: string): boolean {
  return meta.some(
    (item: any) => item && (item.name === key || item.property === key || item.itemprop === key)
  );
}

function toIso(value: any): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return isNaN(date.getTime()) ? undefined : date.toISOString();
}

export default {
  name: "seo-enhance",
  extendPageData($page: any) {
    const fm = $page.frontmatter = $page.frontmatter || {};
    // 注意：extendPageData 阶段 page.path 还是源文件路径（可能是中文 .html），
    // 必须用 permalink / regularPath 计算真实的对外 URL
    const rawPath: string = fm.permalink || $page.regularPath || $page.path || "/";
    const path = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
    const url = HOST + path;
    const isHome = fm.home === true;
    const meta: any[] = Array.isArray(fm.meta) ? fm.meta.slice() : [];

    // 1. 唯一 description
    if (!fm.description) {
      const desc = deriveDescription($page);
      if (desc) fm.description = desc;
    }

    // 2. canonical（页面可显式指定 canonicalUrl，例如把历史文档指向新页面）
    if (!fm.canonicalUrl) fm.canonicalUrl = url;

    // 3. Open Graph / Twitter Card
    const title = fm.metaTitle || (isHome || !$page.title ? SITE_TITLE : `${$page.title} | ${SITE_TITLE}`);
    const description = fm.description || "";

    const push = (tag: any) => {
      const key = tag.name || tag.property;
      if (!hasMeta(meta, key)) meta.push(tag);
    };

    push({ property: "og:type", content: isHome ? "website" : "article" });
    push({ property: "og:title", content: title });
    push({ property: "og:url", content: url });
    push({ property: "og:site_name", content: SITE_TITLE });
    if (description) push({ property: "og:description", content: description });
    push({ property: "og:image", content: OG_IMAGE });
    push({ property: "og:image:width", content: OG_IMAGE_WIDTH });
    push({ property: "og:image:height", content: OG_IMAGE_HEIGHT });
    push({ property: "og:image:alt", content: "Jpom 项目运维管理系统" });
    push({ property: "og:locale", content: "zh_CN" });

    push({ name: "twitter:card", content: "summary_large_image" });
    push({ name: "twitter:title", content: title });
    if (description) push({ name: "twitter:description", content: description });
    push({ name: "twitter:image", content: OG_IMAGE });

    if (!isHome) {
      const published = toIso(fm.date);
      if (published) push({ property: "article:published_time", content: published });
      const modified = toIso($page.lastUpdated);
      if (modified) push({ property: "article:modified_time", content: modified });
    }

    fm.meta = meta;
  },
};
