const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleIdSchema = new Schema({
  id: {
    type: String,
    default: 'Articleid'
  },
  num: {
    type: Number
  },
})

mongoose.model('ArticleId', ArticleIdSchema)
