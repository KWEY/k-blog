/**
 * 模块接口列表
 */

import base from './api'; // 导入接口域名列表
import { fetch } from './axios'; // 导入http中创建的axios实例

export default {
  //
  getTypeList() {
    return fetch({ url: base.typeList });
  },
  // 获取文章列表
  getDirectoryList(type) {
    return fetch({ url: base.directoryList });
  },
  // 获取mse目录
  getMseDocList() {
    return fetch({ url: base.mseMenu });
  },
  // 获取mse内容
  getMseDoc() {
    return fetch({ url: base.mseInfo });
  },
};
