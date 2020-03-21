class Observer {
  constructor(data) {
    this.observe(data)
  }
  observe (data) {
    if (data && typeof data === 'object') {
      Object.keys(data).forEach((key) => {
        this.defineReactive(data, key, data[key])
      })
    }
  }
  defineReactive (obj, key, value) {
    let that = this
    this.observe(value)
    let dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: false,
      get () {
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set (newVal) {
        that.observe(newVal)
        if (newVal != value) {
          value = newVal
        }
        dep.notify()
      }
    })
  }
}
let uid = 0
class Dep {
  constructor() {
    this.id = uid++
    this.subs = []
  }
  // 收集观察者
  addSub (watcher) {
    this.subs.push(watcher)
  }
  // 通知观察者
  notify () {
    this.subs.forEach(w => w.update())
  }
}

class watcher {
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb
    this.oldVal = this.getOldVal()
  }
  // 获取旧值
  getOldVal () {
    Dep.target = this
    const oldVal = compileUtil.getVal(this.expr, this.vm)
    Dep.target = null
    return oldVal
  }
  // 更新视图
  update () {
    const newVal = compileUtil.getVal(this.expr, this.vm)
    if (this.oldVal !== newVal) {
      this.cb(newVal)
    }
  }
}