/**
 * 接口域名的管理
 */
const isPro = process.env.NODE_ENV === 'production'
const baseUrl = isPro ? 'https://www.webq.top' : 'http://127.0.0.1:3000'
const base = {
  check: `${baseUrl}/api/user/check`, // 查看是否存在当前用户
  register: `${baseUrl}/api/register`, // 注册
  login: `${baseUrl}/api/login`, // 登录
  logout: `${baseUrl}/api/logout`, // 退出登录
  author: `${baseUrl}/api/admin`, // 获取作者信息
  user: `${baseUrl}/api/user`, // 获取用户信息
  upload: `${baseUrl}/api/article/post`, // 发布文章
  update: `${baseUrl}/api/article/update`, // 更新文章
  delete: `${baseUrl}/api/article/delete`, // 删除文章
  articles: `${baseUrl}/api/article`, // 获取文章列表，加上id获取指定文章
  jq: `${baseUrl}/plugins/jquery-2.1.1.js`, // jq地址
  nav: `${baseUrl}/plugins/nav.js`, // nav地址
  editor: `${baseUrl}/plugins/wangEditor.min.js`, // editor地址
  doc: `${baseUrl}/db/doc/` // 文档地址
}
export default base
