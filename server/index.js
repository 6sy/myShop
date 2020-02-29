let koa = require('koa')
let Router = require('koa-router')
let users = require('./router/api/users')
let db = require('./db/index')
var bodyParser = require('koa-bodyparser')
let jwt = require('koa-jwt')
let serve = require('koa-static')

let app = new koa()
let router = new Router()
// 静态资源
app.use(serve(__dirname + "/public"));

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
})


app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
