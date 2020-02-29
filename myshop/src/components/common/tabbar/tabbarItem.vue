<template>
  <div class="tab-bar-item"
       @click="itemClick"
       :style="activeStyle">

    <slot></slot>
  </div>
</template>
<script>

export default {
  data () {
    return {

    }
  },
  computed: {
    isActive () {
      if (this.$route.path === this.path) { return true } else { return false }
    },
    activeStyle () {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  props: {
    path: String, // 路由
    activeColor: {
      type: String,
      default: 'red'
    }// 点击颜色
  },
  methods: {
    itemClick () {
      this.$router.replace(this.path)
    }
  }
}
</script>
<style  scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
  line-height: 49px;
}
</style>
