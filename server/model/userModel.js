let mongoose = require('mongoose')
let Schema = mongoose.Schema
// 约束对象
let userSchema = new Schema({
  // 账号
  user_account: {
    type: String,
    required: true,//限制学号必填信息
    unique: true    //限制学号唯一性
  },
  // 密码
  user_password: {
    type: String,
    required: true,
  },
  // 日期
  date: {
    type: Date,
    default: Date.now()
  },
  // 会员
  user_member: {
    type: String,
    default: 'N'
  },
  // 签名
  user_autograph: {
    type: String,
    default: '开心每一天'
  },
  user_img: {
    type: String,
    default: 'http://img3.imgtn.bdimg.com/it/u=2174458467,2571103924&fm=11&gp=0.jpg'
  },
  // 是否存在
  enable_flag: {
    type: String,
    default: 'Y'
  },
})

// 创建模型对象
// 第一个参数与集合对应，第二个对象指定约束对象实例
let usersModel = mongoose.model('users', userSchema)
module.exports = usersModel