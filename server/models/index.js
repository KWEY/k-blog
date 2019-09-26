const mongoose = require('mongoose')
const md5 = require('md5')
const config = require('../config')
require('./counter')
require('./user')
require('./comment')
require('./article')
require('./articleid')
require('./statistical')
require('./weblog')
require('./weblogop')

const User = mongoose.model('User')
const Counter = mongoose.model('Counter')
const mongoUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${
  config.mongodb.database
}`
mongoose.connect(
  mongoUrl,
  { useNewUrlParser: true }
)
mongoose.Promise = global.Promise
const db = mongoose.connection

db.once('open', async () => {
  console.log('database connect successed')
  // 初始化管理员信息
  const userInfo = config.user
  userInfo.password = md5(userInfo.password)

  let user = await User.findOne({ role: 'superAdmin' }).exec()
  const counter = new Counter({
    id: 'productid',
    sequence_value: userInfo.id
  })
  await counter.save()
  if (!user) {
    userInfo.id = 10000
    const counter = new Counter({
      id: 'productid',
      sequence_value: userInfo.id
    })
    await counter.save()

    user = new User(userInfo)
    await user.save()
    console.log('Administrator information initialization succeeded')
  }
}).on('error', error => {
  console.warn('database connect fail', error)
})
