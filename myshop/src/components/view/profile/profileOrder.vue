<template>
  <div class='profileOrder'>
    <narBar class='narBar'>
      <div slot='left'
           @click='goback'><span class='iconfont icon-tubiaozhizuo--'
              style=' font-size: 25px;'></span></div>
      <div slot='center'>订单列表</div>
    </narBar>
    <div class='orderDes'>
      <div v-for='(item,index) in orderDes'
           :key='index'
           @click='orderIndex=index'><span :class='{border:index===orderIndex}'>{{item}}</span></div>
    </div>
    <!-- good order -->
    <div class='goods'>
      <div v-if='!selectOrder.length'
           class='noneGoods'>
        <img src="https://s10.mogucdn.com/new1/v1/bmisc/b22401c122fbedee3b1f5d708127e9f0/194500731154.png"
             alt="">
        <div>还没有相关订单哦</div>
      </div>
      <div v-if='selectOrder.length'>
        <div v-for='(item,index) in selectOrder'
             :key='index'
             class='goodsList'>
          <div class='goodsListDiv'>
            <div><span style='font-weight:600'>{{orderDes[orderIndex]}}</span><span></span></div>
            <div v-for='(item1,index1) in item.goodsList'
                 :key='index1'
                 class='goodsListShop'>
              <div style='font-size:12px;color:#999999;margin-bottom:3px'><span>{{item1.shop}}</span><span class='iconfont icon-qianjin'
                      style='font-size:12px'></span></div>
              <div><img :src="item1.img"
                     alt="">
                <div class='goodsListShop-msg'>
                  <p>{{item1.text}}</p>
                </div>
                <div class='goodsListShop-price'>
                  <div>{{item1.price}}</div>
                  <div>{{item1.num}}</div>
                </div>
              </div>
            </div>
            <!-- all price -->
            <div class='allPrice'>
              <span>全国包邮,总计:</span>
              <span>¥{{allprice(index)}}</span>
              <div class='btn'>付款</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import narBar from '../../common/NavBar/NavBar'
export default {
  components: {
    narBar
  },
  created () {
    this.orderIndex = Number(this.$route.query.index) + 1
    this.orderList = this.$route.query.data
  },
  mounted () {
    console.log(this.orderList)
    if (this.orderList[0] === "[object Object]") {
      console.log(1)
      this.$router.push('/home')
    }
  },
  activated () {
    this.orderIndex = Number(this.$route.query.index) + 1
    this.orderList = this.$route.query.data
    console.log(this.orderList)
    if (this.orderList === "[object Object]") {
      this.$router.push('/home')
    }
  },
  data () {
    return {
      orderDes: ['全部', '待付款', '代发货', '待收货', '待评价', '售后'],
      // 当前选中
      orderIndex: 0,
      orderList: []
    }
  },
  computed: {
    selectOrder () {
      let obj = []
      if (this.orderIndex === 0) {
        return this.orderList
      }
      this.orderList.forEach(item => {
        if (item.state == this.orderIndex - 1) {
          obj.push(item)
        }
      })
      return obj
    }

  },
  methods: {
    timer () {
    },
    // 当前订单的价钱
    allprice (index) {
      let price = 0
      this.orderList[index]['goodsList'].forEach(item => {
        price = item.price * item.num + price
      })
      return price
    },
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.profileOrder {
  background: #eeeeee;
  min-height: 667px;
}
.orderDes {
  display: flex;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 1px solid #e9e9e9;
  background: white;
}
.narBar {
  background: white;
  border-bottom: 1px solid #e9e9e9;
}
.orderDes div {
  flex: 1;
  text-align: center;
}
.border {
  border-bottom: 3px solid red;
}
.noneGoods {
  width: 375px;
  height: 300px;
  margin-top: 10px;
  background: white;
  text-align: center;
}
.noneGoods img {
  width: 257px;
  height: 129px;
  margin-top: 50px;
}
.goodsList {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
}
.goodsListDiv {
  width: 100%;
  background: white;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
}
.goodsListShop {
  padding-top: 5px;
  padding-bottom: 5px;
}
.goodsListShop div:nth-child(2) {
  height: 60px;
  display: flex;
  padding: 0;
}

.goodsListShop div:nth-child(2) img {
  width: 60px;
  height: 60px;
}
.goodsListShop-msg {
  margin-left: 10px;
  width: 160px;
  height: 20px;

  font-size: 12px;
}
.goodsListShop-msg p {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.goodsListShop-price div {
  margin-left: 80px;

  height: 18px;
}
.allPrice {
  border-top: 1px solid #e9e9e9;
  font-size: 12px;
  padding-top: 10px;
}
.allPrice span:nth-child(1) {
  margin-left: 200px;
}
.allPrice span:nth-child(2) {
  font-size: 15px;
  color: red;
  margin-left: 10px;
}
.allPrice .btn {
  background: #f46;
  color: white;
  width: 60px;
  height: 22px;
  text-align: center;
  line-height: 22px;
  border-radius: 5px;
  margin-left: 270px;
  margin-top: 10px;
}
</style>