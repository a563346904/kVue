/*
 * @Author: your name
 * @Date: 2020-12-01 16:21:49
 * @LastEditTime: 2020-12-02 19:01:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \kVue\router+vuex原理\studyvue\src\krouter\kvue-router.js
 */
// 1. 实现一个插件
// 2. 实现VueRouter: 处理选项,监控url变化,动态渲染
let Vue;
class VueRouter {
    // Vue 要在这里用
    constructor(options) {
        // 1. 出路选项
        this.$options = options;

        // 2.需要响应式的current
        this.current = window.location.hash.slice(1) || '/'
        Vue.util.defineReactive(this, 'matched', []);
        // macth可以递归遍历路由表
        this.match()

        // 2. 监控url变化
        window.addEventListener("hashchange", this.onHashChange.bind(this));
    }

    onHashChange() {
        this.current = window.location.hash.slice(1);
        this.matched = []
        this.match()
    }

    match(routes) {
        routes = routes || this.$options.routes
        for (const route of routes) {
            //递归遍历
            if (route.path === '/' && this.current === '/') {
                this.matched.push(route)
                return
            }

            if (route.path !== '/' && this.current.indexOf(route.path) != -1) {
                this.matched.push(route)
                if (route.children) {
                    this.match(route.children)
                }
            }
        }
    }
}

// 一个类要成为一个插件必须要使用install方法
// 插件要求实现install(Vue)
VueRouter.install = function (_vue) {
    Vue = _vue;
    // 先执行 install方法， 按照同步代码执行顺序， 没有$router实例
    // 利用全局混入延迟调用后续代码
    Vue.mixin({
        beforeCreate() {
            // 以后在每个组件中
            if (this.$options.router) {
                // 此时的上下文this是 当前组件
                Vue.prototype.$router = this.$options.router;
            }

        }
    })

    // 任务2：注册两个全局组件
    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                required: true
            }
        },
        // 不可以写template 
        render(h) {
            return h('a', {
                attrs: {
                    href: '#' + this.to
                }
            }, this.$slots.default)
        }
    });
    Vue.component('router-view', {
        // 不可以写template 
        render(h) {
            // 标记当前router-view深度
            this.$vnode.data.routerView = true;

            let parent = this.$parent;
            let depth = 0;
            while (parent) {
                const vnodeData = parent.$vnode && parent.$vnode.data
                if (vnodeData && vnodeData.routerView) {
                    depth++
                }
                parent = parent.$parent;
            }
            // let depth = 0;
            // let parent = this.$parent;
            // while(depth < 3) {
            //     const vnodeData = parent.$vnode && parent.$vnode.data
            //     // if(vnodeData) {
            //     //     if(vnodeData.routerView) {
            //             depth++
            //     //     }
            //     // }
            //     parent = this.$parent;
            // }

            // 获取current的值
            let Component = null;
            // const route = this.$router.$options.routes.find(route => route.path === this.$router.current);
            // if(route) {
            //     Component = route.component;
            // }

            console.log(this.$router.matched)
            const route = this.$router.matched[depth]
            if (route) {
                Component = route.component
            }

            return h(Component)
        }
    });
}

export default VueRouter