/*
 * @Author: your name
 * @Date: 2020-12-01 15:56:28
 * @LastEditTime: 2020-12-02 17:37:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \kVue\router+vuex原理\studyvue\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
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
        path: '/about',
        component: {  
          render(h) {
            return h('div', {}, ['about, page AA', h('router-view')])
        }},
        children: [
          {
            path: '/about/a',
            component: {  
              render(h) {
                return h('div', {}, ['about, page AB'])
            }}
          }
        ]
      }
      
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
