<template>
  <div class='toast'
       v-show='isShow'
       :class='color'>
    {{message}}
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
  width: 375px;
  bottom: 0;
  z-index: 999;
  padding: 8px 10px;
  background-color: rgba(0, 0, 0, 0.3);
  text-align: center;
  color: honeydew;
}
.red {
  background: rgba(244, 67, 54);
}
.green {
  background: rgba(76, 175, 80);
}
</style>