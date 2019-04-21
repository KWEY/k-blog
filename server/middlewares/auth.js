const mongoose = require('mongoose')
const User = mongoose.model('User')
const token = require('../utils/token')

module.exports = type => {
  return async (req, res, next) => {
    const t = req.cookies[type] || req.get('userToken')
    if (!t) {
      return res.json({
        success: false,
        msg: '未登录',
        err: 'please login'
      })
    }

    try {
      const { tel } = token.verify(t)
      let user = null
      if (tel) {
        user = await User.findOne({
          tel
        }).exec()
      }

      if (user && user._id && user.tel) {
        res.locals.tel = tel
        await next()
      } else {
        res.json({
          success: false,
          msg: '鉴权失败',
          err: 'token is invalid'
        })
      }
    } catch (e) {
      res.json({
        success: false,
        msg: '鉴权失败',
        err: e
      })
    }
  }
}
