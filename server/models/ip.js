const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IpSchema = new Schema({
  ip: {
    type: String,
    default: '',
  },
  range: {
    type: Array,
    default: []
  },
  date: {
    type: String,
    default: ''
  },
  hour: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  },
  region: {
    type: String,
    default: ''
  },
  eu: {
    type: String,
    default: ''
  },
  timezone: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  ll: {
    type: Array,
    default: []
  },
  metro: {
    type: Number,
    default: 0
  },
  area: {
    type: Number,
    default: 0
  }
})

IpSchema.options.toJSON = {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    ret.id = ret._id
    delete ret._id
  }
}

mongoose.model('Ip', IpSchema)
