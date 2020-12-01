/*
 * @Author: your name
 * @Date: 2020-12-01 09:12:16
 * @LastEditTime: 2020-12-01 13:28:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \kVue\router+vuex原理\vue-study-web25\src\kstore\kvuex.js
 */
// 声明一个插件
// 声明一个类Store
let Vue;

class Store {
  constructor(options) {

    console.log(options.getters)
    // 1.选项处理
    // this.$options = options
    this._mutations = options.mutations
    this._actions = options.actions

    // 2.响应式state
    this._vm = new Vue({
      data: {
        $$state: options.state
      }
    })
    
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
    // 声明getters存储
    this.getters = {};
    // 循环添加事件
    forEachValue(options.getters, (getterFn, getterName) => {
      registerGetter(this, getterName, getterFn)
    })
  }

  get state() {
    return this._vm._data.$$state
  }

  set state(v) {
    console.error('please use replaceState to reset state');
  }

  commit(type, payload) {
    const entry = this._mutations[type]

    if (!entry) {
      console.error('unkwnow mutation type');
      return
    }

    entry(this.state, payload)
  }

  dispatch(type, payload) {
    const entry = this._actions[type]

    if (!entry) {
      console.error('unkwnow action type');
      return
    }

    entry(this, payload)
  }
}
// install方法 注册store
function install(_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

// 注册getter事件 将store.state传入getterFn中
function registerGetter(store, getterName, getterFn) {
  Object.defineProperty(store.getters, getterName, {
    get: () => {
      return getterFn(store.state)
    },
  })
}
// 循环调用
function forEachValue(obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}

// 导出对象认为是Vuex
export default {Store, install}