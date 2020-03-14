<template>
  <div class='search-item'>
    <narBar class='narBar'>
      <div slot='left'
           @click='getBack'><span class='iconfont icon-tubiaozhizuo--'></span></div>
      <div slot='center'><input type="text"
               name=""
               id=""
               v-model='searchText'></div>
      <div slot='right'><span class='iconfont icon-shoppingcopy'></span></div>
    </narBar>
    <!-- 头部 -->
    <div class='header'>
      <div v-for='(item,index) in headers'
           :key='index'
           @click='getIndex(index)'
           :class='index===headerIndex?"red":""'><span>{{item}}</span></div>
    </div>
    <!-- 商品 -->
    <div class='itemPicture'>
      <div class='itemPic'>
        <img src="https://s5.mogucdn.com/mlcdn/17f85e/190107_2198g5kka8bj384f4hb3a54k8f413_640x960.jpg_360x480.v1cAC.40.webp"
             alt="">
        <div class='text'><span class='span1'>推荐</span><span>我是你们</span></div>
        <div class='bottom-text'><span class='price'>$55</span>
          <span class='bottom-text-right'>63<span class='iconfont icon-collect'></span></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import narBar from '../../common/NavBar/NavBar'
export default {
  components: {
    narBar,
  },
  data () {
    return {
      // 头部导航
      headers: ['综合', '销量', '新品', '价格'],
      headerIndex: 0,
      // 商品信息
      listItem: [],
      searchText: ''
    }
  },
  created () {
    this.searchText = this.$route.params.searchText
  },
  methods: {
    // 获取点击信息
    getIndex (index) {
      this.headerIndex = index
    },
    // 返回跳转
    getBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.search-item {
  height: 100%;
  min-height: 667px;
  background: #e7e7e7;
}
.narBar {
  background: white;
}
.narBar span {
  font-size: 23px;
  margin-left: 5px;
}
input {
  width: 300px;
  height: 26px;
  border: 1px solid #999999;
  border-radius: 6px;
  padding: 0 8px;
  box-sizing: border-box;
  font-size: 13px;
}
.header {
  display: flex;
  background: white;
  width: 375px;
  overflow: hidden;
}
.header div {
  flex: 1;
  height: 39px;
  font-size: 13px;
}
.header div span {
  position: relative;
  display: inline-block;
  width: 100%;
  top: 14.5px;
  text-align: center;
  border-left: 1px solid #e5e5e5;
}
.itemPicture {
  display: flex;
  flex-wrap: wrap;
}
.itemPic {
  width: 170px;
  height: 267px;
  background: white;
  margin-left: 11.5px;
  margin-top: 11.5px;
  position: relative;
  font-size: 13px;
}
.itemPic img {
  width: 100%;
  height: 210px;
}
.span1 {
  color: #9999;
  font-size: 12px;
  margin-right: 8px;
  margin-left: 5px;
}
/* 问题 */
.text {
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: initial;
}
.itemPic .price {
  font-weight: 1000;
  font-size: 18px;
}
.red {
  color: red;
}
.bottom-text {
  margin-top: 15px;
  padding: 0 5px;
}
.bottom-text-right {
  margin-left: 90px;
  color: #999999;
}
.icon-collect {
  margin-left: 3px;
}
</style>