<template>
  <div>
    <div class='chatShop'
         v-show='isHomeShow'>
      <!-- narBar -->
      <narBar class='narBar'>
        <div slot='center'
             style='letter-spacing:1.5px;color:#f26'>欧丽雅商家客服</div>
      </narBar>
      <!-- 聊天列表 -->
      <ul>
        <li v-for='(item,index) in chatUsers'
            :key='index'
            @click='goChatUser(index)'><img :src="item[item.length-1].img"
               alt="">
          <div class='liDiv1'><span>{{item[0].name}}</span><span>{{chatLastMsg[index]}}</span></div>
          <div class='liDiv2'><span>{{item[item.length-1].time}}</span></div>
        </li>
      </ul>
    </div>
    <chat-shop-user v-show='!isHomeShow'
                    :allMessage='chatUsers[nowUser]'
                    :user='nowUser'></chat-shop-user>
  </div>

</template>
<script>
import narBar from '../../common/NavBar/NavBar'
import chatShopUser from './chatShopUser'


export default {
  components: {
    narBar,
    chatShopUser
  },
  data () {
    return {
      // 开关控制首页 聊天页切换
      isHomeShow: true,
      // 商店名
      shop: '欧丽雅',
      // 聊天列表
      chatUsers: {
      },
      // 最后聊天信息
      chatLastMsg: {
      },
      // 当前聊天人
      nowUser: ''
    }
  },
  created () {
    // 连接
    this.$socket.emit('connect')
    // 登录注册
    this.$socket.emit('login', this.shop)
    // 控制用户聊天返回
    this.$bus.$on('goback', () => {
      this.isHomeShow = true
    })
    // 发消息
    this.$bus.$on('sendMes', (msg) => {
      // 获取时间
      msg.time = this.getNowTime()
      // push聊天记录
      console.log(typeof this.chatUsers[msg.otherName])
      this.chatUsers[msg.otherName].push(msg)
      // 获取最后聊天记录
      this.chatLastMsg[msg.otherName] = msg.msg
    })
  },
  sockets: {
    // 接收消息
    privateMsg (msg) {
      console.log(msg)
      this.handleMsg(msg)
    }
  },
  filters: {

  },
  methods: {
    // 处理消息
    handleMsg (msg) {
      if (!this.chatUsers[msg.name]) {
        this.$set(this.chatUsers, msg.name, [])
        this.$set(this.chatLastMsg, msg.name, {})
      }
      // 获取时间
      msg.time = this.getNowTime()
      // push聊天记录
      this.chatUsers[msg.name].push(msg)
      // 获取最后聊天记录
      this.chatLastMsg[msg.name] = msg.msg
    },
    // 获取现在时间
    getNowTime () {
      let time = new Date()
      let obj = {}
      obj.hour = time.getHours()
      obj.minite = time.getMinutes()
      return `${obj.hour}:${obj.minite}`
    },
    goChatUser (user) {
      this.nowUser = user
      this.isHomeShow = false
    }
  }
}
</script>
<style scoped>
ul {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #e3e3e3;
  display: flex;
}
li img {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}
.liDiv1 {
  display: flex;
  flex-direction: column;
  width: 270px;
}
.liDiv1 span:nth-child(1) {
  font-size: 15px;
  font-weight: 600;
  padding: 3px;
}
.liDiv1 span:nth-child(2) {
  font-size: 13px;

  margin-top: 5px;
  color: rgba(0, 0, 0, 0.5);
  word-break: break-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.liDiv2 {
  font-size: 13px;
  padding-top: 8px;
}
</style>