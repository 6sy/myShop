<template>
  <div class='cart'>
    <!-- narBar -->
    <narBar class='narBar'>
      <div slot='left'
           @click='goBack'><span class='iconfont icon-tubiaozhizuo--'
              style=' font-size: 25px;'></span></div>
      <div slot='center'>购物车（{{isAllNum}}）</div>
    </narBar>
    <!-- 商品 -->
    <div class='cart-listItem'
         v-for='(item,index) in shop'
         :key='index'>
      <div class='cart-list-head'>
        <div class='cart-list-head-btn'
             @click='shopBtn(item)'><span :class='["iconfont", "icon-icon-test-copy"]'
                v-show='isShop[item]'></span></div>
        <div>{{item}}</div>
      </div>
      <div class='cart-list-item'
           v-for='(item1,index1) in cartList[item]'
           :key='index1'>
        <div class='cart-list-item-btn'
             @click="oneBtn(item1)"><span class='iconfont icon-icon-test-copy'
                v-show='item1["isOk"]'></span></div>
        <img :src="item1.img"
             alt="">
        <div class='cart-list-item-text'>{{item1.text}}</div>
        <span class='cart-list-item-dec'>颜色：{{item1.type+item1.size}}</span>
        <span class='cart-list-item-downPrice'>降价20元</span>
        <span class='cart-list-item-price'>${{item1.price}}</span>
        <div class='cart-list-item-number'>
          <span @click='item1.num--'>-</span>
          <span>{{item1.num}}</span>
          <span @click='item1.num++'>+</span>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class='bottom-nar'>
      <div class='cart-list-bottom-btn'
           @click='isAllBtn'><span class='iconfont icon-icon-test-copy'
              v-show='isBigBtn'></span></div>
      <div style='width:200px'>全选({{isComfirmNum}})</div>
      <div>￥{{isAllPrice}} </div>
      <div @click='goOrder'>结算</div>
    </div>
  </div>
