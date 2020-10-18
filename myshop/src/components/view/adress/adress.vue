<template>
  <div class='order'>
    <NavBar>
      <div slot='left'
           @click='goback'><span class='iconfont icon-tubiaozhizuo--'
              style=' font-size: 25px;'></span></div>
      <div slot='center'>确认订单</div>
    </NavBar>
    <!-- addAdress -->
    <div class='addAdress'
         v-show='isAddAdress'>
      <div v-show='!isAdressList'>
        <img src="https://s10.mogucdn.com/p2/170222/upload_1ga8374ha4c1e315k293bce18d3b9_514x258.png"
             alt=""
             style='width:319px;height:160px;margin-left:28px'>
        <p style='text-align:center'>你还没有收货地址哦~</p>
      </div>
      <div v-show='isAdressList'
           class='adressList'>
        <div v-for='(item,index) in adressList'
             :key='index'
             :class='{choose:index===choseAdress}'>
          <div @click='chooseAdress(index)'><span>{{item.person}}</span><span>{{item.phone}}</span></div>
          <div @click='chooseAdress(index)'><span>{{item.province+item.city+item.area+item.careAdress}}</span></div>
          <div><span class='iconfont icon-icon-test-copy'
                  style='font-size:15px'
                  :class='{red:index===choseAdress}' @click='chooseAdress(index)'></span><span style='margin-left:3px' @click='chooseAdress(index)'>设为默认</span><span class='iconfont icon-bianji'
                  style='margin-left:140px;color:red'></span><span style='margin-left:3px' @click='editAdress(index)'>编辑</span><span class='iconfont icon-shanchu'
                  style='margin-left:13px;color:red'></span><span style='margin-left:3px' @click='deleteAdress(index)'>删除</span></div>
        </div>
      </div>
      <div class='addAdress-bottom'
           @click='isAddAdressMes=!isAddAdressMes;adressState=0;isFilter=true;isAddAdress=false'>+新建地址</div>
    </div>
    <!-- addAdressMes -->
    <div class='addAdressMes'
         v-show='isAddAdressMes'>
      <!-- 收货人 -->
      <div class='option'>
        <div>收货人</div>
        <div><input type="text"
                 v-model='addAdressMes.person'></div>
      </div>
      <!-- 手机号 -->
      <div class='option'>
        <div>手机号</div>
        <div><input type="text"
                 v-model='addAdressMes.phone'></div>
      </div>
      <!-- 省份 -->
      <div class='option'>
        <div>省份</div>
        <div>
          <div class='select'>
            <select name=""
                    id=""
                    v-model='addAdressMes.province'>
              <option value="option">请选择</option>
              <option :value="item.value"
                      v-for='(item,index) in cityData'
                      :key='index'>{{item.value}}</option>
            </select>
          </div>
        </div>
      </div>
      <!-- 城市 -->
      <div class='option'>
        <div>城市</div>
        <div>
          <div class='select'>
            <select name=""
                    id=""
                    style='border-bottom:0.5px solid rgba(0, 0, 0, 0.2)'
                    v-model='addAdressMes.city'
                    :disabled='addAdressMes.province=="option"'>
              <option value="option">请选择</option>
              <option :value="item1.value"
                      v-for='(item1,index1) in provinceData'
                      :key='index1'>{{item1.value}}</option>
            </select>
          </div>
        </div>
      </div>
      <!-- 地区 -->
      <div class='option'>
        <div>地区</div>
        <div>
          <div class='select'>
            <select name=""
                    id=""
                    v-model='addAdressMes.area'
                    :disabled='addAdressMes.city=="option"'>
              <option value="option">请选择</option>
              <option :value="item2.value"
                      v-for='(item2,index2) in contryData'
                      :key='index2'>{{item2.value}}</option>
            </select>
          </div>
        </div>
      </div>
      <!-- 详细地址 -->
      <div class='option'>
        <div>详细地址</div>
        <div><input type="text"
                 v-model='addAdressMes.careAdress'></div>
      </div>
      <!-- 确定取消按钮 -->
      <div class='btn'>
        <button @click='isAddAdressMes=false;isAddAdress=true;isFilter=false'>取消</button>
        <button @click='add'>确定</button>
      </div>
    </div>
    <!-- filter -->
    <div v-if='isFilter'
         class='filter'
         @click='removeaddAdress'>

    </div>
  </div>
</template>
<script>
import NavBar from '../../common/NavBar/NavBar'
import cityData from '../../../../public/util/citydata'

