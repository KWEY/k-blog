const jwt = require('jsonwebtoken')
const config = require('../config')

// {username: 'q', _id: 'asdf'} => token
exports.sign = function token(user) {
  const { secret, expiresIn } = config.jwt
  const token = jwt.sign(
    {
      tel: user.tel,
      userID: user.id
    },
    secret,
    {
      expiresIn: expiresIn
    }
  )
  return token
}

// token => {username: 'kwe', userID: '123'}
exports.verify = function(token) {
  const decoded = jwt.verify(token, config.jwt.secret)
  return decoded
}
