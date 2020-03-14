<template >
  <div class='good'>
    <!-- head -->
    <headApp></headApp>
    <!-- swiper -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
             v-for='(item,index) in detail.s_img_more'
             :key='index'><img :src='item'
               alt=""></div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
    <!-- price -->
    <div class='price-number'>
      <span>¥{{detail.s_newPrice}}</span>
      <span>¥{{detail.s_oldPrice}}</span>
      <span>{{remise}}折</span>
    </div>
    <!--  describle-->
    <div class='describle'>
      <div>{{detail.s_msg}}</div>
      <div>
        <span>{{detail.s_transport}}</span>
        <span>{{detail.s_adress}}</span>
      </div>
    </div>
    <!-- service -->
    <div class='service'>
      <div class='service-div'>
        <div v-for='(item,index) in detail.s_sendDescribe'
             :key='index'><img src="https://s10.mogucdn.com/mlcdn/c45406/180417_25kbfg1c3hdbd120394ji4b11bk2k_36x36.png_80x80.v1cAC.40.webp"
               alt="">{{item}}</div>
        <span class='iconfont icon-qianjin'></span>
      </div>
    </div>
    <!-- select -->
    <div class='select'
         @click='goBuy'>
      <div>请选择：尺码</div>
      <div><span class='iconfont icon-qianjin'
              style='font-size:12px'></span></div>
    </div>
    <!-- reconmend -->
    <div class='reconmend'>
      <div class='reconmend-head'>
        <div>买家评价 {{recommend.length}} | 销量 {{recommend.length}} </div>
        <div><span class='iconfont icon-qianjin'
                style='font-size:12px'></span></div>
      </div>
      <div class='tag'
           v-show='false'>
      </div>
      <div class='user'
           v-for='(item,index) in recommend'
           :key='index'>
        <div class='img-name'>
          <img :src="item.img"
               alt="">
          {{item.name}}
        </div>
        <div class='user-text'>
          {{item.text}}
        </div>
        <div class='user-time'>{{item.date}}</div>
      </div>
    </div>
    <!-- shop -->
    <div class='shop'>
      <div class='shop-div'>
        <div><img :src="shop.img"
               alt=""></div>
        <div style=' padding-left: 10px;'>
          <div id='shop-div1'>
            <div>{{shop.name}}</div>
            <div><span class='iconfont icon-qianjin'
                    style='font-size:12px'></span></div>
          </div>
          <div id='shop-div2'>
            <div>
              <img v-for='(item,index) in Array(shop.number)'
                   :key='index'
                   src="https://s10.mogucdn.com/mlcdn/c45406/200205_2eg19cl3528hj8ihbc21ci5l0k857_44x44.png"
                   alt=""
                   style='width:10px;height:10px'>
            </div>
            <div>在售商品{{shop.shopItem}}</div>
          </div>
          <div id='shop-div3'>
            <span>{{shop.lovePerson}}人关注</span>
            <span>累计销量{{shop.vendre}}万+</span>
          </div>
        </div>
      </div>
    </div>
    <!-- bottom -->
    <div class='bottom-nar'>
      <div><span class='iconfont icon-shoppingcopy'
              style='font-size:20px'></span>
        <span>店铺</span></div>
      <div>
        <span class='iconfont icon-xiaoxi'
              style='color:red;font-size:20px;'></span>
        <span>客服</span>
      </div>
      <div @click='collect'
           :class='{red:isCollect}'>
        <span class='iconfont icon-collect'></span>
        <span>收藏</span>
      </div>
      <div>加入购物车</div>
      <div>购买商品</div>
    </div>
    <!-- gocart -->
    <div class='bottom-buy'
         v-show='isShowBuy'>
      <div class='bottom-buy-head'>
        <div><img :src="detail.s_img_one"
               alt=""></div>
        <div>
          <div>¥{{detail.s_newPrice}}</div>
          <div>库存1245</div>
          <div>已选择:{{isShop_type+' ' +isShop_size}}</div>
        </div>
      </div>
      <div class='bottom-buy-type'>
        <p>颜色</p>
        <div>
          <div v-for='(item,index) in shop_type'
               :key='index'
               @click='changeType(item)'
               :class='item===isShop_type?"red":""'>{{item}}</div>

        </div>
      </div>
      <div class='bottom-buy-size'>
        <p>尺寸</p>
        <div>
          <div v-for='(item,index) in shop_size'
               :key='index'
               @click='changeSize(item)'
               :class='item===isShop_size?"red":""'>{{item}}</div>
        </div>
      </div>
      <p style='font-size:12px'>数量</p>
      <div class='bottom-buy-num'>
        <div @click='num--'>-</div>
        <div>{{num}}</div>
        <div @click='num++'>+</div>
      </div>
      <div class='bottom-buy-bottom'>
        <div @click='addCart'>加入购物车</div>
        <div>立即购买</div>
      </div>
      <div class='bottom-buy-delete'
           @click='isShowBuy=!isShowBuy'>X</div>
    </div>
    <!-- filter -->
    <div style='width:375px;height:100vh'
         :class={all:isShowBuy}
         v-show='isShowBuy'></div>
  </div>
