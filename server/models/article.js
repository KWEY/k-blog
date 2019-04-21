const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  type: [
    {
      type: String,
      default: '001_001'
    }
  ],
  views: {
    type: Number,
    default: 0
  },
  like: {
    type: Array,
    default: []
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  previous_article: {
    type: Object,
    default: null
  },
  next_article: {
    type: Object,
    default: null
  },
  created_at: {
    type: Number,
    default: Date.now
  },
  updated_at: {
    type: Number,
    default: Date.now
  }
})

ArticleSchema.options.toJSON = {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    ret.id = ret._id
    delete ret._id
  }
}

mongoose.model('Article', ArticleSchema)
