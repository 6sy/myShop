<template>
    <div >
       <narBar class='narBar'>
      <div slot='left'
           @click='$router.go(-1)'><span class='iconfont icon-tubiaozhizuo--'
              style=' font-size: 25px;'></span></div>
      <div slot='center'>我的收藏</div>
    </narBar>

    <div class='itemPicture' >
        <div class='itemPic'
             v-for='(item,index) in goodList'
             :key='index'
             @click='goGoodItem(item.s_uid)' style='border:1px solid #e3e3e3'>
          <img :src="item.s_img_one">
          <div class='text'><span class='span1'>推荐</span><span>{{item.s_msg}}</span></div>
          <div class='bottom-text'><span class='price'>¥{{item.s_newPrice}}</span>
            <span class='bottom-text-right'>{{item.s_collect}}<span class='iconfont icon-collect'></span></span>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import narBar from '../../common/NavBar/NavBar'
export default {
    components:{
        narBar
    },
    data(){
        return{
            goodList:[]
        }
    },
    created(){
        this.getCollect()
    },
    activated(){
        this.getCollect()
    },
    methods:{
        goGoodItem (id) {
        this.$router.push('/goods/' + id)
        },
        async getCollect(){
            const result = await this.$http({
        method: 'get',
        url: 'api/shops/getCollectList',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
         }
        })
        if(result.data.success){
            this.goodList=result.data.data
        }
        }
    }
}
</script>
<style scoped>
.itemPicture {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 60px;
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
.bottom-text {
  margin-top: 15px;
  padding: 0 5px;
  display: flex;
  justify-content: space-between;
}
.bottom-text-right {
  color: #999999;
}
.icon-collect {
  margin-left: 3px;
}
</style>