</template>
<script>
import narBar from '../../common/NavBar/NavBar'
export default {
  components: {
    narBar
  },
  data () {
    return {
      cartList: {},
      shop: [],
      isShop: {
      },
      isBigBtn: false
    }
  },
  created () {
    this.getCart()
    this.changeBtn()
    this.isBigBtn = false
  },
  activated () {
    this.getCart()
    this.changeBtn()
    this.isBigBtn = false
  },
  computed: {
    // 总价钱
    isAllPrice () {
      let allPrice = 0;
      for (let i = 0; i < this.shop.length; i++) {
        this.cartList[this.shop[i]].forEach((item) => {
          if (item['isOk']) {
            allPrice = Number(allPrice) + Number(item.price) * Number(item.num)
          }
        })
      }
      return allPrice
    },
    isAllNum () {
      let allNum = 0;
      for (let i = 0; i < this.shop.length; i++) {
        this.cartList[this.shop[i]].forEach((item) => {
          allNum = Number(allNum) + Number(item.num)
        })
      }
      return allNum
    },
    isComfirmNum () {
      let allNum = 0;
      for (let i = 0; i < this.shop.length; i++) {
        this.cartList[this.shop[i]].forEach((item) => {
          if (item['isOk']) {
            allNum = Number(allNum) + Number(item.num)
          }
        })
      }
      return allNum
    }
  },
  methods: {
    async  getCart () {
      const result = await this.$http({
        method: 'get',
        url: 'api/users/userInfo',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      this.cartList = result.data.data["user_cart"]
      this.changeBtn()
      // 商店
      this.shop = Object.keys(this.cartList)
      this.shop.forEach((item) => {
        this.$set(this.isShop, item, false)
        this.cartList[item].forEach((arr) => {
          arr.isOk = JSON.parse(arr.isOk)
        })
      })
      console.log(this.cartList)
    },
    shopBtn (item) {
      this.isShop[item] = !this.isShop[item]
      if (!this.isShop[item]) {
        this.cartList[item].forEach(item1 => {
          item1.isOk = false
        })
      }
      this.change1Btn()
      this.changeBtn()
      this.change2btn()
    },
    isAllBtn () {
      this.isBigBtn = !this.isBigBtn
      if (this.isBigBtn === true) {
        for (let j = 0; j < this.shop.length; j++) {
          this.isShop[this.shop[j]] = true
        }
      } else {
        for (let i = 0; i < this.shop.length; i++) {

          this.isShop[this.shop[i]] = false
          this.cartList[this.shop[i]].forEach(item1 => {
            item1.isOk = false
          })
        }
      }
      this.change1Btn()
      this.changeBtn()
    },
    oneBtn (item) {
      console.log(1)
      item.isOk = !item.isOk
      this.changeBtn()
      this.change1Btn()
      this.change2btn()
    },
    // 判断商品全选按钮影响商店
    changeBtn () {
      for (let i = 0; i < this.shop.length; i++) {
        let result = this.cartList[this.shop[i]].every((item) => {
          item.isOk = JSON.parse(item.isOk)
          return item.isOk === true
        })
        if (result) {
          this.isShop[this.shop[i]] = true
        } else {
          this.isShop[this.shop[i]] = false
        }
      }
    },
    //     判断商店全选 影响商品
    change1Btn () {
      for (let j = 0; j < this.shop.length; j++) {
        if (this.isShop[this.shop[j]] == true) {
          this.cartList[this.shop[j]].forEach((item) => {
            item.isOk = true
          })
        }
      }
    },
    // 判断商店影响 全选
    change2btn () {
      let result = this.shop.every((item) => {
        return this.isShop[item] === true
      })
      if (!result) {
        this.isBigBtn = false
      } else {
        this.isBigBtn = true
      }
    },
    goBack () {
      this.$router.push('/home')
    },
    goOrder () {
      let obj = []
      for (let i = 0; i < this.shop.length; i++) {
        this.cartList[this.shop[i]].forEach((item) => {
          console.log(item['isOk'])
          if (item['isOk']) {
            obj.push(item)
          }
        })
      }
      if (obj.length === 0) {
        this.$alert.error('请选择商品', 1000)
        return true
      }
      this.$router.push({ name: 'order', params: { obj } })
    }
  }
}
</script>
<style scoped>
.cart {
  background: rgb(246, 246, 246);
  height: 100%;
  min-height: 667px;
}
.narBar {
  font-size: 20px;
  font-weight: 600;
  color: #999999;
  background: white;
}
.cart-listItem {
  box-sizing: border-box;
  margin: 15px;
  padding: 15px;
  background: white;
}
.cart-list-head {
  height: 24px;
  width: 100%;
  display: flex;
  font-weight: 600;
}
.cart-list-head-btn {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  border: 1px solid #999999;
  margin-right: 10px;
  font-weight: 100;
}
.cart-list-head-btn span {
  font-size: 22px;
  color: #ff5777;
  position: relative;
  top: -2px;
  left: -1px;
}
.cart-list-item {
  height: 132px;
  width: 100%;
  position: relative;
}
.cart-list-item-btn {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  border: 1px solid #999999;
  margin-right: 10px;
  position: absolute;
  top: 60px;
}
.cart-list-item-btn span {
  font-size: 22px;
  color: #ff5777;
  position: relative;
  top: -2px;
  left: -1px;
}
.cart-list-item img {
  width: 70px;
  height: 92px;
  position: absolute;
  left: 31px;
  top: 16px;
}
.cart-list-item-text {
  position: absolute;
  top: 19px;
  left: 113px;
  width: 200px;
  font-size: 13px;
}
.cart-list-item-dec {
  background: #f7f7f7;
  color: #ababab;
  position: absolute;
  top: 63px;
  left: 113px;
  font-size: 13px;
  padding: 1px;
}
.cart-list-item-downPrice {
  border: 1px solid #f46;
  color: #f46;
  font-size: 13px;
  position: absolute;
  top: 86px;
  left: 113px;
  padding: 1px 3px;
}
.cart-list-item-price {
  position: absolute;
  top: 110px;
  left: 113px;
  color: red;
  font-weight: 600;
}
.cart-list-item-number {
  display: inline-block;
  width: 90px;
  height: 20px;
  border-radius: 10px;
  background: #f7f7f7;
  color: #ababab;
  position: absolute;
  top: 105px;
  left: 220px;
}
.cart-list-item-number span {
  display: inline-block;
  width: 30px;
  text-align: center;
  font-size: 18px;
}
.cart-list-item-number span:nth-child(2) {
  color: black;
}
.bottom-nar {
  position: fixed;
  bottom: 0px;
  height: 50px;
  width: 100%;
  background: white;
  z-index: 999;
  display: flex;
  padding: 10px 15px;
  box-sizing: border-box;
  line-height: 30px;
}
.cart-list-bottom-btn {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  border: 1px solid #999999;
  margin-right: 10px;
  font-weight: 100;
  margin-top: 10px;
  margin-left: 10px;
  position: relative;
  top: -5px;
}
.cart-list-bottom-btn span {
  font-size: 22px;
  color: #ff5777;
  position: relative;
  top: -5px;
  left: -1px;
}
.bottom-nar div:nth-child(3) {
  color: red;
}
.bottom-nar div:nth-child(4) {
  box-sizing: content-box;
  padding: 0 8px;
  background: #ff5777;
  color: white;
  border-radius: 20px;
  margin-left: 10px;
}
</style>