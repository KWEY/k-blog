/**
 * 模块接口列表
 */
import qs from 'qs';

import base from './api'; // 导入接口域名列表
import axios, { fetch } from './axios'; // 导入http中创建的axios实例

export default {
  // 获取类型列表
  getTypeList() {
    return fetch(base.typeList, null);
  },
  // 获取目录列表
  getDirectoryList() {
    return fetch(base.directoryList, null);
  },
  // 获取文章
  getArticle(data) {
    return fetch(`${base.article}${data.tid}/${data.id}.json`, null);
  },
  // post提交
  login(params) {
    return axios.post(`${base.sq}/accesstoken`, qs.stringify(params));
  },
  // 其他接口…………
};
