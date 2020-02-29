<template>
  <div class='profile'>
    <!-- 头部 -->
    <headApp />
    <div class='headImgAround'></div>
    <!-- 用户信息 -->
    <div class='headImg'>
      <div class='img'>
        <img src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1822301111,3940591519&fm=26&gp=0.jpg">
      </div>
      <div class='name'>asd</div>
      <div class='boxMember'></div>
    </div>
    <!-- 应用区 -->
    <div class='application'>
      <div><img src="https://s10.mogucdn.com/mlcdn/c45406/190815_7a9da7lh4a96lb1fl6b4gb854f3ji_75x75.png"
             alt="">
        <p>主页</p>
      </div>
      <div><img src="https://s10.mogucdn.com/mlcdn/c45406/190815_6f41b17399aha0flla6chjb0lhk47_75x75.png"
             alt="">
        <p>消息</p>
      </div>
      <div><img src="https://s10.mogucdn.com/mlcdn/c45406/190815_31g4a5ebc8bj2f85cj4li8df89aab_75x75.png"
             alt="">
        <p>收藏</p>
      </div>
      <div><img src="https://s10.mogucdn.com/mlcdn/c45406/190815_0k9k5gh362a1kbk87hha8ff1bek69_75x75.png"
             alt="">
        <p>关注</p>
      </div>
    </div>
    <!-- 购物车 -->
    <div class='cart'>
      <div class='cart-left'></div>
      <div class='cart-right'></div>
      <div></div>
    </div>
  </div>
</template>
<script>
import headApp from './head.vue'
export default {
  components: {
    headApp,
  },
  mounted () {

  }
}
</script>
<style scoped>
.profile {
  background: rgb(246, 246, 246);
  height: 667px;
}
.headImgAround {
  height: 70px;
  background: rgb(255, 68, 102);
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
}
.headImg {
  width: 335px;
  height: 120px;
  margin-left: 20px;
  background: white;
  position: relative;
  top: -20px;
  border-radius: 10px;
}
.img {
  position: absolute;
  background: white;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  top: -30px;
  left: 138px;
  overflow: hidden;
  color: black;
}
.img img {
  width: 55px;
  height: 55px;
  border-radius: 100%;
  margin-left: 2.5px;
  margin-top: 2.5px;
}
.name {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -140%);
}
.boxMember {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 54px;
  background-image: url("https://s10.mogucdn.com/mlcdn/c45406/191010_2il1l3i91gkd5c461j93e5ehfcgi5_1404x216.png");
  background-size: 335px 54px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.application {
  width: 335px;
  height: 69px;
  margin-left: 20px;
  background: white;
  border-radius: 10px;
  display: flex;
}
.application div {
  flex: 1;
  padding: 10px 25px;
}
.application div img {
  width: 25px;
  height: 25px;
}
.application div p {
  margin: 0;
  padding: 0;
  color: #5e5e5e;
  font-size: 12px;
}
.cart {
  display: flex;
  width: 335px;
  height: 120px;
  margin-left: 20px;
  margin-top: 20px;
}
.cart-left {
  width: 120px;
  height: 120px;
  background: white;
}
.cart-right {
  width: 120px;
  height: 120px;
  background: white;
}
</style>