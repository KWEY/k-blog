/**
 * 接口域名的管理
 */
const isPro = process.env.NODE_ENV === 'production'
const baseUrl = isPro ? 'http://www.webq.top/static' : 'http://localhost:3000'
const base = {
  author: `${baseUrl}/api/admin`,
  upload: `${baseUrl}/api/article/post`,
  articles: `${baseUrl}/api/article`,
  jq: `${baseUrl}/plugins/jquery-2.1.1.js`,
  nav: `${baseUrl}/plugins/nav.js`,
  editor: `${baseUrl}/plugins/wangEditor.min.js`,
  directoryList: `${baseUrl}/db/directory.json`,
  article: `${baseUrl}/db/`,
  docMenu: `${baseUrl}/db/doc/mse-list.json`,
  docInfo: `${baseUrl}/db/doc/mse.xml`
}
export default base
