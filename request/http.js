/**
 * 模块接口列表
 */
// 导入接口域名列表
import base from './api'
// 导入http中创建的axios实例
import { fetch } from './axios'

export default {
  // 注册
  register(data) {
    return fetch({ data, url: base.register, method: 'post' })
  },
  // 查询当前用户名是否已注册
  check(username) {
    return fetch({ url: base.check, params: { username } })
  },
  // 登录
  login(data) {
    return fetch({ data, url: base.login, method: 'post' })
  },
  // 获取作者
  getAdmin() {
    return fetch({ url: base.author })
  },
  // 发布文章
  postArticle(data) {
    return fetch({ data, url: base.upload, method: 'post' })
  },
  // 获取文章列表
  getArticles(type, page) {
    return fetch({ url: base.articles, params: { type, page } })
  },
  // 获取文章
  getArticle(id) {
    return fetch({ url: `${base.articles}/${id}` })
  },
  // 获取doc目录
  getDocList(doc) {
    return fetch({ url: `${base.doc + doc}-list.json` })
  },
  // 获取doc内容
  getDoc(doc) {
    return fetch({ url: `${base.doc + doc}.xml`, responseType: 'xml' })
  }
}
