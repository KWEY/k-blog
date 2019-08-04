const isPro = process.env.NODE_ENV === 'production'
const config = {
  isPro: isPro,
  user: {
    role: 'superAdmin',
    username: '雪人',
    tel: 16602113192,
    password: 'asdasd',
    email: 'zhangjq92@163.com',
    motto: '那不叫挑食，叫有选择的吃'
  },
  jwt: {
    secret: 'kwe',
    expiresIn: '1D'
  },
  mongodb: {
    host: '127.0.0.1',
    database: 'k-blog',
    port: 27017,
    username: 'kwe',
    password: '123'
  },
  app: {
    domain: 'http://127.0.0.1:3000',
    baseApi: '/api'
  }
}
if (isPro) {
  config.app.domain = 'https://www.webq.top'
}

module.exports = config
