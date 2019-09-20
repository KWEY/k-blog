const mongoose = require('mongoose')
const Weblog = mongoose.model('Weblog')

//
const track = async (req, res, next) => {
  const ua =req.headers['user-agent']
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
    const { flag = '' } = req.body
    const log = await new Weblog({
      ua,
      flag,
      ip: clientIp,
      date: date.Format('yyyyMMdd'),
      hour: date.Format('hh'),
      ...geo
    })
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
  let { page = 1, limit = 100, date = '', hour = '' } = req.query
  page = Number((page - 1) * limit) || 0
  limit = Number(limit) || 100
  
  const findOption = {}
  if (date) {
    findOption.date = date
  }
  if (hour) {
    findOption.hour = hour
  }
  const data = await Weblog.find(findOption, {
    ip: 1,
    flag: 1,
    date: 1,
    hour: 1,
    country: 1,
    city: 1,
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
  const id = req.query.id
  try {
    await Weblog.findOneAndDelete({ _id: id }).exec()
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
