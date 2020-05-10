<template>
  <div class='cart'>
    <!-- narBar -->
    <narBar class='narBar'>
      <div slot='left'
           @click='goBack'><span class='iconfont icon-tubiaozhizuo--'
              style=' font-size: 25px;'></span></div>
      <div slot='center'
           style='letter-spacing:1.5px'>{{shopName}}</div>
    </narBar>
    <!-- 商品链接 -->
    <div class='item'>
      <div><img :src="shop.img"></div>
      <div>
        <div class='itemTop'><span>{{item.text}}</span><span>x</span></div>
        <div class='itemBottom'><span>¥{{item.price}}</span><span>发送链接</span></div>
      </div>
    </div>
    <!-- 聊天记录 -->
    <ul>
      <li v-for='(item,index) in mesAll[shop.name]'
          :key='index'
          :class='{right:item.name!==user.name}'><img :src="item.img"><span class='text'><span>{{item.msg}}</span></span></li>
    </ul>
    <!-- 底部 -->
    <div class='barButtom'>
      <input type="text"
             v-model='message'>
      <span class='span'
            @click='sendMes'>发送</span>
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
      // 商店信息
      shop: {},
      // 商品信息
      item: {},
      // 用户
      user: {
        img: '',
        name: ''
      },
      // 发送的消息
      message: '',
      // 消息总
      mesAll: {}
    }
  },
  sockets: {
    // 接收私人消息
    privateMsg (msg) {
      console.log('收到消息')
      this.mesAll[this.shop.name].push(msg)
    }
  },
  created () {
    // this.getShopItem()
    // this.getUserInfo()
    // console.log(111)
  },
  activated () {
    this.getShopItem()
    this.getUserInfo()
  },
  computed: {
    shopName () {
      if (this.isEmptyObj(this.$route.params)) {
        return ''
      } else {
        return this.shop.name
      }
    }
  },
  methods: {
    getShopItem () {
      try {
        this.shop = this.$route.params.shop
        this.item = this.$route.params.item
      } catch (e) {
        console.log(e)
      }
      if (this.isEmptyObj(this.$route.params)) {
        this.$router.push('/home')
        window.location.reload()
        return
      }
      if (!this.mesAll[this.shop.name]) {
        // 响应式
        this.$set(this.mesAll, this.shop.name, [])
      }
    },
    async getUserInfo () {
      const result = await this.$http({
        method: 'get',
        url: 'api/users/userInfo',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      if (result.data.success) {
        let user = result.data.data
        this.user.name = user.user_account
        this.user.img = user.user_img
        //  链接socket
        this.$socket.emit('connect')
        this.$socket.emit('login', this.user.name)
      } else {
        console.log(result)
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    // 发送消息
    sendMes () {
      const obj = {}
      obj.msg = this.message
      obj.img = this.user.img
      obj.name = this.user.name
      obj.otherName = this.shop.name
      this.mesAll[this.shop.name].push(obj)
      this.$socket.emit('sendPriMes', obj)
      // 测试
      // this.$socket.emit('sendPriMes', {
      //   msg: '111',
      //   img: this.shop.img,
      //   name: this.user.name,
      //   otherName: this.user.name
      // })
      this.message = ''
    },
    isEmptyObj (obj) {
      return (Object.prototype.toString.call(obj) === '[object Object]')
        && (Object.getOwnPropertyNames(obj).length === 0)
        && (Object.getOwnPropertySymbols(obj).length === 0)
    }
  }
}
</script>
<style scoped>
.item {
  width: 100%;
  height: 80px;
  padding: 10px;
  box-sizing: border-box;
  background: #fff2f6;
  display: flex;
}
.item img {
  width: 60px;
  height: 60px;
}
.itemTop {
  height: 30px;
  display: flex;
  justify-content: space-between;
}
.itemBottom {
  height: 30px;
  display: flex;
  justify-content: space-between;
}
.itemTop span:nth-child(1) {
  padding: 5px;
  width: 230px;
  display: inline-block;
  word-break: break-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 13px;
}
.itemTop span:nth-child(2) {
  padding: 5px;
  display: inline-block;
  font-size: 13px;
  margin-left: 20px;
}
.itemBottom span:nth-child(1) {
  padding: 5px;
  font-size: 13px;
}
.itemBottom span:nth-child(2) {
  background: white;
  color: #f46;
  border: 1px solid #f46;
  font-size: 11px;
  display: inline-block;
  height: 18px;
  width: 60px;
  text-align: center;
  line-height: 18px;
  margin-top: 4px;
}
.barButtom {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 375px;
  background: whitesmoke;
}

input {
  height: 30px;
  flex: 8;
  opacity: 0.3;
  outline: none;
  border: 2px solid black;
  border-radius: 15px;
  padding-left: 10px;
}
.span {
  flex: 1;
  line-height: 30px;
  text-align: center;
  font-size: 13px;
}
ul {
  margin-bottom: 40px;
  padding: 0;
}
li {
  height: 50px;
  display: flex;
  width: 100%;
  box-sizing: content-box !important;
  flex-direction: row-reverse;
}
.text {
  line-height: 50px;
  font-size: 10px;
}
.text span {
  background: burlywood;
  padding: 5px;
  border-radius: 6px;
}
li img {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-left: 10px;
  margin-right: 10px;
}
.right {
  flex-direction: row;
}
</style>