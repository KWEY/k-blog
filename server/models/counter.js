const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  id: {
    type: String,
    default: 'productid'
  },
  sequence_value: {
    type: Number
  }
})

mongoose.model('Counter', CommentSchema)