export default {
  components: {
    NavBar
  },
  created () {
    this.cityData = cityData
    this.getAdress()
    console.log(cityData)
  },
  mounted () {
    this.goodsList = this.$route.params.obj
  },
  computed: {
    allPrice () {
      let allprice = 0
      this.goodsList.forEach(item => {
        allprice = Number(allprice) + Number(item.price * item.num)
      })
      return allprice
    },
    allNum () {
      let allnum = 0
      this.goodsList.forEach(item => {
        allnum = Number(allnum) + Number(item.num)
      })
      return allnum
    },
    isAdressList () {
      return this.adressList.length
    }
  },
  watch: {
    'addAdressMes.province': function (newVal) {
      if(this.adressState==0){
        this.addAdressMes.city = 'option'
        this.addAdressMes.area = 'option'
      }
      for (let i = 0; i < this.cityData.length; i++) {
        console.log(this.cityData[i].value)
        if (this.cityData[i].value == newVal) {
          if (this.cityData[i].children[0].children) {
            this.provinceData = this.cityData[i].children
            return
          } else {
            this.provinceData = []
            this.provinceData.push({ value: newVal })
            return
          }
        }
      }
    },
    'addAdressMes.city': function (newVal) {
      for (let i = 0; i < this.cityData.length; i++) {
        if (this.cityData[i].value == newVal) {
          this.contryData = this.cityData[i].children
          return
        }
      }
      for (let j = 0; j < this.provinceData.length; j++) {
        if (this.provinceData[j].value == newVal) {
          this.contryData = this.provinceData[j].children
          return
        }
      }
    },
    'isAddAdressMes':function(newVal){
      if(newVal==false){
        this.addAdressMes={
        person: '',
        phone: '',
        province: 'option',
        city: 'option',
        area: 'option',
        careAdress: ''
      }
      this.adressState=0
    }
    }
  },
  data () {
    return {
        isFilter:false,
      // 地址
      adress: '',
      // 商品列表
      goodsList: [],
      // 地址列表
      adressList: [],
      // 添加订单显示框
      isAddAdress: true,
      // 添加订单地址显示框
      isAddAdressMes: false,
      // 地址信息
      addAdressMes: {
        person: '',
        phone: '',
        province: 'option',
        city: 'options',
        area: 'option',
        careAdress: ''
      },
      cityData: [],
      provinceData: [],
      contryData: [],
      defaultAdress: 0,
      choseAdress: 0,
      // 订单状态 0未支付 1已支付
      orderState: 0,
      // 0为新增 1为修改
      adressState:0,
      adressEditIndex:0
    }
  },
  methods: {
    async getAdress () {
      this.adressList=[]
      const result = await this.$http({
        method: 'get',
        url: 'api/users/getAdress',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
      })
      console.log('222222222222222222222222222222',result)
      if (result.data.data.length > 0) {
        this.adressList = result.data.data
        this.isAddAdress=true
      }
      // 获取地址
      this.adress = this.adressList[this.choseAdress]

    },
    removeaddAdress () {
      this.isAddAdress = false
    },
    //添加地址
    async add () {
      if(this.adressState==0){
          const result = await this.$http({
          method: 'post',
          url: 'api/users/addAdress',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          data: this.$qs.stringify(this.addAdressMes)
        })
        if (result.data.success) {
          this.$alert.success('添加地址成功', 1000)
          this.isAddAdressMes = false
          this.getAdress()
        }
      }else{
        let editIndex=this.adressEditIndex
        const result = await this.$http({
          method: 'post',
          url: 'api/users/editAdress',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          data: this.$qs.stringify({...this.addAdressMes,...{editIndex}})
        })
        if (result.data.success) {
          this.$alert.success('修改地址成功', 1000)
          this.isAddAdressMes = false
          this.getAdress()
        }
      }
      this.isFilter=false
      this.adressState=0
    },
    // 隐藏电话号中间
    hidePhone () {
    },
    //提交订单
    async submitOrder () {
      if (this.adress) {
        let obj = {}
        obj.adress = this.adress
        obj.state = this.orderState
        obj.goodsList = this.goodsList
        const result = await this.$http({
          method: 'post',
          url: 'api/users/submitOrder',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          data: this.$qs.stringify(obj)
        })
        if (result.data.success) {
          this.$alert.success('订单成功生成', 1000)
        }
      }
    },
    async deleteAdress(index){
      const result = await this.$http({
          method: 'post',
          url: 'api/users/deleteAdress',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          data: this.$qs.stringify({index:index})
        })
        if(result.data.success){
          // 索引值变化
          if(this.choseAdress>index){
            this.choseAdress-=1
          }
          this.adressList=[]
          this.getAdress()
        }
    },
    editAdress(index){
      this.isFilter=true
      this.isAddAdress=false
      this.adressState=1
      this.isAddAdressMes=true
      this.adressEditIndex=index
      let adressTemp=this.adressList[index]
      this.addAdressMes.province=adressTemp.province
      this.addAdressMes.careAdress=adressTemp.careAdress
      this.addAdressMes.area=adressTemp.area
      this.addAdressMes.city=adressTemp.city
      this.addAdressMes.phone=adressTemp.phone
      this.addAdressMes.person=adressTemp.person
      console.log(this.addAdressMes)
    },
    chooseAdress(index){
      this.choseAdress=index
      this.adress=this.adressList[this.choseAdress]
    },
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.adress {
  height: 69px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  display: flex;
  align-items: center;
}
.adress div:nth-child(1) img {
  width: 25px;
  height: 25px;
}
.qianjin {
  position: absolute;
  top: 67px;
  right: 20px;
}
.goods {
  width: 100%;
  border-top: 10px solid #e9e9e9;
}
.goods_list {
  padding: 10px 16px;
}
.goods_head {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  padding: 10px 10px;
}
.goods_msg {
  width: 100%;
  height: 112px;
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
}
.goods_msg img {
  width: 63px;
  height: 92px;
}
.goods_msg div:nth-child(2) {
  width: 175px;
}
.goods_msg div:nth-child(2) div:nth-child(1) {
  width: 100%;
  font-size: 14px;
  font-weight: 700;
}
.goods_msg div:nth-child(2) div:nth-child(2) {
  font-size: 12px;
  color: #999999;
  margin-top: 5px;
}
.goods_msg div:nth-child(3) {
  width: 80px;
  height: 60px;
  text-align: center;
  line-height: 30px;
}
.goods_msg div:nth-child(3) div:nth-child(1) {
  font-weight: 700;
  font-size: 14px;
}
.goods_msg div:nth-child(3) div:nth-child(2) {
  font-size: 14px;
  color: #999999;
  width: 100%;
}
.goods_des {
  border-top: 1px solid #999999;
  padding-top: 5px;
}
.goods_des div:nth-child(1),
.goods_des div:nth-child(2),
.goods_des div:nth-child(3) {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999999;
  height: 30px;
  line-height: 30px;
}
.goods_des div:nth-child(3) input {
  width: 260px;
  height: 22px;
  background: #f7f4f4;
  border: none;
  border-radius: 3px;
  padding: 3px 5px;
}
.goods_des div:nth-child(3) input::-webkit-input-placeholder {
  color: #e1e1e1;
}
.goods_des div:nth-child(4) {
  font-size: 13px;
  height: 50px;
  line-height: 50px;
  text-align: right;
}
.narbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  width: 100%;
  line-height: 50px;
  padding-left: 10px;
  border-top: 1px solid #e9e9e9;
  background: white;
}
.submit {
  position: absolute;
  right: 10px;
  display: inline-block;
  height: 100%;
  width: 100px;
  font-size: 14px;
  color: #fff;
  background: #ff468f;
  text-align: center;
}
.addAdress {
  top:44px;
  width: 375px;
  background: white;
  position: fixed;
  bottom: 0;
  z-index: 9;
}
.filter {
  width: 375px;
  height: 667px;
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.2);
}
.addAdress-bottom {
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  border-top: 1px solid #e9e9e9;
  color: #ff468f;
  text-align: center;
  line-height: 50px;
}
.addAdressMes {
  height: 500px;
  width: 375px;
  background: white;
  position: fixed;
  bottom: 0;
  z-index: 10;
}
.option {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
}
.option input {
  border: none;
  width: 100%;
  height: 30px;
  padding-left: 10px;
}
.option div:nth-child(1) {
  flex: 1;
  border-right: 0.5px solid rgba(0, 0, 0, 0.2);
}
.option div:nth-child(2) {
  flex: 3;
}
.select {
  width: 100%;
  height: 40px;
  position: relative;
  background: red;
}
.select select {
  /*清除select的边框样式*/
  border: none;
  /*清除select聚焦时候的边框颜色*/
  outline: none;
  /*将select的宽高等于div的宽高*/
  width: 100%;
  height: 40px;
  line-height: 40px;
  /*隐藏select的下拉图标*/
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  /*通过padding-left的值让文字居中*/
  padding-left: 10px;
}
.btn {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  margin-top: 25px;
}
.btn button {
  height: 38px;
  width: 138px;
  outline: none;
}
.btn button:nth-child(1) {
  color: rgba(0, 0, 0, 0.8);
  background: #fff;
  border: 1px solid #e9e9e9;
}
.btn button:nth-child(2) {
  color: white;
  background: #ff468f;
  border: none;
}
.adressList > div {
  width: 345px;
  height: 100px;
  border: 1px solid #e9e9e9;
  margin-left: 15px;
  margin-top: 15px;
  border-radius: 8px;
  font-size: 14px;
  padding: 5px;
  box-sizing: border-box;
  color: #999999;
}
.adressList > div div {
  margin-top: 7px;
}
.adressList > div div:nth-child(3) {
  border-top: 1px solid #e9e9e9;
  padding-top: 10px;
}
.red {
  color: red;
}
.choose {
  border: 2px solid red !important;
}
</style>