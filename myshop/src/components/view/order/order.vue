<template>
  <div class='order'>
    <NavBar>
      <div slot='left'><span class='iconfont icon-tubiaozhizuo--'
              style=' font-size: 25px;'></span></div>
      <div slot='center'>确认订单</div>
    </NavBar>
    <!-- adress -->
    <div class='adress'
         @click='isAddAdress=!isAddAdress'>
      <div><img src="data:image/jpeg;base64,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"
             alt=""></div>
      <div>
        <div v-if='!adress'>请填写收货地址</div>
        <div v-if='adress'
             style='font-size:13px;color:#999999'>
          <div style='margin-bottom:5px;font-weight:600'>{{adress.person+adress.phone}}</div>
          <div>{{adress.province+adress.city+adress.area+adress.careAdress}}</div>
        </div>
      </div>
    </div>
    <!-- icon -->
    <div class='qianjin'>
      <span class='iconfont icon-qianjin'
            style='font-size:15px;color:#999999'></span>
    </div>
    <!-- goods -->
    <div class='goods'>
      <div class='goods_list'>
        <div class='goods_list_item'
             v-for='(item,index) in goodsList'
             :key='index'>
          <!-- 头部 -->
          <div class='goods_head'>
            <div>{{item.shop}}</div>
            <div>联系商家</div>
          </div>
          <!-- 主要信息 -->
          <div class='goods_msg'>
            <div style='margin-right:5px'><img :src="item.img"
                   alt=""></div>
            <div>
              <div>¥{{item.text}}</div>
              <div>颜色:{{item.type}} 尺寸:{{item.size}}</div>
            </div>
            <div>
              <div>¥{{item.price}}</div>
              <div>x{{item.num}} 修改</div>
            </div>
          </div>
          <div class='goods_des'>
            <div>
              <span>退货补运费</span>
              <span>商家赠送<span class='iconfont icon-qianjin'
                      style='font-size:13px'></span></span>
            </div>
            <div>
              <span>延误必赔</span>
              <span>商家赠送<span class='iconfont icon-qianjin'
                      style='font-size:13px'></span></span>
            </div>
            <div>
              <span>订单备注:</span>
              <input type="text"
                     placeholder="有什么想对商家说的写在这里哦~"
                     v-model='item.des'>
            </div>
            <div>
              <span style='color:#999999'>共{{item.num}}件</span>
              <span style='margin-left:5px'>店铺合计:<span style='color:red'>¥{{item.num*item.price}}</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- narbar -->
    <div class='narbar'>
      <span style='font-size:13px'>总价:</span>
      <span style='color:red;font-weight:600;font-size:20px;margin-left:10px'>¥{{allPrice}}</span>
      <span style='color:#999999;font-size:13px;position:relative;right:-140px'>共{{allNum}}件</span>
      <span class='submit'
            @click='submitOrder'>提交订单</span>
    </div>
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
          <div><span>{{item.person}}</span><span>{{item.phone}}</span></div>
          <div><span>{{item.province+item.city+item.area+item.careAdress}}</span></div>
          <div><span class='iconfont icon-icon-test-copy'
                  style='font-size:15px'
                  @click='defaultAdress=index'
                  :class='{red:index===choseAdress}'></span><span style='margin-left:3px'>设为默认</span><span class='iconfont icon-bianji'
                  style='margin-left:140px;color:red'></span><span style='margin-left:3px'>编辑</span><span class='iconfont icon-shanchu'
                  style='margin-left:13px;color:red'></span><span style='margin-left:3px'>删除</span></div>
        </div>
      </div>
      <div class='addAdress-bottom'
           @click='isAddAdressMes=!isAddAdressMes'>+新建地址</div>
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
        <button>取消</button>
        <button @click='add'>确定</button>
      </div>
    </div>
    <!-- filter -->
    <div v-if='isAddAdress'
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
    console.log(this.cityData)
    this.getAdress()
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
      this.addAdressMes.city = 'option'
      this.addAdressMes.area = 'option'
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
    }
  },
  data () {
    return {
      adress: '',
      goodsList: [],
      adressList: [],
      isAddAdress: false,
      isAddAdressMes: false,
      addAdressMes: {
        person: '',
        phone: '',
        province: 'option',
        city: 'option',
        area: 'option',
        careAdress: ''
      },
      cityData: [],
      provinceData: [],
      contryData: [],
      defaultAdress: 0,
      choseAdress: 0,
      // 订单状态 0未支付 1已支付
      orderState: 0

    }
  },
  methods: {
    async getAdress () {
      const result = await this.$http({
        method: 'get',
        url: 'api/users/getAdress',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
      })
      if (result.data.data.length > 0) {
        this.adressList = result.data.data
      }
      // 获取地址
      this.adress = this.adressList[this.choseAdress]

    },
    removeaddAdress () {
      this.isAddAdress = false
      this.isAddAdressMes = false
    },
    //添加地址
    async add () {
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
        this.getAdress()
      }
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
  height: 500px;
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