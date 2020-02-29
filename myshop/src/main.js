import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import router from './router/router'
import '../public/css/global.css'
import '../public/font/font_xn7gg6ug1r/iconfont.css'
import axios from 'axios'
import qs from 'qs'
import alert from '../src/components/common/alert/alert.js'
Vue.use(alert)
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
// 请求响应拦截
axios.interceptors.request.use(config => {
  console.log(1)
  return config
}, err => {
  console.log(err)
})
// 响应拦截
axios.interceptors.response.use(res => {
  return res
}, err => {
  console.log(err)
})

Vue.prototype.$http = axios
Vue.prototype.$qs = qs

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
