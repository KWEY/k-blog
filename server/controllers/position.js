const mongoose = require('mongoose')
// const md5 = require('md5')
const Ip = mongoose.model('Ip')

// 获取ip
const getIp = async (req, res, next) => {
  const clientIp = req.clientIp
  const geoip = require('geoip-lite')
  const geo = geoip.lookup(clientIp)
  const date = new Date()
  if (clientIp && geo) {
    const ip = await new Ip({
      ip: clientIp,
      date: date.Format('yyyyMMdd'),
      hour: date.Format('hh'),
      ...geo
    })
    await ip.save()
    res.json({
      success: true,
      data: JSON.stringify(geo)
    })
    return
  }
  res.json({
    success: false,
    data: ''
  })
}
// 获取ip list
const getIpList = async (req, res, next) => {
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
  const data = await Ip.find(findOption, {})
    .skip(page)
    .limit(limit)
    .exec()
  res.json({
    success: true,
    data: data
  })
}
// 
const deleteIp = async (req, res, next) => {
  const id = req.query.id
  try {
    await Ip.findOneAndDelete({ _id: id }).exec()
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
  getIp,
  deleteIp,
  getIpList,
}
