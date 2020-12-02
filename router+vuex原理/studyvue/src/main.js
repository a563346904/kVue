import Vue from 'vue'
import App from './App.vue'

// import router from './router'
import router from './krouter'

import store from './kstore'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

/**
 * vue-router
 * 
 *  问题
 *    1. vue-router 不能在其他框架中使用，基于vue依赖vue
 *          数据响应式： 当数据放生变化，我知道他变了，做出对应响应
 *          当url发生变化的时候，可以捕获到对应组件，每个组件都有一个render函数， render方法会返回一个vNode， 把vNode转换成真实dom
 *          current change => render => vdom
 *          vue-router 和vue是深向集成
 * 
 *    2. use router时 会做一个什么事
 *          插件要求实现install方法， Vue.use 的时候会向install中传入vue
 *          install 方法会在 new VueRouter之前, 所以在install中是没有$router实例的, 使用混入的方法解决
 * 
 *    3. 为什么要把路由器实实例传到vue实例中
 *          将来在每一个组件中都需要使用this.$router类似写法, 方便全局后续调用
 * 
 *    4. router-view 做的是什么
 *          展示路由对应的组件
 *          const route = this.$router.$options.routes.find(route => route.path === this.$router.current);
 *          return h(route.component)
 * 
 *    5. router-link 是怎么起作用的
 *          将current-url通过Vue.util.defineReactive设置为响应式数据
 *              **将数据变成响应式数据有两种方法
 *                    1. vue.util.defineReactive
 *                    2. new Vue({ data() {} })
 *          通过hashchange方法监听当前url，改变内部current-url, 每次改变都会触发render方法,从而重新渲染组件
 *          
 *    6. router-view 和 router-link都是全局组件怎么注册的
 *          通过Vue.component方法注册全局组件
 * 
 *    7. 尝试解决嵌套路由
 *          1. router-view深度标记
 *          2. 路由匹配时获取代表深度层级的matched数组
 *    
 *  需求分析
 *    spa页面不能刷新
 *       - hash #/about
 *       - History api /about
 *    根据url显示对应的内容
 *       - router-view
 *       - 数据响应式：current变量持有url地址，一旦变化，动态执行render
 * 
 *  任务
 *    实现VueRouter类
 *       - 处理路由选项
 *       - 监控url变化, hashchange
 *       - 响应这个变化
 *    实现install方法
 *       - $router注册
 *       - 两个全局组件
 *  
 * 
 *  vuex: 
 *    vue-vuex中使用commit提交mutation来修改state的原因解析
 *    可以直接修改store.state.属性
 *    在commit函数内部，由this._commit()函数来修改state，
 *    _withCommit 函数的参数 fn 就是修改state的函数。在执行 fn() 之前，会将 this._committing 设置为 true。等到fn()执行完毕后，
 *    又将 this._committing 的值进行恢复。那么为什么要将 this._withCommitting设置为true， 在vuex/src/store.js 的开头发现了判断严格模式的代码
 *    当 vuex设置为严格模式的时候，就会执行 enableStrictMode 函数
 *    在 enableStrictMode 函数内部，调用了 $watch 函数来观察 state的变化。当state变化时，就会调用 assert 函数，判断 store._committing（即 上文的 this._committing） 
 *    的值，如果不为 true，就会报出异常
 *    https://blog.csdn.net/zhq2005095/article/details/78359883
 */
