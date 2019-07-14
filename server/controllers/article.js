const mongoose = require('mongoose')
const Article = mongoose.model('Article')
const User = mongoose.model('User')
const token = require('../utils/token')
const { addCview } = require('./statistical')

exports.getArticles = async (req, res, next) => {
  const { type = '', userToken = '' } = req.query
  let { page = 1, limit = 25, keyword = '' } = req.query
  let findOption = {}
  let owner = false
  if (userToken) {
    try {
      const { tel } = token.verify(userToken)
      if (tel) {
        const user = await User.findOne({
          tel
        }).exec()
        if (user.role === 'superAdmin') {
          owner = true
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  keyword = decodeURIComponent(keyword)
  page = Number((page - 1) * limit) || 0
  limit = Number(limit) || 25
  if (!owner) {
    findOption.type = { $ne: ['001_110'] }
  }
  if (type && type !== '001_001') {
    // 根据标签type查询
    if (owner || type !== '001_110') {
      findOption = {
        type: [type]
      }
    }
  } else if (keyword) {
    const reg = new RegExp(keyword, 'i')
    // 根据keyword 搜索查询
    findOption = {
      $or: [
        {
          title: {
            $regex: reg
          }
        },
        {
          description: {
            $regex: reg
          }
        }
      ]
    }
    if (!owner) {
      findOption.type = { $ne: ['001_110'] }
    }
  }
  try {
    const total = (await Article.find(findOption).exec()).length
    const data = await Article.find(findOption, {
      title: 1,
      description: 1,
      views: 1,
      type: 1,
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

exports.getArticle = async (req, res, next) => {
  const id = req.params.id
  try {
    const article = await Article.findOne({
      _id: id
    })
      .populate({
        path: 'author',
        select: 'username'
      })
      // .populate({
      //   path: 'comments',
      //   populate: {
      //     path: 'user'
      //   }
      // })
      .exec()
    addCview()
    await Article.findOneAndUpdate(
      {
        _id: id
      },
      {
        views: article.views + 1
      }
    ).exec()
    article.views = article.views + 1
    res.json({
      success: true,
      data: article
    })
  } catch (e) {
    res.json({
      success: false,
      msg: '',
      err: e
    })
  }
}

exports.postArticle = async (req, res, next) => {
  let body = req.body
  try {
    body = await new Article(body)
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

// 修改文章
exports.patchArticle = async (req, res, next) => {
  let body = req.body
  body.updated_at = Date.now()
  try {
    body = await Article.findOneAndUpdate({ _id: body.id }, body).exec()
    if (!body) {
      req.body.created_at = Date.now()
      body = await new Article(req.body)
      await body.save()
      res.json({
        success: true,
        code: 2,
        data: body,
        msg: '上传成功'
      })
      return
    }
    res.json({
      success: true,
      data: ''
    })
  } catch (e) {
    res.json({
      success: false,
      msg: '修改失败',
      err: e
    })
  }
}

exports.deleteArticle = async (req, res, next) => {
  const id = req.query.id
  try {
    await Article.findOneAndDelete({ _id: id }).exec()
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
