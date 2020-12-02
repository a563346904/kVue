/*
 * @Author: your name
 * @Date: 2020-12-02 09:53:03
 * @LastEditTime: 2020-12-02 10:46:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \kVue\router+vuex原理\studyvue\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 1
  },
  mutations: {
    add(state) {
      state.counter++;
    }
  },
  actions: {
    add({commit}) {
      setTimeout(() => {
        commit('add');
      }, 1000);
    }
  },
  modules: {
  }
})
