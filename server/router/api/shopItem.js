let Router = require('koa-router')
const router = new Router()
let shopModel = require('../../model/shopItem')
let userModel = require('../../model/userModel')
let qs = require('qs')

router.post('/addShop', async ctx => {
  console.log(ctx.request.body)
  const item=ctx.request.body
  const result= await shopModel.find()
  const length=result.length
  console.log(length)
  const result1 = await shopModel.create({
    s_uid: length+1,
    s_vip: 14,
    s_isOK: 'Y',
    s_type:item.name,
    s_msg: item.msg,
    s_newPrice: item.nowPrice,
    s_oldPrice: item.oldPrice,
    s_collect: 0,
    s_img_one: item.img_one,
    s_transport: item.transport,
    s_adress: item.adress,
    s_img_more: item.swiper,
    s_sendDescribe: [
      '72小时发货',
      '退货补运费',
      '七天无理由退货'
    ],
    s_shop_type: JSON.stringify({
      [item.color[0]]: {
        [item.size[0]]: 100,
        [item.size[1]]: 100
      },
      [item.color[1]]: {
        [item.size[0]]: 100,
        [item.size[1]]: 100
      }
    }),
    s_shop_recommend: [
      {
        img: "https://s5.mogucdn.com/mlcdn/5abf39/170905_05e728k60954e0c5a4j277dljbjal_100x100.jpg_48x48.webp",
        name: 'ysy',
        text: '这个非常非常好看',
        date: '2019-10-4'
      },
      {
        img: 'https://s11.mogucdn.com/mlcdn/5abf39/190701_766c82j8ljiedd95jlbljeac3eai6_132x132.jpg_48x48.webp',
        name: 'dash',
        text: 'xihuanxihuan',
        date: '2019-7-4'
      }
    ],
    s_shop_vendre: 0,
    s_shop_mes: JSON.stringify({
      img: 'https://s5.mogucdn.com/mlcdn/c45406/180331_4kf2jgc315c989kachgga3g1fdlhj_200x200.jpg_120x120.webp',
      name: "潮品",
      number: 5,
      shopItem: 50,
      lovePerson: 15023,
      vendre: 26.7,
    })
  })
  if (result1) {
    ctx.body={
      success:true
    }
  }
})
let firstRes = false
let goodsList = []
router.post('/getGoodsList', async ctx => {
  ctx.request.body = qs.parse(ctx.request.body)
  let query = ctx.request.body.query
  let num = ctx.request.body.num
  let allList = query * num
  if (!firstRes) {
    // firstRes = true
    let result = await shopModel.find({})
    // 权重值
    let list=[]
    // result=result.filter(item=>item.s_vip>0)
    for(let i=0;i<result.length;i++){
      if(result[i].s_vip>0){
        list.push(result[i])
      }
    }
    result=list
    console.log(result)
    if (result.length > 0) {
      goodsList = result
      ctx.body = goodsList.slice((query - 1) * num, allList)

    } else {
      ctx.body = { success: false }
    }
  } else {
    ctx.body = goodsList.slice((query - 1) * num, allList)
  }
})

router.post('/getDetail', async ctx => {
  ctx.request.body = qs.parse(ctx.request.body)
  const reslut = await shopModel.find(ctx.request.body)
  if (reslut.length > 0) {
    ctx.body = reslut[0]
  } else {
    console.log(reslut)
  }
})
// 搜索商品
router.post('/searchGoods', async ctx => {
  ctx.request.body = qs.parse(ctx.request.body)
  const reg = new RegExp(ctx.request.body['s_msg'], 'i')
  const reslut = await shopModel.find({ $or: [{ s_msg: reg }, { s_type: reg }] })
  if (reslut.length > 0) {
    ctx.body = reslut
  } else {
    ctx.body = reslut
  }
})

// 商品上架 下架
router.post('/handle',async ctx=>{
  const state=ctx.request.body.state
  const id=ctx.request.body.id
  const result=await shopModel.update({s_uid:id},{s_vip:state==0?-1:1})

  ctx.body={
    success:true
  }
})

// 获取收藏列表
router.get('/getCollectList',async ctx=>{
  let user = ctx.state.user.user
  const result=await userModel.find({user_account:user})
  const result1=await shopModel.find()

  let list=result[0].user_collect
console.log(result)
  let shopList=[]
  for(let i=0;i<list.length;i++){
    for(let j=0;j<result1.length;j++){
      if(list[i]==result1[j].s_uid){
        shopList.push(result1[j])
      }
    }
  }
console.log(111,shopList)
  ctx.body={
    success:true,
    data:shopList
  }


})
// {
//   s_uid: length+1,
//   s_vip: 14,
//   s_isOK: 'Y',
//   s_type:item.shop,
//   s_msg: '2019夏季衬衫男小清新宽松潮流青年长袖寸衫韩版休闲衬衣薄款',
//   s_newPrice: 78,
//   s_oldPrice: 150,
//   s_collect: 1,
//   s_img_one: 'https://s5.mogucdn.com/mlcdn/55cf19/190702_550chd5j1kdjd3bg25l5a5gbdh5j0_640x960.jpg_360x480.v1cAC.40.webp',
//   s_transport: '免递费',
//   s_adress: '青岛',
//   s_img_more: [
//     'https://s11.mogucdn.com/mlcdn/55cf19/190702_550chd5j1kdjd3bg25l5a5gbdh5j0_640x960.jpg_640x960.v1cAC.70.webp',
//     'https://s5.mogucdn.com/mlcdn/c45406/191010_0g53hd76f8de4e3h9h22ejk6dlegg_640x960.jpg_640x960.v1cAC.70.webp',
//     'https://s5.mogucdn.com/mlcdn/c45406/191010_6g5lahi1hai5ak4l051ljb9jb0cc1_640x960.jpg_640x960.v1cAC.70.webp'
//   ],
//   s_sendDescribe: [
//     '72小时发货',
//     '退货补运费',
//     '七天无理由退货'
//   ],
//   s_shop_type: JSON.stringify({
//     '红色': {
//       'LL': 81,
//       'XL': 70,
//       'SL': 60
//     },
//     '灰色': {
//       'LL': 81,
//       'XL': 70,
//       'SL': 100
//     }
//   }),
//   s_shop_recommend: [
//     {
//       img: "https://s5.mogucdn.com/mlcdn/5abf39/170905_05e728k60954e0c5a4j277dljbjal_100x100.jpg_48x48.webp",
//       name: 'ysy',
//       text: '这个非常非常好看',
//       date: '2019-10-4'
//     },
//     {
//       img: 'https://s11.mogucdn.com/mlcdn/5abf39/190701_766c82j8ljiedd95jlbljeac3eai6_132x132.jpg_48x48.webp',
//       name: 'dash',
//       text: 'xihuanxihuan',
//       date: '2019-7-4'
//     }
//   ],
//   s_shop_vendre: 3570,
//   s_shop_mes: JSON.stringify({
//     img: 'https://s5.mogucdn.com/mlcdn/c45406/180331_4kf2jgc315c989kachgga3g1fdlhj_200x200.jpg_120x120.webp',
//     name: "潮品",
//     number: 5,
//     shopItem: 50,
//     lovePerson: 15023,
//     vendre: 26.7,
//   }

module.exports = router.routes()
