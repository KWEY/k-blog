const mongoose = require('mongoose')
const ArticleId = mongoose.model('ArticleId')

const newModel = async () => {
  let model = await ArticleId.findOne({ id: 'Articleid' }).exec()
  if (!model) {
    model = new ArticleId({
      id: 'Articleid',
      num: 772,
    })
    await model.save()
    model = {num: 772}
  }
  return model
}
const getArticleId = async () => {
  const model = await newModel()
  model.num++
  return new Promise((resolve, reject) => {
    ArticleId.findOneAndUpdate(
      { id: 'Articleid' },
      {
        num: model.num
      },
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
    ArticleId.findOneAndUpdate(
      { id: 'Articleid' },
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
    const data = await ArticleId.findOne({
      id: 'Articleid'
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
    ArticleId.findOneAndUpdate(
      { id: 'Articleid' },
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
  getArticleId,
}
