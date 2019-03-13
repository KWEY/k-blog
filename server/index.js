require('./models')
const path = require('path')
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
const globalConfig = require('./config')
config.dev = !globalConfig.isPro

const resolve = file => path.resolve(__dirname, file)
const serve = (path, cache) => {
  return express.static(resolve(path), {
    maxAge: cache ? 1000 * 60 * 60 * 24 : 0
  })
}
const app = express()
app.use(bodyParser.json())
app.use(cookieParser(Math.random().toString(36)))
app.use(function(req, res, next) {
  // const domain = `${req.protocol}://${req.get('host')}`
  // 前后端共享配置数据
  res.locals.blog = {
    domain: globalConfig.app.domain,
    baseUrl: globalConfig.app.domain + globalConfig.app.baseApi
  }
  next()
})
app.use('/static', serve('../static', true))
app.use('/api', require('./api'))
app.all('/api/*', (req, res) => {
  res.json({
    success: false,
    err: 'api is invalid'
  })
})

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)
  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
