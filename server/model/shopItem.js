let mongoose = require('mongoose')
let Schema = mongoose.Schema
let shopSchema = new Schema({
  // 唯一标识
  s_uid: {
    type: Number,
    required: true,
    unique: true
  },
  // 权重
  s_vip: {
    type: Number,
    required: true
  },
  // 类型  
  s_type: {
    type: String,
    required: true
  },
  // 描述信息
  s_msg: {
    type: String,
    required: true,
  },
  // 当前价钱
  s_newPrice: {
    type: Number,
    required: true
  },
  // 原价
  s_oldPrice: {
    type: Number,
    required: true
  },
  // 收藏人数
  s_collect: {
    type: Number,
    default: 0
  },
  // 展示首页照片
  s_img_one: {
    type: String,
    required: true
  },
  // 运费
  s_transport: {
    type: String,
    required: true
  },
  // 发货地点
  s_adress: {
    type: String,
    required: true
  },
  // 轮播照片
  s_img_more: {
    type: Array
  },
  // 发货信息描述
  s_sendDescribe: {
    type: Array
  },
  // 样式种类描述 ‘请选择颜色尺寸’
  s_shop_type: {
    type: JSON
  },
  // 评论信息
  s_shop_recommend: {
    type: Array
  },
  s_shop_vendre: {
    type: Number,
    default: 0
  },
  s_shop_mes: {
    type: Array,
  }
})

let shopModel = mongoose.model('shopItem', shopSchema)
module.exports = shopModel