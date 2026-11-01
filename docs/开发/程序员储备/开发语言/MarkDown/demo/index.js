/*
 * @Date: 2021-11-20 13:17:03
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-11-30 16:33:40
 */
"use strict";
const hljs = require("highlight.js");
const emoji = require("markdown-it-emoji");
const linkBlank = require("./plugins/linkBlank.js");

// 初始化 md
const md = require("markdown-it")({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return ""; // use external default escaping
  },
});
// emoji 表情识别插件
md.use(emoji);
// 锚点链接插件
md.use(require("markdown-it-anchor"), {
  permalink: true,
  permalinkBefore: true,
  permalinkSymbol: "§",
});
md.use(require("markdown-it-table-of-contents"));
md.use(...linkBlank);

// .use(require("markdown-it-toc-done-right"));
const fs = require("fs");
const filePath = "./assets/test.md";
const writePath = "./test.html";

const tool = (function () {
  // 生成html
  function generatorHtmlFile(content) {
    const existFile = fs.existsSync(writePath);
    if (existFile) {
      fs.rmSync(writePath);
    }
    fs.writeFileSync(writePath, content, "utf-8", (err, data) => {
      if (err) {
        throw err;
      } else {
        console.log("md转换html成功..");
      }
    });
  }

  // 返回 html 模板
  function getHtmlTemplate(body) {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./assets/github.css" />
  </head>
  <body>${body}</body>
  </html>`;
  }
  return { generatorHtmlFile, getHtmlTemplate };
})();

function main() {
  fs.readFile(filePath, "utf-8", (err, data) => {
    let mdData = md.render(data);
    const content = tool.getHtmlTemplate(mdData);
    tool.generatorHtmlFile(content);
  });
}

main();
