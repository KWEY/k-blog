const express = require('express')
const router = express.Router()
const check = require('./middlewares/check')
const author = require('./middlewares/auth')
const user = require('./controllers/user')
const weblog = require('./controllers/weblog')
const article = require('./controllers/article')
const statistical = require('./controllers/statistical')
const recommend = require('./controllers/recommend')

// 文章
router
  // 获取文章列表
  .get('/loglist', author.admin('userToken'), weblog.getLogList)
  .delete('/deletelog', author.admin('userToken'), weblog.deleteLog)
  .post('/track', weblog.track)
  .get('/statistical', statistical.getData)
  // 获取文章列表
  .get('/article', article.getArticles)
  // 获取指定id文章
  .get('/article/:id', check.params(['id']), article.getArticle)
  // 上传文章
  .post('/article/post', author.auth('userToken'), article.postArticle)
  // 更新文章
  .patch('/article/update', author.auth('userToken'), article.patchArticle)
  // 删除文章
  .delete('/article/delete', author.auth('userToken'), article.deleteArticle)
// 文章
router
  // 获取文章列表
  .get('/recommend', recommend.recommendList)

// user
router
  // 获取作者信息
  .get('/admin', user.getAdminInfo)
  // 获取用户信息
  .get('/user', author.auth('userToken'), user.getUserInfo)
  // 核对用户名
  .get('/user/check', check.querys(['tel', 'username']), user.getUserCheck)
  // 核对用户密码
  // .get('/user/checkpassword', check.querys(['password']), user.getPasswordCheck)
  // 登录
  .post('/login', check.bodyParams(['tel', 'password']), user.login)
  // 注册
  .post(
    '/register',
    check.bodyParams(['username', 'password', 'tel']),
    user.register
  )
  // 退出登录
  .post('/logout', author.auth('userToken'), user.logout)
  //   .patch('/admin', author.auth('adminToken'), user.patchAdminInfo )
  .patch(
    '/password',
    check.bodyParams(['old', 'new']),
    author.auth('userToken'),
    user.patchAdminPassword
  )

module.exports = router