</template>

<script>
import headApp from '../profile/head'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
  components: {
    headApp
  },
  data () {
    return {
      detail: {},
      recommend: [],
      shop: {},
      isShowBuy: false,
      num: 1,
      isShop_type: '',
      isShop_size: '',
      shop_type: [],
      shop_size: [],
      shopType: {},
      isCollect: false
    }
  },
  computed: {
    // 折扣
    remise () {
      return Math.floor(this.detail.s_newPrice / this.detail.s_oldPrice * 10)
    }
  },
  created () {
    new Swiper('.swiper-container', {
      spaceBetween: 30,
      centeredSlides: true,
      initialSlide: 0,
      observer: true,
      observerParents: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    })
    this.getDetail()
    this.IsCollect()
  },
  watch: {
    num (newVal) {
      if (newVal < 1) {
        this.num = 1
      }
    }
  },
  methods: {
    //获取商品信息
    async getDetail () {
      let id = this.$route.params.id
      let obj = { s_uid: id }
      const result = await this.$http({
        method: 'post',
        url: 'api/shops/getDetail',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: this.$qs.stringify(obj)
      })
      this.detail = result.data
      this.recommend = result.data.s_shop_recommend
      this.shop = JSON.parse(this.detail.s_shop_mes)
      this.shopType = JSON.parse(this.detail.s_shop_type)

      this.handleType(this.shopType)
    },
    async collect () {
      // 收藏
      if (!this.isCollect) {
        const result = await this.$http({
          method: 'post',
          url: 'api/users/addCollect',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          data: this.$qs.stringify({ uid: this.$route.params.id })
        })
        console.log(result)
        this.isCollect = true
      } else {
        const result = await this.$http({
          method: 'post',
          url: 'api/users/deleteCollect',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          data: this.$qs.stringify({ uid: this.$route.params.id })
        })
        console.log(result)
        this.isCollect = false
      }

    },
    // 获取用户收藏
    async IsCollect () {
      const result = await this.$http({
        method: 'get',
        url: 'api/users/userInfo',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      console.log(result)
      let collects = result.data.data.user_collect
      let id = this.$route.params.id
      for (let i = 0; i < collects.length; i++) {
        if (id == collects[i]) {
          this.isCollect = true
          return
        }
      }
    },

    //点击加入购物车
    goBuy () {
      this.isShowBuy = true
    },
    //处理商品类型
    handleType (obj) {
      this.shop_type = Object.keys(obj)
      this.isShop_type = this.shop_type[0]
      this.shop_size = Object.keys(obj[this.shop_type[0]])
      this.isShop_size = this.shop_size[0]
    },
    //点击改变颜色类型
    changeType (item) {
      this.shop_size = Object.keys(this.shopType[item])
      this.isShop_type = item
      this.isShop_size = this.shop_size[0]
    },
    //点击改变大小
    changeSize (item) {
      this.isShop_size = item
    },
    // 添加购物车
    async addCart () {
      let obj = {
        img: this.detail.s_img_one,
        text: this.detail.s_msg,
        type: this.isShop_type,
        size: this.isShop_size,
        price: this.detail.s_newPrice,
        num: this.num,
        shop: this.shop.name,
        uid: this.$route.params.id,
        isOk: false
      }
      await this.$http({
        method: 'post',
        url: 'api/users/addCart',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: this.$qs.stringify(obj)
      })
    }
  }
}
</script>
<style scoped>
.swiper-container {
  width: 330px;
  height: 390px;
}
.swiper-slide img {
  width: 100%;
  height: 100%;
}
.price-number {
  position: relative;
  padding-left: 15px;
  margin-top: 10px;
}
.price-number span:nth-child(1) {
  font-size: 36px;
}
.price-number span:nth-child(2) {
  font-size: 16px;
  color: #e3e3e3;
  text-decoration: line-through;
  position: absolute;
  top: 3px;
  right: 80px;
}
.price-number span:nth-child(3) {
  font-size: 12px;
  background: rgb(245, 182, 193);
  position: absolute;
  top: 25px;
  right: 80px;
  padding: 0 3px;
  color: red;
}
.describle {
  height: 43px;
  width: 375px;
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 15px;
  box-sizing: border-box;
}
.describle div:nth-child(1) {
  width: 267px;
  height: 26px;
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: initial;
  font-size: 15px;
}
.describle div:nth-child(2) {
  display: flex;
  font-size: 13px;
  color: #999999;
  justify-content: space-between;
}
.service {
  border-top: 13px #e5e5e5 solid;
  width: 100%;
  height: 38px;
  border-bottom: 13px #e5e5e5 solid;
}
.service-div {
  width: 345px;
  height: 20px;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 9px;
  margin-bottom: 9px;
  display: flex;
}
.service-div div {
  flex: 3;
  font-size: 12px;
  line-height: 20px;
}
.service-div div img {
  width: 15px;
  height: 15px;
  top: 2px;
  position: relative;
}

.service-div span {
  flex: 1;
  font-size: 12px;
  color: #999999;
  line-height: 20px;
  text-align: right;
}
.select {
  width: 100%;
  height: 35px;
  border-bottom: 10px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}
.select div {
  width: 100%;
  padding: 0 15px;
  line-height: 35px;
  color: #999999;
}
.select div:nth-child(2) {
  text-align: right;
}
.reconmend {
  padding: 10px 15px;
}
.reconmend-head {
  font-size: 12px;
  color: #999999;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.tag {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  height: 46px;
  overflow: hidden;
}
.tag div {
  padding: 0 3px;
  color: #ff2255;
  background-color: #ffe8ee;
  margin-right: 8px;
  margin-top: 5px;
  font-size: 12px;
  line-height: 18px;
}
.user .img-name {
  width: 100%;
  height: 41px;
  margin-top: 10px;
}
.user .img-name img {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  position: relative;
  top: 10px;
}
.user-text {
  text-overflow: ellipsis;
  overflow: hidden;
  margin-top: 10px;
  font-size: 13px;
}
.user-time {
  color: #999999;
  font-size: 10px;
  margin-top: 10px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e3e3e3;
}
.shop {
  width: 100%;
  height: 90px;
  border-top: 10px solid #e9e9e9;
  border-bottom: 10px solid #e9e9e9;
  margin-bottom: 44px;
}
.shop-div {
  width: 100%;
  height: 90px;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
}
.shop-div div:nth-child(1) img {
  width: 60px;
  height: 60px;
}
.shop-div div:nth-child(2) {
  display: flex;
  flex-direction: column;
  width: 100%;
}
#shop-div1 {
  width: 100%;
  display: flex;
  flex-direction: row;
  font-size: 15px;
}
#shop-div1 div {
  flex: 1;
}
#shop-div1 div:nth-child(2) {
  text-align: right;
  font-size: 12px;
  color: #999999;
}
#shop-div2 {
  display: flex;
  flex-direction: row;
}
#shop-div2 div:nth-child(1) {
  flex: 1;
}
#shop-div2 div:nth-child(2) {
  border-left: 1px solid #e9e9e9;
  font-size: 13px;
  flex: 3;
  padding-left: 10px;
}
#shop-div3 span {
  border: 1px solid #e3e3e3;
  border-radius: 5px;
  font-size: 10px;
  margin-right: 5px;
  color: #ff2255;
  padding: 0 3px;
}
.bottom-nar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: white;
  display: flex;
  font-size: 12px;
}
.bottom-nar div {
  flex: 1;
  border-right: 1px solid #e5e5e5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
}
.bottom-nar div:nth-child(4) {
  flex: 2;
  color: #ff5777;
  background-color: #ffe6e8;
}
.bottom-nar div:nth-child(5) {
  flex: 2;
  background: linear-gradient(90deg, #ff5777, #ff468f);
  color: #fff;
}
.bottom-buy {
  width: 100%;
  height: 350px;
  position: fixed;
  bottom: 0;
  background: white;
  z-index: 99;
}
.bottom-buy-head {
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  padding: 10px;

  display: flex;
}
.bottom-buy div:nth-child(1) div:nth-child(1) {
  width: 100px;
}
.bottom-buy div:nth-child(1) div:nth-child(1) img {
  width: 80px;
  height: 80px;
}
.bottom-buy-head div:nth-child(2) {
  display: flex;
  flex-direction: column;
}
.bottom-buy-head div:nth-child(2) div {
  flex: 1;
  line-height: 33.3px;
}
.bottom-buy-head div:nth-child(2) div:nth-child(1) {
  font-size: 28px;
  height: 30px;
}
.bottom-buy-head div:nth-child(2) div:nth-child(2) {
  font-size: 10px;
  height: 20px;
}
.bottom-buy-head div:nth-child(2) div:nth-child(3) {
  font-size: 12px;
  color: red;
}
.bottom-buy-type,
.bottom-buy-size {
  min-height: 60px;
  font-size: 12px;
}
.bottom-buy-type div,
.bottom-buy-size div {
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.bottom-buy-type div div,
.bottom-buy-size div div {
  border: 1px solid #e9e9e9;
  padding: 6px 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
.bottom-buy-num {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}
.bottom-buy-num div {
  width: 28px;
  height: 23px;
  border: 1px solid #e9e9e9;
  line-height: 23px;
  text-align: center;
  color: red;
}
.bottom-buy-bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
}
.bottom-buy-bottom div {
  flex: 1;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.bottom-buy-bottom div:nth-child(1) {
  color: #ff5777;
  background-color: #ffe6e8;
}
.bottom-buy-bottom div:nth-child(2) {
  color: #ffe6e8;
  background-color: #ff5777;
}
.bottom-buy-delete {
  position: absolute;
  font-size: 20px;
  color: #e5e5e5;
  left: 350px;
  top: 5px;
}

.all {
  position: fixed;
  width: 375px;
  height: 100vh;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0.7;
  z-index: 9;
  background: #999999;
}
.red {
  color: red;
}
</style>