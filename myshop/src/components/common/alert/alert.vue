<template>
  <div>
    <span class='toast'
          v-show='isShow'
          :class='color'>
      {{message}}
    </span>
  </div>
</template>
<script>
export default {
  data () {
    return {
      message: '',
      isShow: false,
      color: '',
    }
  },
  methods: {
    success (message, duration) {
      this.color = 'green'
      this.message = message
      this.isShow = true
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    },
    error (message, duration) {
      this.color = 'red'
      this.message = message
      this.isShow = true
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    }
  }
}
</script>
<style scoped>
.toast {
  position: fixed;
  width: 300px;
  margin-left: 37.5px;
  top: 30px;
  z-index: 999;
  padding: 8px 10px;
  text-align: center;
  animation: animate;
  animation-duration: 1s;
}
.red {
  background: rgb(253, 226, 226);
  color: #f56c6c;
}
.green {
  background: rgb(240, 249, 235);
  color: #67c23a;
}
@keyframes animate {
  0% {
    opacity: 0;
    top: 0;
  }
  100% {
    opacity: 1;
    top: 30px;
  }
}
</style>