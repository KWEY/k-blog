const mongoose = require('mongoose')
const Weblog = mongoose.model('Weblog')
const WeblogOp = mongoose.model('WeblogOp')
const trackId = ['001', '002']

//
const track = async (req, res, next) => {
  const ua = req.headers['user-agent']
  const body = req.body
  let clientIp
  if (process.env.NODE_ENV === 'development') {
    clientIp = '27.115.6.196'
  } else {
    clientIp = req.clientIp
  }
  const geoip = require('geoip-lite')
  const geo = geoip.lookup(clientIp)
  const date = new Date()
  if (clientIp && geo) {
    const da = {
      ua,
      ip: clientIp,
      ctime: date.getTime(),
      date: date.Format('yyyyMMdd'),
      hour: date.Format('hh'),
      ...body,
      ...geo
    }
    let log
    if (body.logid === trackId[0]) {
      log = await new WeblogOp(da)
    } else {
      log = await new Weblog(da)
    }
    await log.save()
    res.json({
      success: true,
    })
    return
  }
  res.json({
    success: false,
    data: ''
  })
}
// 获取list
const getLogList = async (req, res, next) => {
  let { page = 1, limit = 100, date = '', hour = '', logid = '001' } = req.query
  page = Number((page - 1) * limit) || 0
  limit = Number(limit) || 100
  
  const findOption = {}
  if (date) {
    findOption.date = date
  }
  if (hour) {
    findOption.hour = hour
  }
  let ModuleLog
  if (logid === trackId[0]) {
    ModuleLog = WeblogOp
  } else {
    ModuleLog = Weblog
  }
  const data = await ModuleLog.find(findOption, {
    ip: 1,
    flag: 1,
    date: 1,
    hour: 1,
    ctime: 1,
    params: 1,
    ll: 1
  })
    .skip(page)
    .limit(limit)
    .exec()
  res.json({
    success: true,
    data: data
  })
}
// 
const deleteLog = async (req, res, next) => {
  const {id, logid = '001'} = req.query
  try {
    let ModuleLog
    if (logid === trackId[0]) {
      ModuleLog = WeblogOp
    } else {
      ModuleLog = Weblog
    }
    await ModuleLog.findOneAndDelete({ _id: id }).exec()
    res.json({
      success: true,
      data: ''
    })
  } catch (e) {
    res.json({
      success: false,
      msg: '',
      err: e
    })
  }
}

module.exports = {
  track,
  deleteLog,
  getLogList,
}
