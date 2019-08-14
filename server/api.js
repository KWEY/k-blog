const express = require('express')
const router = express.Router()
const check = require('./middlewares/check')
const auth = require('./middlewares/auth')
const user = require('./controllers/user')
const article = require('./controllers/article')
const statistical = require('./controllers/statistical')

// 文章
router
  // 获取文章列表
  .get('/ip', user.getIp)
  .get('/statistical', statistical.getData)
  // 获取文章列表
  .get('/article', article.getArticles)
  // 获取指定id文章
  .get('/article/:id', check.params(['id']), article.getArticle)
  // 上传文章
  .post('/article/post', auth('userToken'), article.postArticle)
  // 更新文章
  .patch('/article/update', auth('userToken'), article.patchArticle)
  // 删除文章
  .delete('/article/delete', auth('userToken'), article.deleteArticle)

// user
router
  // 获取作者信息
  .get('/admin', user.getAdminInfo)
  // 获取用户信息
  .get('/user', auth('userToken'), user.getUserInfo)
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
  .post('/logout', auth('userToken'), user.logout)
  //   .patch('/admin', auth('adminToken'), user.patchAdminInfo )
  .patch(
    '/password',
    check.bodyParams(['old', 'new']),
    auth('userToken'),
    user.patchAdminPassword
  )

module.exports = router
