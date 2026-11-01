/*
 * @Date: 2021-11-30 13:52:43
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-11-30 13:58:59
 */
var iterator = require("markdown-it-for-inline");

module.exports = [
  iterator,
  "url_new_win",
  "link_open",
  function (tokens, idx) {
    var aIndex = tokens[idx].attrIndex("target");

    if (aIndex < 0) {
      tokens[idx].attrPush(["target", "_blank"]);
    } else {
      tokens[idx].attrs[aIndex][1] = "_blank";
    }
  },
];