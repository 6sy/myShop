<template>
  <div>
    <p>{{name}}</p>
    <h2 v-text='name'></h2>
  </div>
</template>
<script>

export default class watcher {
  constructor(vm, exp, cb) {
    this.vm = vm
    this.getter = parsePath(exp)
    this.cb = cb
    this.value = this.get()
  }
  get () {
    window.target = this
    let value = this.getter.call(this.vm, this.vm)
    window.target = undefined
    return value
  }
  update () {
    const oldvalue = this.value
    this.value = this.get()
    this.cb.call(this.vm, this.value, oldValue)
  }
}
Vue.prototype.$watch = function (exp, cb, options) {
  const vm = this
  options = options || {}
  const watcher = new watcher(vm, exp, cb, options)
  if (options.immediate) {
    cb.call(vm, watcher.value)
  }
  return function unwatchFn () {
    watcher.teardown()
  }
}
export default class watcher {
  constructor(vm, exp, cb) {
    this.vm = vm
    //新增
    if (options) {
      this.deep = !!options.deep
    } else {
      this.deep = false
    }
    this.deps = []
    this.depIds = new Set()
    if (typeof exp === 'function') {
      this.getter = exp
    } else {
      this.getter = parsePath(exp)
    }
    this.cb = cb
    this.value = this.get()
  }
  get () {
    window.target = this
    let value = this.getter.call(this.vm, this.vm)
    //新增
    if (this.deep) {
      traverse(value)
    }
    window.target = undefined
    return value
  }
}
addDep(dep){
  const id = dep.id
  // dep watcher产生互相关联
  if (!this.depIds.has[id]) {
    this.depIds.add(id)
    //watcher添加dep
    this.deps.push(dep)
    //dep添加watcher
    dep.addSub(this)
  }
}
  ......
}


let uid = 0 //新增
export default class Dep {
  constructor() {
    this.id = uid++  //新增
    this.subs = []
  }
  depend () {
    if (window.target) {
      this.addSub(window.target)  //废弃
      window.target.addDep(this)  //新增
    }
  }
}

teardown(){
  let i = this.deps.length
  while (i--) {
    this.deps[i].removeSub(this)
  }
}

export defaullt class Dep {
  ......
  removeSub (sub) {
    const index = this.subs.indexOf(sub)
    if (index > -1) {
      return this.subs.splice(index, 1)
    }
  }
}
function initWatch (vm, watch) {
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

function createWatcher (vm, exp, handler, options) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(exp, handler, options)
}
Vue.prototype.$on = function (event, fn) {
  const vm = this
  if (Array.isArray(fn)) {
    for (let i = 0, j = event.length; i < j; i++) {
      this.$on(event, fn[i])
    }
  } else {
    (vm._events[event] || (vm.events[event] = [])).push(fn)
  }
  return vm
}
Vue.prototype.$off = function (event, fn) {
  const vm = this
  // 无参数
  if (!arguments) {
    vm._events = Object.create(null)
    return vm
  }
  // 新增
  // 一个参数
  else if (arguments.length === 1) {
    const e = arguments[0]
    //判断是否为数组
    if (Array.isArray(e)) {
      for (let i = 0, j = e.length; i < j; i++) {
        this.$off(e[i])
      }
    } else {
      vm._events[event] = null
      return vm
    }
  }
  // 传递事件名和回调函数
  else if (fn && typeof event === 'string') {
    const cbs = vm._events[event]
    let j = cbs.length
    for (let i = 0; i < j; i++) {
      // 
      if (fn === cbs[i]) {
        cbs.splice(i, 1)
        return
      }
    }
  }
  return vm
}

Vue.prototype.$emit = function (event) {
  const vm = this
  let cbs = vm._events[event]
  if (cbs) {
    const args = toArray(arguments, 1)
    for (let i = 0, j = cbs.length; i < j; i++) {
      try {
        cbs[i].apply(vm, args)
      } catch (e) {
        console.log(e)
      }
    }
  }
  return vm
}

Vue.prototype.$once = function (event, fn) {
  const vm = this
  function on () {
    vm.$off(event, on)
    fn.apply(vm, arguments)
  }
  on.fn = fn
  vm.$on(event, on)
  return vm
}
</script>

