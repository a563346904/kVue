/*
 * @Author: your name
 * @Date: 2020-12-01 16:20:29
 * @LastEditTime: 2020-12-02 16:24:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \kVue\router+vuex原理\studyvue\src\krouter\index.js
 */
import Vue from 'vue'
import VueRouter from './kvue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [
      {
        path: '/about/info',
        component: {render(h) {return h('div', 'infoPage')}}
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
