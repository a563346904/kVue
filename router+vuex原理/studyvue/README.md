### Vue全家桶 & 原理
---


#### 资源
---
1. [vue-router](https://router.vuejs.org/zh/guide/)
2. [vuex](https://vuex.vuejs.org/zh/guide/)
3. [vue-router源码](https://github.com/vuejs/vue-router)
4. [vuex源码](https://github.com/vuejs/vuex)


#### 知识点
##### vue-router
Vue Router 是 [Vue.js](https://cn.vuejs.org/) 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单⻚面应用变得易如反 掌。

安装: `vue add router`  
核心步骤:
- 步骤一:使用vue-router插件，router.js
```javascript
 import Router from 'vue-router' 
 Vue.use(Router)
```
- 步骤二:创建Router实例，router.js
```javascript
export default new Router({...})
```
- 步骤三:在根组件上添加该实例，main.js
```javascript
import router from './router' 
new Vue({
    router, 
}).$mount("#app");
```
- 步骤四:添加路由视图，App.vue
```javascript
<router-view></router-view>
```
- 导航
```javascript  
<router-link to="/">Home</router-link>  
<router-link to="/about">About</router-link>
```

```javascript
this.$router.push('/')  
this.$router.push('/about')
```

#### vue-router源码实现
单⻚面应用程序中，url发生变化时候，不能刷新，显示对应视图内容

#### 需求分析
- spa ⻚面不能刷新
    + hash #/about
    + History api /about
- 根据url显示对应的内容
    + router-view
    + 数据响应式:current变量持有url地址，一旦变化，动态重新执行render

#### 任务
- 实现一个插件
    + 实现VueRouter类
        + 处理路由选项
        + 监控url变化，hashchange
        + 响应这个变化
    + 实现install方法
        + $router注册
        + 两个全局组件

####  实现一个插件:创建VueRouter类和install方法

```javascript
let Vue; // 引用构造函数，VueRouter中要使用

// 保存选项
class VueRouter {
    constructor(options) { 
        this.$options = options;
    } 
}
// 插件:实现install方法，注册$router  
VueRouter.install = function(_Vue) {
    // 引用构造函数，VueRouter中要使用   
    Vue = _Vue;
    // 任务1:挂载$router   
    Vue.mixin({
        beforeCreate() {
            // 只有根组件拥有router选项
            if (this.$options.router) {
                // vm.$router
                Vue.prototype.$router = this.$options.router; 
            }
        } 
    });
    // 任务2:实现两个全局组件router-link和router-view   
    Vue.component('router-link', Link)  
    Vue.component('router-view', View)
};
export default VueRouter;
 
```

> 为什么要用混入方式写?主要原因是use代码在前，Router实例创建在后，而install逻辑又需要用 到该实例

#### 创建router-view和router-link
创建krouter-link.js
```javascript
export default {
    props: {
        to: String,
        required: true
    },
    render(h) {
        return h('a', {
            attrs: {
                href: '#' + this.to
            }
        }, [
            this.$slots.default
        ])
        
    }
}

```
创建krouter-view.js
```javascript
export default {
    render(h) {
        return h(null)
    }
}

```

#### 监控url变化  
定义响应式的current属性，监听hashchange事件
```javascript
 
class VueRouter {
    constructor(options) {
        // 定义响应式的属性current
        const initial = window.location.hash.slice(1) || '/'  
        Vue.util.defineReactive(this, 'current', initial)
        
        // 监听hashchange事件
        window.addEventListener('hashchange', this.onHashChange.bind(this))
        window.addEventListener('load', this.onHashChange.bind(this))
    }
    
    onHashChange() {
        this.current = window.location.hash.slice(1)
    }
}
```

动态获取对应组件，krouter-view.js
```javascript
export default {
    render(h) {
        // 动态获取对应组件
        let component = null;
        const route = this.$router.$options.routes.find(route => route.path ===
this.$router.current)  
        if(route) component = route.component
        return h(component);
    }
}
```
        




问题:
1. `vue-router` 为什么不能在其他框架中使用
2. use `router`时 会做一个什么事
3. 为什么要把路由器实实例传到`vue`实例中
4. `router-view` 做的是什么
5. `router-link` 是怎么起作用的
6. `router-view`和 router-link都是全局组件怎么注册的