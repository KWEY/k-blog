const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  id: {
    type: Number
  },
  role: {
    type: String,
    default: 'user'
  },
  email: {
    type: String,
    default: ''
  },
  tel: {
    type: Number
  },
  motto: {
    type: String,
    default: ''
  },
  username: {
    type: String
  },
  password: {
    type: String
  },
  avatar: {
    type: String,
    default: 'avatar.png'
  },
  articles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Article'
    }
  ],
  following: {
    type: Number,
    default: 0
  },
  followers: {
    type: Number,
    default: 0
  },
  like: {
    type: Number,
    default: 0
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

// 隐藏一些字段
UserSchema.options.toJSON = {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.password
  }
}
mongoose.model('User', UserSchema)
