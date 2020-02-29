import Vue from 'vue/dist/vue'
import vueRouter from 'vue-router'
import login from '../components/start/login'
import rigister from '../components/start/register'
import enter from '../components/view/enter'
import home from '../components/view/home/home'
import serach from '../components/view/serach/serach'
import profile from '../components/view/profile/profile'
import cart from '../components/view/cart/cart'


Vue.use(vueRouter)
const routes = [
  { path: '/', redirect: '/enter' },
  { path: '/login', component: login, meta: { isLogin: true } },
  { path: '/register', component: rigister, meta: { isLogin: true } },
  {
    path: '/enter', component: enter, children: [
      { path: '/', redirect: '/home', meta: { isLogin: true } },
      { path: '/home', component: home, meta: { isLogin: true } },
      { path: '/serach', component: serach, meta: { isLogin: true } },
      { path: '/cart', component: cart, meta: { isLogin: false } },
      { path: '/profile', component: profile, meta: { isLogin: false } }
    ]
  }
]


// 创建router实例
const router = new vueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {
    next()
  } else {
    let token = localStorage.getItem('my-token')
    if (!token) {
      next('/login')
    } else {
      next()
    }
  }
})

// 导出router
export default router