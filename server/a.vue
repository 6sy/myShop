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
</script>