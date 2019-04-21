// array
exports.params = param => {
  return function(req, res, next) {
    const hasParam = param.every(item => {
      return !!req.params[item]
    })
    if (!hasParam) {
      return res.json({
        success: false,
        msg: `${param.join(' and ')} is required`,
        err: null
      })
    }
    next()
  }
}

exports.bodyParams = body => {
  return function(req, res, next) {
    const hasParam = body.every(item => {
      return !!req.body[item]
    })
    if (!hasParam) {
      return res.json({
        success: false,
        msg: `${body.join(' and ')} is required`,
        err: null
      })
    }
    next()
  }
}
exports.querys = query => {
  return function(req, res, next) {
    const hasQuery = query.some(item => {
      return !!req.query[item]
    })
    if (!hasQuery) {
      return res.json({
        success: false,
        msg: `${query.join(' or ')} is required`,
        err: null
      })
    }
    next()
  }
}
