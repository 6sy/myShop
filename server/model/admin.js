let mongoose = require('mongoose')
let Schema = mongoose.Schema
let userSchema = new Schema({
  account: {
    type: String,
    required: true
  },
  password: {
    type: String, required: true
  },
  type: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now()
  },
  del: {
    type: String,
    default: 'N'
  }
})

let userModel = mongoose.model('admin', userSchema)
module.exports = userModel