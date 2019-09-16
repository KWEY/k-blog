const mongoose = require('mongoose')
// const md5 = require('md5')
const config = require('../config')
const User = mongoose.model('User')
const Ip = mongoose.model('Ip')
const token = require('../utils/token')
const { getNextSequenceValue } = require('./counter')
const { addCvisit } = require('./statistical')

const admin = {}
const userStatus = (user, res, t) => {
  return {
    _id: user._id,
    id: user.id,
    tel: user.tel,
    username: user.username,
    avatar: user.avatar,
    motto: user.motto,
    isLogin: true,
    userToken: t,
    isAdmin: user.id === admin.id
  }
}

const login = async (req, res, next) => {
  const { tel, password } = req.body
  // let { password } = req.body
  // password = md5(password)
  //
  try {
    const user = await User.findOne({
      tel,
      password
    }).exec()
    if (user) {
      const t = token.sign(user)
      if (config.isPro) {
        res.cookie('userToken', t, {
          httpOnly: true,
          domain: '.webq.top',
          'Max-Age': 24 * 60 * 60
        })
      } else {
        res.cookie('userToken', t, {
          httpOnly: true,
          'Max-Age': 24 * 60 * 60
        })
      }
      res.json({
        success: true,
        msg: '登录成功',
        data: userStatus(user, res, t)
      })
    } else {
      res.json({
        success: false,
        msg: '登录失败',
        err: 'tel or password is invalid'
      })
    }
  } catch (e) {
    res.json({
      success: false,
      msg: '登录失败',
      err: e
    })
  }
}

const logout = (req, res) => {
  if (config.isPro) {
    res.clearCookie('userToken', {
      httpOnly: true,
      domain: '.webq.top'
    })
  } else {
    res.clearCookie('userToken')
  }
  res.json({
    success: true,
    data: null
  })
}
const findUserTel = async tel => {
  const user = await User.findOne({
    tel
  }).exec()
  return user
}
const findUserName = async username => {
  const user = await User.findOne({
    username
  }).exec()
  return user
}
// 查找电话号码、用户名是否注册
const checkUser = async (tel, username) => {
  let msg = ''
  let user
  if (tel) {
    user = await findUserTel(tel)
    if (user) {
      msg = '电话号已注册'
    }
  }
  if (username) {
    user = await findUserName(username)
    if (user) {
      msg = '昵称已注册'
    }
  }
  return msg
}
// 查询当前用户名是否已注册
const getUserCheck = async (req, res) => {
  const { tel, username } = req.query
  try {
    const msg = await checkUser(tel, username)
    if (msg) {
      res.json({
        msg,
        success: false
      })
    } else {
      res.json({
        success: true,
        msg: '未注册'
      })
    }
  } catch (e) {
    res.json({
      success: false,
      msg: '查询列表失败',
      err: e
    })
  }
}
// 注册
const register = async (req, res) => {
  const { username, tel, password } = req.body
  // let { password } = req.body
  const msg = await checkUser(tel, username)
  if (msg) {
    res.json({
      msg,
      success: false
    })
  } else {
    // password = md5(password)
    try {
      const counter = await getNextSequenceValue()
      if (counter.sequence_value) {
        const user = await new User({
          username,
          password,
          tel,
          id: counter.sequence_value
        })
        await user.save()
        const t = token.sign(user)
        res.cookie('userToken', t)
        res.json({
          success: true,
          msg: '注册成功',
          data: userStatus(user, res, t)
        })
      }
    } catch (e) {
      res.json({
        success: false,
        msg: '注册失败',
        err: e
      })
    }
  }
}
// 获取用户信息
const getUserInfo = async (req, res, next) => {
  // 用户名必须是唯一的
  const tel = res.locals.tel
  const t = req.cookies.userToken || req.get('userToken')
  try {
    const user = await User.findOne({
      tel
    }).exec()
    res.json({
      success: true,
      data: userStatus(user, res, t)
    })
  } catch (e) {
    res.json({
      success: false,
      msg: '获取失败',
      err: e
    })
  }
}
// 获取ip
const getIp = async (req, res, next) => {
  const clientIp = req.clientIp
  const geoip = require('geoip-lite')
  const geo = geoip.lookup(clientIp)
  if (clientIp && geo) {
    const ip = await new Ip({
      ip,
      ...geo
    })
    await ip.save()
    res.json({
      success: true,
      data: geo
    })
    return
  }
  let ipp
  try {
    ipp = {
      ip: clientIp,
      geo,
      as: req.ip,
      rrip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      rip: req.clientIp
    }
  } catch (error) {
    ipp = {
      ip: clientIp,
      geo,
      as: req.ip,
      rip: req.clientIp
    }
  }
  console.log(ipp);
  res.json({
    success: true,
    data: JSON.stringify(ipp)
  })
  return
  res.json({
    success: false,
    data: ''
  })
}
const getAdminInfo = async (req, res, next) => {
  const role = config.user.role
  const domain = res.locals.blog.domain
  try {
    const user = await User.findOne({
      role
    }).exec()
    addCvisit()
    user.avatar = domain + '/static/avatar.png'
    admin.id = user.id
    res.json({
      success: true,
      data: userStatus(user, res)
    })
  } catch (e) {
    res.json({
      success: false,
      msg: '获取失败',
      err: e
    })
  }
}

const patchAdminInfo = async (req, res, next) => {
  let body = req.body
  const username = res.locals.username
  try {
    body.updated_at = Date.now()
    body = await User.findOneAndUpdate({ username }, body).exec()
    res.json({
      success: true,
      data: body
    })
  } catch (e) {
    res.json({
      success: false,
      err: e
    })
  }
}

const patchAdminPassword = async (req, res, next) => {
  let body = req.body
  if (body.old === body.new) {
    return res.json({
      success: false,
      msg: '密码不能相同',
      err: ''
    })
  }
  const tel = res.locals.tel
  const oldPassword = body.old
  const newPassword = body.new
  try {
    const user = await User.findOne({
      tel
    }).exec()
    if (user && user.password !== oldPassword) {
      return res.json({
        success: false,
        msg: '密码错误',
        err: ''
      })
    }
    body = await User.findOneAndUpdate(
      { tel },
      {
        password: newPassword,
        updated_at: Date.now()
      }
    ).exec()
    res.clearCookie('userToken')
    res.json({
      success: true,
      msg: '修改成功'
    })
  } catch (e) {
    res.json({
      success: false,
      msg: '修改失败',
      err: e
    })
  }
}
module.exports = {
  login,
  getIp,
  logout,
  register,
  getUserInfo,
  getUserCheck,
  getAdminInfo,
  patchAdminInfo,
  patchAdminPassword
}
