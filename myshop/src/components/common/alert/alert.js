/* exported global_var */
import Alert from './alert.vue'
const obj = {}
obj.install = function (Vue) {
  // 创建构造器
  const AlertContrystor = Vue.extend(Alert)
  // new的方式 根据组件构造器，可以创建组件对象
  const alert = new AlertContrystor()
  // 手动挂载某一个元素上
  alert.$mount(document.createElement('div'))
  // toast.$el对应的就是div
  document.body.appendChild(alert.$el)

  Vue.prototype.$alert = alert
}
export default obj