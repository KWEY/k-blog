/**
 * 模块接口列表
 */
// 导入接口域名列表
import base from './api'
// 导入http中创建的axios实例
import { fetch } from './axios'

export default {
  //
  getTypeList() {
    return fetch({ url: base.typeList })
  },
  // 获取文章列表
  getDirectoryList(type) {
    return fetch({ url: base.directoryList, params: { type } })
  },
  // 获取文章
  getArticle(data) {
    return fetch({ url: `${base.article}${data.tid}/${data.id}.json` })
  },
  // 获取doc目录
  getDocList(doc) {
    return fetch({ url: base.docMenu, params: { doc } })
  },
  // 获取doc内容
  getDoc(doc) {
    return fetch({ url: base.docInfo, params: { doc } })
  }
}
