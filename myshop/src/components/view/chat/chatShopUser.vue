<template>
  <div class='cart'>
    <!-- narBar -->
    <narBar class='narBar'>
      <div slot='left'
           @click='goBack'><span class='iconfont icon-tubiaozhizuo--'
              style=' font-size: 25px;'></span></div>
      <div slot='center'
           style='letter-spacing:1.5px'>{{user}}</div>
    </narBar>
    <!-- 聊天记录 -->
    <ul>
      <li v-for='(item,index) in allMessage'
          :key='index'
          :class='{right:item.name!==shop.name}'><img :src="item.img"><span class='text'><span>{{item.msg}}</span></span></li>
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
  props: {
    // 消息
    allMessage: {
      type: Array
    },
    // 用户
    user: {
      type: String
    }
  },
  data () {
    return {
      // 发送消息
      message: '',
      // shop信息 目前写死的
      shop: {
        name: '欧丽雅',
        img: "https://s5.mogucdn.com/mlcdn/c45406/180429_73i2hdg95j7597hd6dhikikbbe4i1_200x200.jpg_120x120.webp"
      }
    }
  },
  mounted () {
    console.log(this.allMessage)
  },
  methods: {
    goBack () {
      this.$bus.$emit('goback', 'aa')
    },
    sendMes () {
      let obj = {}
      obj.msg = this.message
      obj.img = this.shop.img
      obj.name = this.shop.name
      obj.otherName = this.user
      this.$bus.$emit('sendMes', obj)
      this.$socket.emit('sendPriMes', obj)
      this.message = ''

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