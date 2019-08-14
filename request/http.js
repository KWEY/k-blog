/**
 * 模块接口列表
 */
// 导入接口域名列表
import base from './api'
// 导入http中创建的axios实例
import { fetch } from './axios'

export default {
  // 获取统计信息
  statistical() {
    return fetch({ url: base.statistical })
  },
  // 注册
  register(data) {
    return fetch({ data, url: base.register, method: 'post' })
  },
  // 查询当前用户名是否已注册
  check(tel, username) {
    return fetch({ url: base.check, params: { tel, username } })
  },
  // 登录
  login(data) {
    return fetch({ data, url: base.login, method: 'post' })
  },
  // 退出登录
  logout() {
    return fetch({ url: base.logout, method: 'post' })
  },
  // 查看当前用户密码
  checkPassword(password) {
    return fetch({ url: base.checkPassword, params: { password } })
  },
  // 改密
  password(data) {
    return fetch({ data, url: base.password, method: 'patch' })
  },
  // 获取作者
  getAdmin() {
    return fetch({ url: base.author })
  },
  // 获取用户信息
  getUserStatus(userToken) {
    return fetch({ url: base.user }, userToken)
  },
  // 发布文章
  postArticle(data) {
    return fetch({ data, url: base.upload, method: 'post' })
  },
  // 更新文章
  updateArticle(data) {
    return fetch({ data, url: base.update, method: 'patch' })
  },
  // 更新文章
  deleteArticle(params) {
    return fetch({ params, url: base.delete, method: 'delete' })
  },
  // 获取文章列表
  getArticles(params) {
    return fetch({ params, url: base.articles })
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
  },
  // 获取推荐内容
  getRecommend(params) {
    return fetch({ params, url: base.recommend })
  }
}
