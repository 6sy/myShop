let Router = require('koa-router')
const router = new Router()
let userModel = require('../../model/userModel')
let tools = require('../../util/tools')
let bcrypt = require('bcryptjs')
const jwt = require('koa-jwt')
const jsonwebtoken = require('jsonwebtoken')
let app = require('../../index')
let qs = require('qs')

// 注册
router.post('/register', async ctx => {
  ctx.request.body = qs.parse(ctx.request.body)
  ctx.request.body.user_password = tools.enbcrypt(ctx.request.body.user_password)
  const result = await userModel.create(ctx.request.body)
  if (result) {
    ctx.body = { success: true }
  } else {
    ctx.body = { success: false }
  }
})
// 登录
router.post('/login', async ctx => {
  ctx.request.body = qs.parse(ctx.request.body)
  const result = await userModel.find({ user_account: ctx.request.body.user_account })
  if (result.length == 0) {
    ctx.body = {
      success: false
    }
  } else {
    let www = await bcrypt.compareSync(ctx.request.body.user_password, result[0].user_password)
    // 验证通过
    if (www) {
      // 生成token
      let token = jsonwebtoken.sign({ user: ctx.request.body.user_account }, 'shhhh')
      ctx.response.set('my-token', token)
      ctx.body = { success: true }
    }
    // 密码错误
    else {
      ctx.status = 404
      ctx.body = {
        msg: '账号密码错误',
        success: false
      }
    }
  }
})

// 获取token
router.get('/test', async ctx => {
  console.log(ctx.request.headers['my-token'])
  console.log(ctx.state.user)
})

// 验证账号重复性
router.post('/account', async ctx => {
  ctx.request.body = qs.parse(ctx.request.body)
  console.log(ctx.request.body)
  const result = await userModel.find(ctx.request.body)
  if (result.length == 0) {
    ctx.body = { success: true }
  } else {
    ctx.body = { success: false }
  }
})

router.get('/asd', async ctx => {
  ctx.body = 'Nihao'
})
module.exports = router.routes()