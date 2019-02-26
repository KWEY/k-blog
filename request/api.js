/**
 * 接口域名的管理
 */
// const baseUrl = 'http://www.webq.top/static'
const isPro = process.env.NODE_ENV === 'production'
const baseUrl = isPro ? 'http://www.webq.top/static' : 'http://localhost:3000'
const base = {
  typeList: `${baseUrl}/db/type.db.json`,
  directoryList: `${baseUrl}/db/directory.json`,
  article: `${baseUrl}/db/`,
  docInfo: `${baseUrl}/db/doc/mse.xml`,
  docMenu: `${baseUrl}/db/doc/mse-list.json`
}
export default base
