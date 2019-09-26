const mongoose = require('mongoose')
const Comment = mongoose.model('Comment')
const User = mongoose.model('User')
const token = require('../utils/token')

exports.getComments = async (req, res, next) => {
  const { uid = '', aid = '' } = req.query
  try {
    const total = (await Comment.find(findOption).exec()).length
    const data = await Comment.find(findOption, {
      title: 1,
      description: 1,
      views: 1,
      type: 1,
      id: 1,
      created_at: 1
    })
      .skip(page)
      .limit(limit)
      .sort({
        created_at: -1
      })
      .exec()
    res.json({
      success: true,
      data: data,
      total: total
    })
  } catch (e) {
    res.json({
      success: false,
      msg: '',
      err: e,
      total: 0
    })
  }
}

exports.postComment = async (req, res, next) => {
  let body = req.body
  try {
    const data = await getArticleId()
    body.id = data.num
    body = await new Comment(body)
    await body.save()
    res.json({
      success: true,
      data: '',
      msg: '上传成功'
    })
  } catch (e) {
    res.json({
      success: false,
      msg: '上传失败',
      err: e
    })
  }
}

exports.deleteComment = async (req, res, next) => {
  const id = req.query.id
  try {
    await Comment.findOneAndDelete({ id }).exec()
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
