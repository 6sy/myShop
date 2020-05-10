<template>
  <div class='upload'
       v-show='isShow'>
    <!-- header -->
    <narBar class='narBar'>
      <div slot='left'
           @click='goBack'><span class='iconfont icon-tubiaozhizuo--'
              style=' font-size: 20px;'></span></div>
      <div slot='center'
           style='letter-spacing:1.5px;font-size: 15px'>选择图片</div>
      <div slot='right'><span style='padding:1px;font-size:12px;'
              @click='confirmImg'>确定</span></div>
    </narBar>
    <input type="file"
           @change="handleChange"
           multiple='true'
           accept='image/*'
           v-show='false'>
    <canvas class='canvas'></canvas>
    <canvas class='canvas1'
            v-show='false'></canvas>
  </div>
</template>
<script>
import narBar from '../../common/NavBar/NavBar'
// canvas不能缩放
export default {
  components: {
    narBar
  },
  data () {
    return {
      isShow: false,
      canvasWidth: 375,
      canvasHeight: 200,
      ctx: '',
      img: '',
      // 矩形的位置
      chooseImg: {
        x: 0,
        y: 0,
        width: 100,
        height: 100
      },
      //  矩形的色彩
      chooseRgb: ''
    }
  },
  mounted () {
    const that = this
    const canvas = document.querySelector('.canvas')
    const ctx = canvas.getContext('2d')
    this.ctx = ctx
    canvas.width = this.canvasWidth
    canvas.height = this.canvasHeight
    console.log(canvas.offsetTop)
    // 绑定canvas鼠标进入
    canvas.onmousemove = function (e) {
      let x = e.offsetX
      let y = e.offsetY
      console.log(x, y)

      x <= 50 ? that.chooseImg.x = 0 : that.chooseImg.x = x - 50
      y <= 50 ? that.chooseImg.y = 0 : that.chooseImg.y = y - 50
      x >= 325 ? that.chooseImg.x = 275 : that.chooseImg.x = x - 50
      y >= 150 ? that.chooseImg.y = 100 : that.chooseImg.y = y - 50
      if (x <= 50) {
        that.chooseImg.x = 0
      }
      if (y <= 50) {
        that.chooseImg.y = 0
      }
    }
  },
  methods: {
    // 点击上传
    iptClick () {
      document.querySelector('input').click()
    },
    // 读取图片
    handleChange (e) {
      const that = this
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = function () {
        // this.reslut 为图片信息
        that.drawImg(this.result)
      }
    },
    // 创建一个图片对象 画到画布上
    drawImg (imgData) {
      const that = this
      this.isShow = true
      const img = new Image()
      img.src = imgData
      this.img = img
      img.onload = function () {
        // 循环动画
        window.requestAnimationFrame(that.animate)
      }
    },
    // 循环canvas
    animate () {
      this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.canvasWidth, this.canvasHeight)
      // 获取选中的图片色彩
      this.drawChoose()
      // 绘制灰色背景以及选中的彩色图片
      this.drawHui()
      // 绘制选中边框
      this.drawRect()
      window.requestAnimationFrame(this.animate)
    },
    // 全部图片变灰色并且画上彩色的
    drawHui () {
      const data = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight)
      for (let i = 0; i < data.data.length; i += 4) {
        const grey = (data.data[i] + data.data[i + 1] + data.data[i + 2]) / 3
        data.data[i] = data.data[i + 1] = data.data[i + 2] = grey
      }
      this.ctx.putImageData(data, 0, 0)
      this.ctx.putImageData(this.chooseRgb, this.chooseImg.x, this.chooseImg.y)
    },
    // 选中图片色彩
    drawChoose () {
      const data = this.ctx.getImageData(this.chooseImg.x, this.chooseImg.y, this.chooseImg.width, this.chooseImg.height)
      this.chooseRgb = data
    },
    drawRect () {
      this.ctx.beginPath()
      this.ctx.lineWidth = 3
      this.ctx.strokeStyle = 'rgb(255,255,255)'
      this.ctx.strokeRect(this.chooseImg.x, this.chooseImg.y, this.chooseImg.width, this.chooseImg.height)
    },
    goBack () {
      this.isShow = false
    },
    // 照片选择完毕
    confirmImg () {
      const canvas = document.querySelector('.canvas1')
      const ctx = canvas.getContext("2d")
      canvas.width = 100
      canvas.height = 100
      ctx.putImageData(this.chooseRgb, 0, 0)
      this.uploadImg(canvas)
    },
    uploadImg (canvas) {

      canvas.toBlob(async (blob) => {

        let fd = new FormData()
        fd.append('file', blob)
        fd.name = new Date().getTime()
        const result = await this.$http({
          method: 'post',
          url: 'api/users/upload',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: fd
        })
        if (result.data.success) {
          this.isShow = false
          this.$bus.$emit('on1', result.data.url)
          this.$alert.success('更换头像成功', 1000)
        }
      }, 'image/png')
    }
  }
}
</script>
<style scoped>
.upload {
  background: black;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
}
.narBar {
  height: 40px;
  width: 100%;
  background: green;
  text-align: center;
  color: white;
  line-height: 40px;
}
.canvas {
  margin-top: 160px;
}
</style>