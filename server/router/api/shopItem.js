let Router = require('koa-router')
const router = new Router()
let shopModel = require('../../model/shopItem')
let qs = require('qs')

router.get('/addShop', async ctx => {
  const result = await shopModel.create({
    s_uid: 13,
    s_vip: 13,
    s_isOK: 'Y',
    s_type: '男装',
    s_msg: '2019夏季衬衫男小清新宽松潮流青年长袖寸衫韩版休闲衬衣薄款',
    s_newPrice: 78,
    s_oldPrice: 150,
    s_collect: 1,
    s_img_one: 'https://s5.mogucdn.com/mlcdn/55cf19/190702_550chd5j1kdjd3bg25l5a5gbdh5j0_640x960.jpg_360x480.v1cAC.40.webp',
    s_transport: '免递费',
    s_adress: '青岛',
    s_img_more: [
      'https://s11.mogucdn.com/mlcdn/55cf19/190702_550chd5j1kdjd3bg25l5a5gbdh5j0_640x960.jpg_640x960.v1cAC.70.webp',
      'https://s5.mogucdn.com/mlcdn/c45406/191010_0g53hd76f8de4e3h9h22ejk6dlegg_640x960.jpg_640x960.v1cAC.70.webp',
      'https://s5.mogucdn.com/mlcdn/c45406/191010_6g5lahi1hai5ak4l051ljb9jb0cc1_640x960.jpg_640x960.v1cAC.70.webp'
    ],
    s_sendDescribe: [
      '72小时发货',
      '退货补运费',
      '七天无理由退货'
    ],
    s_shop_type: JSON.stringify({
      '红色': {
        'LL': 81,
        'XL': 70,
        'SL': 60
      },
      '灰色': {
        'LL': 81,
        'XL': 70,
        'SL': 100
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
    s_shop_vendre: 3570,
    s_shop_mes: JSON.stringify({
      img: 'https://s5.mogucdn.com/mlcdn/c45406/180331_4kf2jgc315c989kachgga3g1fdlhj_200x200.jpg_120x120.webp',
      name: "潮品",
      number: 5,
      shopItem: 50,
      lovePerson: 15023,
      vendre: 26.7,
    })
  })
  if (result) {
    console.log(result)
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
    firstRes = true
    const result = await shopModel.find({})
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






module.exports = router.routes()
