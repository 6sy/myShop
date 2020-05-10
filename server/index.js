let koa = require('koa')
let Router = require('koa-router')
let users = require('./router/api/users')
let db = require('./db/index')
var bodyParser = require('koa-bodyparser')
let jwt = require('koa-jwt')
let serve = require('koa-static')
let shops = require('./router/api/shopItem')
let app = new koa()
let router = new Router()
let cors = require('koa2-cors')

// socket.io
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)
const port = 8081
// 跨域
// app.use(cors())
// 静态资源
app.use(serve(__dirname + "/public"))

app.use(bodyParser())
// 坑，要使用async await 设置，否则响应不了数据
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', '*')
  ctx.set("Access-Control-Expose-Headers", '*')
  await next()
})

app.use(jwt({ secret: 'shhhh', passthrough: true }))
db.then(() => {
  // 配置路由地址
  router.use('/api/users', users)
  // 配置商品
  router.use('/api/shops', shops)
})
// socket.io
// 在线列表
let ioObj = {}
let id
io.on('connection', socket => {
  id = socket.id
  socket.on('login', data => {
    // data名字 id 唯一id
    ioObj[data] = id

  })
  // 发送私人消息
  socket.on('sendPriMes', data => {
    console.log(data, ioObj)
    // 传递私人消息
    io.to(ioObj[data.otherName]).emit('privateMsg', data)
  })
})

app.use(router.routes()).use(router.allowedMethods())
server.listen(3000)
