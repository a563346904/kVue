/*
 * @Author: your name
 * @Date: 2020-12-01 09:12:16
 * @LastEditTime: 2020-12-01 12:47:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \kVue\router+vuex原理\vue-study-web25\src\kstore\index.js
 */
import Vue from 'vue'
import Vuex from './kvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 1
  },
  mutations: {
    add(state) {
      state.counter++
    }
  },
  actions: {
    add({commit}) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  getters: {
    computCount: state => {
      return state.counter * 2;
    }
  },
  modules: {
  }
})
