let mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)

// 定义数据库名
const DB_NAME = 'shop'
// 定义数据库地址
const DB_URL = 'localhost:27017'
// 连接数据库
module.exports = new Promise((resolve, reject) => {
  // 连接数据库
  mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`)
  // 监听连接状态
  mongoose.connection.on('open', err => {
    if (!err) {
      resolve()
      console.log('数据库连接成功')
    } else {
      console.log(err)
      reject(err)
    }
  })
})