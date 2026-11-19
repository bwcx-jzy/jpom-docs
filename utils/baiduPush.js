/**
 * 生成百度链接推送文件（urls.txt）
 *
 * 改进点：
 *   1. 去重 + 保证换行分隔（旧实现会重复推送、首行缺失换行）
 *   2. 跳过 noindex / sitemap.exclude 的页面（如 404.md）
 *   3. 统一补结尾斜杠，与站点实际规范 URL 一致
 */
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const matter = require("gray-matter"); // FrontMatter解析器 https://github.com/jonschlinkert/gray-matter
const readFileList = require("./modules/readFileList");
const urlsRoot = path.join(__dirname, "..", "urls.txt"); // 百度链接推送文件
const DOMAIN = (process.argv.splice(2)[0] || "").replace(/\/+$/, ""); // 获取命令行传入的参数

if (!DOMAIN) {
  console.log(
    chalk.red(
      "请在运行此文件时指定一个你要进行百度推送的域名参数，例：node utils/baiduPush.js https://jpom.top"
    )
  );
  process.exit(1);
}

main();

/**
 * 主体函数
 */
function main() {
  const urls = new Set([`${DOMAIN}/`]);
  const files = readFileList(); // 读取所有 md 文件数据

  files.forEach((file) => {
    const { data } = matter(fs.readFileSync(file.filePath, "utf8"));
    if (!data.permalink) {
      return;
    }
    // 显式 noindex 或 sitemap.exclude 的页面不推送
    const meta = Array.isArray(data.meta) ? data.meta : [];
    const robots = meta.find((item) => item && item.name === "robots");
    if (robots && /noindex/i.test(String(robots.content || ""))) {
      return;
    }
    if (data.sitemap && data.sitemap.exclude === true) {
      return;
    }
    const permalink = data.permalink.endsWith("/")
      ? data.permalink
      : `${data.permalink}/`;
    urls.add(`${DOMAIN}${permalink}`);
  });

  fs.writeFileSync(urlsRoot, `${[...urls].join("\n")}\n`, "utf8");
  console.log(chalk.green(`已生成 ${urls.size} 条待推送链接：${urlsRoot}`));
}
