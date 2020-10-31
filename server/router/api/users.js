let Router = require('koa-router')
const router = new Router()
let userModel = require('../../model/userModel')
let adminModel=require('../../model/admin')
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
  let imgPath = 'F:\\myShop\\server\\public\\image\\'
  // 写入照片
  fs.writeFile(imgPath + ctx.request.file.originalname + time + '.png', ctx.request.file.buffer, function (err) {
  })
  // 获取修改后照片地址
  let url = 'http://127.0.0.1:3000/image/' + 'blob' + time + '.png'
  // 修改数据库
  const result = await userModel.update({ user_account: user }, { user_img: url })
  if (result) {
    ctx.body = { success: true, url }
  }
})


// 删除用户购物车
router.post('/deleteCart',async ctx=>{
  let user = ctx.state.user.user
  ctx.request.body = qs.parse(ctx.request.body)
  let shopName=ctx.request.body.obj
  let index=ctx.request.body.index
  const result=await userModel.find({user_account:user})
  if(result.length){
    let cartList=result[0].user_cart
    // 删除逻辑
    cartList[shopName].splice(index,1)
    if(cartList[shopName].length==0){
      console.log('2222222',cartList)
      delete cartList[shopName]
      console.log(cartList)
    }
    const result1=await userModel.update({user_account:user},{user_cart:cartList})
    if(result1){
      ctx.body=({success:true})
    }
  }
})

// 删除地址
router.post('/deleteAdress',async ctx=>{
  let user = ctx.state.user.user
  let index=ctx.request.body.index
  const result=await userModel.find({user_account:user})
  let adressList=result[0].user_adress
  adressList.splice(index,1)
  const result1=await userModel.update({user_account:user},{user_adress:adressList})
  if(result1){
    ctx.body=({success:true})
  }
})

// 修改地址
router.post('/editAdress',async ctx=>{
  let user = ctx.state.user.user
  let index=ctx.request.body.editIndex
  // 
  let adress=ctx.request.body
  const result=await userModel.find({user_account:user})
  let adressList=result[0].user_adress
  adressList[index]=adress
  const result1=await userModel.update({user_account:user},{user_adress:adressList})
  if(result1){
    ctx.body=({success:true})
  }
})

// 支付成功
router.post('/pay',async ctx=>{
  let user = ctx.state.user.user
  let orderId=ctx.request.body.orderId
  const result=await userModel.find({user_account:user})
  let orderList=result[0].user_order
  orderList.forEach((element,index) => {
    if(element.orderId===orderId){
      orderList[index].state=1
    }
  });
  const result1=await userModel.update({user_account:user},{user_order:orderList})
  if(result1){
    ctx.body=({success:true})
  }

})


// recmoned

router.get('/getUsers',async ctx=>{
  const result=await userModel.find()
  if(result.length){
    ctx.body={
      success:true,
      data:result
    }
  }
})

router.get('/getOrders',async ctx=>{
  let orderList=[]
  const result=await userModel.find()
})

// 发货
router.post('/sendProduct',async ctx=>{
  let orderId=ctx.request.body.id
  let user=ctx.request.body.user
  let result=await userModel.find({user_account:user})
  result=result[0]
  if(result.user_order.length){
    for(let i=0;i<result.user_order.length;i++){
      if(result.user_order[i].orderId==orderId){
        result.user_order[i].state=2
      }
    }
  }
  let result1=await userModel.update({user_account:user},{user_order:result.user_order})
  ctx.body={
    success:true
  }
})

module.exports = router.routes()