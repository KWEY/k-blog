const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StatisticalSchema = new Schema({
  id: {
    type: String,
    default: 'data'
  },
  cvisit: {
    type: Number
  },
  cview: {
    type: Number
  }
})

mongoose.model('Statistical', StatisticalSchema)
