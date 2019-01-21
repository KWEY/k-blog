/**
 * 模块接口列表
 */

import base from './api'; // 导入接口域名列表
import { fetch } from './axios'; // 导入http中创建的axios实例

export default {
  // 获取文章列表
  getList() {
    return fetch({ url: base.directoryList });
  },
};
