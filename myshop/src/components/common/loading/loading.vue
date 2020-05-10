<template>
  <div class='views'
       v-show='isShow'>
    <canvas id='canvas'
            width="500"
            height='500'></canvas>
  </div>
</template>
<script>
function SmallRing (begin, end) {
  this.begin = begin
  this.end = end
}
SmallRing.prototype.active = function (ctx) {
  ctx.beginPath()
  ctx.lineWidth = window.localStorage.getItem('lineWidth')
  ctx.lineCap = 'round'
  ctx.arc(250, 250, window.localStorage.getItem('radius'), this.begin, this.end)
  ctx.stroke()
}

export default {
  data () {
    return {
      ctx: '',
      ringBegin: 0.1,
      ringEnd: 1.1,
      smallBegin1: -0.7,
      smallEnd1: -0.6,
      smallBegin2: -0.2,
      smallEnd2: -0.1,
      // 速度记录
      i: 0
    }
  },
  props: {
    // 半径
    radius: {
      type: Number,
      default: 100
    },
    // fast 快速  slow减速 constant匀速
    speed: {
      type: String,
      default: 'constant'
    },
    color: {
      type: Array,
      // default: ['rgb(255, 105, 180)', 'rgb(255,165,0)']
      default: function () {
        return ['rgb(255, 105, 180)', 'rgb(255,165,0)']
      }
    },
    lineWidth: {
      type: Number,
      default: 20
    },
    isShow: {
      type: Boolean,
      default: false
    }

  },
  created () {
    const radius = this.radius
    window.localStorage.setItem('radius', radius)
    const lineWidth = this.lineWidth
    window.localStorage.setItem('lineWidth', lineWidth)
  },
  mounted () {
    // setInterval(this.show, 1000 / 60)
    // this.show()
    const ctx = document.getElementById('canvas').getContext('2d')
    this.ctx = ctx
    window.requestAnimationFrame(this.show)
  },
  activated () {
    window.requestAnimationFrame(this.show)
  },
  methods: {
    show () {
      // const ctx = document.getElementById('canvas').getContext('2d')
      this.ctx.clearRect(0, 0, 500, 500)
      this.add()
      this.overflow()
      this.point()
      this.ring(this.ctx)
      this.smallRing(this.ctx)
      window.requestAnimationFrame(this.show)
    },
    ring (ctx) {
      ctx.beginPath()
      const gradient = ctx.createLinearGradient(150, 250, 350, 251)
      gradient.addColorStop(0, this.color[0])
      gradient.addColorStop(1, this.color[1])
      // 渐变描边
      ctx.strokeStyle = gradient
      // ctx.shadowColor = 'rgba(255, 0, 255,0.03)'
      // ctx.shadowOffsetY = 15
      // ctx.shadowOffsetX = 15
      // 登录状态下不会出现这行文字，点击页面右上角一键登录
      ctx.lineWidth = localStorage.getItem('lineWidth')
      ctx.lineCap = 'round'
      ctx.arc(250, 250, this.radius, this.ringBegin * Math.PI, this.ringEnd * Math.PI)
      ctx.stroke()
    },
    /* eslint-disable no-new */
    smallRing (ctx) {
      const a = new SmallRing(this.smallBegin1 * Math.PI, this.smallEnd1 * Math.PI)
      const b = new SmallRing(this.smallBegin2 * Math.PI, this.smallEnd2 * Math.PI)
      a.active(ctx)
      b.active(ctx)
    },
    // add
    add () {
      this.smallBegin1 += this.sudu()
      this.smallEnd1 += this.sudu()
      this.smallBegin1 = Number(this.smallBegin1.toFixed(3))
      this.smallEnd1 = Number(this.smallEnd1.toFixed(3))
      this.smallBegin2 += this.sudu()
      this.smallEnd2 += this.sudu()
      this.smallBegin2 = Number(this.smallBegin2.toFixed(3))
      this.smallEnd2 = Number(this.smallEnd2.toFixed(3))
    },
    // 溢出
    overflow () {
      if (this.smallEnd1 === 2) {
        this.smallEnd1 = 0
      }
      if (this.smallBegin1 === 2) {
        this.smallBegin1 = 0
      }
      if (this.smallEnd2 === 2) {
        this.smallEnd1 = 0
      }
      if (this.smallBegin2 === 2) {
        this.smallBegin1 = 0
      }
      if (this.ringBegin === -2) {
        this.ringBegin = 0
      }
      if (this.ringEnd === -2) {
        this.ringEnd = 0
      }
    },
    // 交接点，重设坐标
    point () {
      if (this.smallEnd1 === this.ringBegin || this.smallEnd1 - this.ringBegin === 2) {
        this.smallBegin1 = this.ringEnd - (0.1)
        this.smallEnd1 = this.smallBegin1 + (0.1)
        this.ringBegin = (this.ringBegin - 0.1)
        this.ringEnd = (this.ringEnd - 0.1)
        this.ringBegin = Number((this.ringBegin).toFixed(3))
        this.ringEnd = Number((this.ringEnd).toFixed(3))
      }
      if (this.smallEnd2 === this.ringBegin || this.smallEnd2 - this.ringBegin === 2) {
        this.smallBegin2 = this.ringEnd - (0.1)
        this.smallEnd2 = this.smallBegin2 + (0.1)
        this.ringBegin = (this.ringBegin - 0.1)
        this.ringEnd = (this.ringEnd - 0.1)
        this.ringBegin = Number((this.ringBegin).toFixed(3))
        this.ringEnd = Number((this.ringEnd).toFixed(3))
      }
    },
    SmallRing (begin, end) {
      this.begin = begin
      this.end = end
    },
    // sudu
    sudu () {
      const slow = 0.01
      const constant = 0.02
      const fast = 0.05
      if (this.speed === 'constant') {
        return constant
      } else if (this.speed === 'fast') {
        return fast
      } else if (this.speed === 'slow') {
        return slow
      }
    }
  }
}
</script>
<style>
.views {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  left: 0;
  top: 0;
}
#canvas {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>