/**
 * 模块接口列表
 */

import base from './api'; // 导入接口域名列表
import { fetch } from './axios'; // 导入http中创建的axios实例

export default {
  // 获取类型列表
  getTypeList() {
    return fetch({ url: base.typeList });
  },
  // 获取目录列表
  getDirectoryList() {
    return fetch({ url: base.directoryList });
  },
  // 获取文章
  getArticle(data) {
    return fetch({ url: `${base.article}${data.tid}/${data.id}.json` });
  },
  // 获取mse文章
  getMseDoc() {
    return fetch({ url: base.mse, responseType: '' });
  },
  // 获取mse目录
  getMseDocList() {
    return fetch({ url: base.mseList });
  },
  // 动态获取js
  getJS(data) {
    return fetch(data);
  },
};
