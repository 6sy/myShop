<template>
  <div class='confirm'>
    <div class='msg'>
      <span>请点击图片旋转至正向朝上</span>
      <span @click='refresh'>点击刷新</span>
    </div>
    <div class='img'>
      <img :src="item.img"
           alt=""
           v-for='(item,index) in imgNow'
           :key='index'
           @click='rotate(index)'
           :class='"img"+index'>
    </div>
    <loading :isShow='isLoading'
             :radius='30'
             :lineWidth='10'></loading>
  </div>
</template>
<script>
import loading from '@/components/common/loading/loading.vue'
export default {
  components: {
    loading
  },
  data () {
    return {
      deg: [0, 0, 0, 0],
      // 所有图片信息
      imgMes: [
        { deg: 0, img: 'http://localhost:3000/top1.jpg' },
        { deg: 0, img: 'http://localhost:3000/top2.jpg' },
        { deg: 180, img: 'http://localhost:3000/bottom1.png' },
        { deg: 180, img: 'http://localhost:3000/bottom2.png' },
        { deg: 180, img: 'http://localhost:3000/bottom3.png' },
        { deg: 270, img: 'http://localhost:3000/left2.png' },
        { deg: 90, img: 'http://localhost:3000/right1.png' }
      ],
      // 选中的图片信息
      imgNow: [],
      // 验证成功
      isConfirm: false,
      // loading开关
      isLoading: false,
      // 清空样式
      isStyle: false
    }
  },
  created () {
    this.refresh()
  },
  methods: {
    // refrsh刷新图片
    refresh () {
      this.isLoading = true
      this.deg = [0, 0, 0, 0]
      let num = Math.floor(Math.random() * 7)
      this.imgNow = []
      for (let i = 0; i <= 3; i++) {
        num++
        num > 6 ? num = 0 : num
        this.imgNow.push(this.imgMes[num])
      }
      // 重置元素的旋转属性
      this.$nextTick(function () {
        document.getElementsByTagName('img')[0].style.transform = 'rotate(0deg)'
        document.getElementsByTagName('img')[1].style.transform = 'rotate(0deg)'
        document.getElementsByTagName('img')[2].style.transform = 'rotate(0deg)'
        document.getElementsByTagName('img')[3].style.transform = 'rotate(0deg)'
      })
      this.readyImg(this.imgNow)
    },
    rotate (index) {
      this.deg[index] += 90
      document.getElementsByTagName('img')[index].style.transform = `rotate(${this.deg[index]}deg)`
      // this.deg[index] === 360 ? this.deg[index] = 0 : ''
      // console.log(this.imgNow)
      // console.log(this.deg)
      console.log(this.confirm())
    },
    confirm () {
      let i = 0
      let isOk = true
      for (i = 0; i < 4; i++) {
        if ((this.deg[i] + this.imgNow[i].deg) % 360 !== 0) {
          isOk = false
        }
      }
      return isOk
    },
    readyImg (pics) {
      const picsAll = pics.map((imgurl) => {
        // imgurl = imgurl + '?v=' + Math.random(); // 仅是为了区分下不同的图片链接
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.src = imgurl.img
          img.onload = () => resolve(imgurl)
          img.onerror = () => reject(new Error(imgurl + ' load error'))
        })
      })
      // 请求成功
      Promise.all(picsAll).then(() => {
        this.isLoading = false
      }).catch((e) => {
        console.log(e);
      })
    }

  }
}
</script>
<style scoped>
.confirm {
  height: 100px;
  width: 325px;
  border-radius: 1px solid red;
  margin: 0 auto;
  padding: 0;
}
.msg {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999999;
  letter-spacing: 0.3px;
}
.img {
  margin-top: 10px;
}
.img img {
  width: 80px;
  height: 80px;
  margin-right: 1px;
  transition: all;
  transition-duration: 1s;
  transition-timing-function: ease-out;
}
</style>