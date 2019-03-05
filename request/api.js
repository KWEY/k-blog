/**
 * 接口域名的管理
 */
const isPro = process.env.NODE_ENV === 'production'
const baseUrl = isPro ? 'http://www.webq.top' : 'http://127.0.0.1:3000'
const base = {
  author: `${baseUrl}/api/admin`,
  upload: `${baseUrl}/api/article/post`,
  articles: `${baseUrl}/api/article`,
  jq: `${baseUrl}/plugins/jquery-2.1.1.js`,
  nav: `${baseUrl}/plugins/nav.js`,
  editor: `${baseUrl}/plugins/wangEditor.min.js`,
  article: `${baseUrl}/db/`,
  doc: `${baseUrl}/db/doc/`
}
export default base
