import Vue from 'vue/dist/vue.esm.js'
import vueRouter from 'vue-router'
import login from '../components/start/login'
import rigister from '../components/start/register'
import enter from '../components/view/enter'
import home from '../components/view/home/home'
import serach from '../components/view/serach/serach'
import profile from '../components/view/profile/profile'
import cart from '../components/view/cart/cart'
import serachItem from '../components/view/serach/serachItem'
import goods from '../components/view/goods/good'
import order from '../components/view/order/order'
import profileOrder from '../components/view/profile/profileOrder'
import profileInfo from '../components/view/profile/profileInfo'
import chat from '../components/view/chat/chat'
import chatShop from '../components/view/chat/chatShop'
import chatShopUser from '../components/view/chat/chatShopUser'


Vue.use(vueRouter)
const routes = [
  { path: '/', redirect: '/enter' },
  { path: '/login', component: login, meta: { isLogin: true } },
  { path: '/register', component: rigister, meta: { isLogin: true } },
  { path: '/serachItem', name: 'serachItem', component: serachItem, meta: { isLogin: true } },
  { path: '/goods/:id', name: 'goods', component: goods },
  { path: '/order', name: 'order', component: order },
  { path: '/profileOrder', name: 'profileOrder', component: profileOrder },
  { path: '/profileInfo', component: profileInfo, name: 'profileInfo' },
  { path: '/chat', component: chat, name: 'chat' },
  { path: '/chatShop', component: chatShop, name: 'chatShop' },
  { path: '/chatShopUser', component: chatShopUser, name: 'chatShopUser' },
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