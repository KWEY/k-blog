const mongoose = require('mongoose')
const Statistical = mongoose.model('Statistical')

const newModel = async () => {
  const model = await Statistical.findOne({ id: 'data' }).exec()
  if (!model) {
    const counter = new Statistical({
      id: 'data',
      cvisit: 0,
      cview: 0
    })
    await counter.save()
  }
}
const addCvisit = () => {
  newModel()
  return new Promise((resolve, reject) => {
    Statistical.findOneAndUpdate(
      { id: 'data' },
      {
        $inc: { cvisit: 0.5 }
      },
      { new: true },
      function(err, data) {
        if (err) {
          reject(err)
        }
        resolve(data)
      }
    ).exec()
  })
}
const addCview = () => {
  newModel()
  return new Promise((resolve, reject) => {
    Statistical.findOneAndUpdate(
      { id: 'data' },
      {
        $inc: { cview: 0.5 }
      },
      { new: true },
      function(err, data) {
        if (err) {
          reject(err)
        }
        resolve(data)
      }
    ).exec()
  })
}
// 获取统计数据
const getData = async (req, res) => {
  try {
    const data = await Statistical.findOne({
      id: 'data'
    }).exec()
    res.json({
      success: true,
      data: data
    })
  } catch (e) {
    res.json({
      success: false,
      msg: '',
      err: e
    })
  }
}
// 清空统计数据
const clear = () => {
  try {
    Statistical.findOneAndUpdate(
      { id: 'data' },
      {
        cvisit: 0,
        cview: 0
      }
    ).exec()
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  addCview,
  addCvisit,
  getData,
  clear
}
