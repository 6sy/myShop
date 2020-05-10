let Router = require('koa-router')
const router = new Router()
let userModel = require('../../model/userModel')
let tools = require('../../util/tools')
let bcrypt = require('bcryptjs')
const jwt = require('koa-jwt')
const jsonwebtoken = require('jsonwebtoken')
let qs = require('qs')
const multer = require('@koa/multer');
const upload = multer()
const fs = require('fs')
const path = require('path')

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
  console.log(1)
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
      ctx.body = {
        msg: '账号密码错误',
        success: false
      }
    }
  }
})

// 获取用户信息
router.get('/userInfo', async ctx => {
  let user = ctx.state.user.user
  let obj = { user_account: user }
  const result = await userModel.find(obj)
  if (result.length == 0) {
    ctx.body = { success: false, status: 400 }
  } else {
    ctx.body = { success: true, data: result[0] }
  }
})

// 获取token
router.get('/test', async ctx => {
  console.log(ctx.request)
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
// 添加用户用户搜索历史
router.post('/searchHistory', async ctx => {
  let user = ctx.state.user.user
  let obj = { user_account: user }
  ctx.request.body = qs.parse(ctx.request.body)
  const result = await userModel.find(obj)
  if (result.length == 0) {
    ctx.body = { success: false, status: 400 }
  } else {
    let searchHistory = result[0]['user_searchHy']
    searchHistory.unshift(ctx.request.body.searchText)
    const result1 = await userModel.updateOne(obj, { user_searchHy: searchHistory })
    if (result1) {
      ctx.body = {
        success: true,
        status: 200,
      }
    } else {
      ctx.body = {
        success: false,
        status: 400
      }
    }
  }
})
// 获取用户搜索信息
router.get('/searchHistory', async ctx => {
  let user = ctx.state.user.user
  let obj = { user_account: user }
  const result = await userModel.find(obj)
  if (result.length == 0) {
    ctx.body = { success: false, status: 400 }
  } else {
    ctx.body = { success: true, status: 200, data: result[0]['user_searchHy'] }
  }
})
// 删除用户搜索信息
router.get('/deletrSearchHistory', async ctx => {
  let user = ctx.state.user.user
  let obj = { user_account: user }
  const result = await userModel.updateOne(obj, { user_searchHy: [] })
  if (result) {
    ctx.body = { success: true, status: 200 }
  } else {
    ctx.body = { success: false, status: 400 }
  }
})
router.get('/asd', async ctx => {
  ctx.body = 'Nihao'
})
// 收藏商品
router.post('/addCollect', async ctx => {
  ctx.request.body = qs.parse(ctx.request.body)
  let user = ctx.state.user.user
  let obj = { user_account: user }
  const result = await userModel.find(obj)
  if (result.length > 0) {
    result[0].user_collect.push(ctx.request.body.uid)
    const result1 = await userModel.updateOne(obj, { user_collect: result[0].user_collect })
    if (result1) {
      ctx.body = { success: true }
    }
  }
})
// 取消收藏商品
router.post('/deleteCollect', async ctx => {

  ctx.request.body = qs.parse(ctx.request.body)
  let user = ctx.state.user.user
  let obj = { user_account: user }
  const result = await userModel.find(obj)
  if (result.length > 0) {
    let arr = result[0].user_collect
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == ctx.request.body.uid) {
        arr.splice(i, 1)
      }
    }
    console.log(arr)
    const result1 = await userModel.updateOne(obj, { user_collect: arr })
    if (result1) {
      ctx.body = { success: true }
    }
  }
})
// 添加购物车
router.post('/addCart', async ctx => {
  let order = ctx.request.body = qs.parse(ctx.request.body)
  console.log(order)
  let user = ctx.state.user.user
  let obj = { user_account: user }
  const result = await userModel.find(obj)
  if (result.length > 0) {
    // let cart = JSON.parse(result[0]['user_cart'])
    let cart = result[0]["user_cart"]
    if (!cart[order.shop]) {
      cart[order.shop] = []
      cart[order.shop].push(order)
    } else {
      let aa = cart[order.shop].some((item) => {
        if (item.uid === order.uid) {
          item.num = Number(order.num) + Number(item.num)
          return true
        } else {
          return false
        }
      })
      if (!aa) {
        cart[order.shop].push(order)
      }

    }
    const result1 = await userModel.updateOne(obj, { user_cart: cart })
    if (result1) {
      ctx.body = { success: true }
    }
  }
})
// 获取用户订单
router.get('/getCart', async ctx => {
  let user = ctx.state.user.user
  let obj = { user_account: user }
  const result = await userModel.find(obj)
  let result1 = result[0]['user_cart']
  console.log(result1)
  result1 = JSON.parse(result1)


  if (result.length > 0) {
    ctx.body = {
      data: result[0]
    }
  }
})
// 添加地址
router.post('/addAdress', async ctx => {
  ctx.request.body = qs.parse(ctx.request.body)
  let user = ctx.state.user.user
  let obj = { user_account: user }
  const result = await userModel.find(obj)
  let adress = result[0]['user_adress']
  adress.push(ctx.request.body)
  const result1 = await userModel.updateOne(obj, { user_adress: adress })
  if (result1) {
    ctx.body = { success: true }
  }
})
// 获取地址
router.get('/getAdress', async ctx => {
  let user = ctx.state.user.user
  let obj = { user_account: user }
  const result = await userModel.find(obj)
  if (result.length > 0) {
    ctx.body = { success: true, data: result[0]['user_adress'] }
  }
})
// 修改地址
router.post('/modifyAdress', async ctx => {

})
// 删除地址
router.post('/deleteAdress', async ctx => {

})
// 提交订单
router.post('/submitOrder', async ctx => {
  ctx.request.body = qs.parse(ctx.request.body)
  let user = ctx.state.user.user
  let obj = { user_account: user }
  const result = await userModel.find(obj)
  if (result.length > 0) {
    let arr = result[0]['user_order']
    arr.push(ctx.request.body)
    const result1 = await userModel.updateOne(obj, { user_order: arr })
    if (result1) {
      ctx.body = { success: true }
    }
  }
})
// 获取订单
router.get('/getOrder', async ctx => {
  let user = ctx.state.user.user
  let obj = { user_account: user }
  const result = await userModel.find(obj)
  if (result.length > 0) {
    ctx.body = { success: true, data: result[0]['user_order'] }
  }
})
// 上传头像
router.post('/upload', upload.single('file'), async ctx => {
  let time = new Date().getTime()
  let user = ctx.state.user.user
  console.log(user)
  let imgPath = 'F:\\myShop\\server\\public\\image\\'
  // 写入照片
  fs.writeFile(imgPath + ctx.request.file.originalname + time + '.png', ctx.request.file.buffer, function (err) {
    console.log(err)
  })
  // 获取修改后照片地址
  let url = 'http://127.0.0.1:3000/image/' + 'blob' + time + '.png'
  // 修改数据库
  const result = await userModel.update({ user_account: user }, { user_img: url })
  if (result) {
    ctx.body = { success: true, url }
  }
})
module.exports = router.routes()