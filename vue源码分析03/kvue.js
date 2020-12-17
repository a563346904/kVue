/*
 * @Author: your name
 * @Date: 2020-12-03 09:31:25
 * @LastEditTime: 2020-12-10 14:45:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \kVue\手写vue原理\01-reactive.js
 */
// Object.defineproperty
// 数据拦截 响应式基础

function defineReactive(obj, key, val) {
    // 递归处理
    observe(val)

    const dep = new Dep()

    Object.defineProperty(obj, key, {
        get() {
            // 判断一下Dep.target是否存在,若存在则收集依赖
            Dep.target && dep.addDep(Dep.target)
            return val;
        },
        set(v) {
            if(v != val) {
                val = v;
                dep.notify();
            }
        }
    })
}

// 对象响应式 遍历每个key对其执行defineReactive
function observe(obj) {
    // 判断obj是不是对象
    if(typeof obj != 'object' || obj == null) {
        return
    }

    new Observe(obj)
}

function set(obj, key, value) {
    defineReactive(obj, key, value)
}

class Observe {
    constructor(obj) {
        this.value = obj;

        if(Array.isArray(obj)) {
            // todo
        } else {
            this.walk(obj) 
        }
    }

    walk(obj) {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key]);
        });   
    }
}

function proxy(vm) {
    Object.keys(vm.$data).forEach(key => {
        Object.defineProperty(vm, key, {
            get() {
                return vm.$data[key]
            },
            set(v) {
                vm.$data[key] = v
                // watchers.forEach(w => w.update())
            }
        })
    }); 
}

class kvue {
    constructor(options) {
        // 1. 响应式
        this.$options = options
        this.$data = options.data
        this.$methods = options.methods
        observe(this.$data)

        // 1.1 代理
        proxy(this) 

        // // 2. 编译
        // new Compile(options.el, this)
        if(options.el) {
            this.$mount(options.el)
        }
    }

    // $mount
    $mount(el) {
        // 获取根节点元素
        this.$el = document.querySelector(el)
        // 组件的渲染函数
        const updateComponent = () => {
            // 从选项options中获取render函数
            const { render } = this.$options
            // render方法的作用是获取虚拟dom， $createElement方法就是render中参数h
            const vnode = render.call(this, this.$createElement)
            // 把vnode转化为真是dom
            this._update(vnode)
        }

        // 为每个组件实例创建一个watcher
        new Watcher(this, updateComponent)
    }

    // 这个就是我们reader()中的参数h。
    // 参数：tag标签；props标签属性，可为空；children子节点，也可能是文本标签。
    // 注意：元素的childrenNodes与text互斥，即文本标签不可能存在子节点
    $createElement(tag, props, children) {
        return { tag, props, children }
    }

    // 根据判断更新节点信息
    _update(vnode) {
        // 获取上一次的vnode树
        const prevVnode = this._vnode

        // 若旧的节点树不存在, 则初始化, 否则更新
        if(!prevVnode) {
            // 初始化
            this.__patch__(this.$el, vnode)
        } else {
            // 更新
            this.__patch__(prevVnode, vnode)
        }
    }

    __patch__(oldVnode, vnode) {
        // 判断oldVnode是否为真实dom
        // 是则将vnode转化为真实dom添加根节点
        // 否则遍历判断新老两棵树, 做对应操作
        if(oldVnode.nodeType) {
            // uoqu根元素父节点, 即body
            const parent = oldVnode.parentNode
            // 获取元素的下一个节点
            const refElm = oldVnode.nextSibling
            // 递归创建子节点
            const el = this.createElm(vnode)
            // 在body下, 根节点旁插入el
            parent.insertBefore(el, refElm)
            // 删除之前的根节点
            parent.removeChild(oldVnode)
            // 保存vnod, 用于下次更新判断
            this._vnode = vnode
        } else { // 更新操作
            // 获取vnode对应的真实dom，用于做真实dom操作
            const el = vnode.el = oldVnode.el
            // 判断是否为同一个元素
            if(oldVnode.tag === vnode.tag) {
                // props属性更新
                this.propsOps(el, oldVnode, vnode)

                // children更新
                // 获取新老节点的children
                const oldCh = oldVnode.children
                const newCh = vnode.children
                // 若新节点为文本
                if(typeof newCh === 'string') {
                    // 若老节点也为文本
                    if(typeof oldCh === 'string') {
                        // 若新老节点文本内容不一致，则文本内容替换为新文本内容
                        if(newCh !== oldCh) {
                            el.textContent = newCh
                        }
                    } else { // 若老节点有子节点，则情况后设置文本内容
                        el.textContent = newCh
                    }
                } else { // 若新节点有子节点
                    // 若老节点无子节点，为文本，则清空文本后创建并新增子节点
                    if(typeof oldCh === 'string') {
                        el.textContent = ''
                        newCh.forEach(children => this.createElm(children))
                    } else { // 若老节点也有子节点，则检查更新
                        this.updateChildren(el, oldCh, newCh)
                    }
                }
            }
        }
    }

    // 创建节点元素
    createElm(vnode) {
        // 创建一个真实dom
        const el = document.createElement(vnode.tag)

        // 若存在props属性，则处理
        if(vnode.props) {
            // 遍历设置元素attribute属性
            for (const key in vnode.props) {
                el.setAttribute(key, vnode.props[key])
            }
        }

        // 若存在chilren，则处理
        if(vnode.children) {
            // 判断children类型
            if(typeof vnode.children === 'string') {
                // 该节点为文本
                el.textContent = vnode.children
            } else {
                // 该节点有子节点
                // 递归遍历创建子节点，追加到元素下
                vnode.children.forEach(v => {
                    const child = this.createElm(v)
                    el.appendChild(child)
                })
            }
        }

        // 保存真实dom，用于diff算法做真实dom操作
        vnode.el = el

        return el
    }

    // 节点的props属性操作方法
    propsOps(el, oldVnode, newVnode) {
        // 获取新老节点的属性列表
        const oldProps = oldVnode.props || {}
        const newProps = newVnode.props || {}
        // 遍历新属性列表
        for (const key in newProps) {
            // 若老节点中不存在新节点的属性，则删除该属性
            if (!(key in oldProps)) {
                el.removeAttribute(key)
            } else {
                // 否则更新属性内容
                const oldValue = oldProps[key]
                const newValue = newProps[key]
                if(oldValue !== newValue) {
                    el.setAttribute(key, newValue)
                }
            }
        }
    }

    // 更新子节点
    updateChildren(parentElm, oldCh, newCh) {
        // 获取新老子节点树的最小长度
        const len = Math.min(oldCh.length, newCh.length)

        // 根据最小长度len遍历做节点更新
        for (let i = 0; i < len; i++) {
            this.__patch__(oldCh[i], newCh[i])
        }

        // 判断新老节点树的长度，做新增或删除操作
        // 若老节点树长度大于新新节点树长度，则删除多余节点，反之则新增节点
        if(oldCh.length > newCh.length) {
            oldCh.slice(len).forEach(child => {
                const el = this.createElm(child)
                parentElm.removeChild(this.createElm(child))
            })
        } else if(newCh.length > oldCh.length) {
            newCh.slice(len).forEach(child => {
                const el = this.createElm(child)
                parentElm.appendChild(el)
            })
        }
    }
}

class Compile {
    constructor(el, vm) {
        this.$vm = vm;

        // 便利
        this.$el = document.querySelector(el)
        this.compile(this.$el)
    }

    compile(el) {
        // 遍历node
        el.childNodes.forEach(node => {
            //1. 元素
            if(node.nodeType === 1) {
                this.compileElement(node)
                if(node.childNodes.length > 0) {
                    this.compile(node)
                }
            } else if(this.isInter(node)) {
                // 2.插值绑定文本{{}}
                this.compileText(node)
            }
        })
    }

    isInter(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    isDir(attrName) {
        return attrName.startsWith('k-')
    }

    isEvent(attrName) {
        return attrName.indexOf('@') > -1
    }

    // update: 给传入的node做初始化并创建watcher负责其更新
    update(node, exp, dir) {
        // 1. 初始化
        const fn = this[dir + 'Updater'];

        fn & fn(node, this.$vm[exp])

        // 更新 创建watcher实例
        new Watcher(this.$vm, exp, function (val) {
            fn && fn(node, val)
        })
    }

    // 插值文本编译
    compileText(node) {
        this.update(node, RegExp.$1, 'text')   
    }

    textUpdater(node, val) {
        node.textContent = val
    }

    // 编译元素
    compileElement(node) {
        const nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
            const attrName = attr.nodeName
            const exp = attr.value
            if(this.isDir(attrName)) {
                // 指令
                // 获取指令执行函数并调用
                const dir = attrName.substring(2)
                this[dir] && this[dir](node, exp)
            }

            if(this.isEvent(attrName)) {
                this.eventHandle(node, attrName.substring(1), exp)
            }
        })
    }

    // k-test
    text(node, exp) {
        this.update(node, exp, 'text')   
    }

    // k-html
    html(node, exp) {
        this.update(node, exp, 'html')
    }

    htmlUpdater(node, val) {
        node.innerHTML = val
    }

    // 对@xxx事件的处理
    eventHandle(node, eventName, methodName) {
        node.addEventListener(eventName, () => {
            this.$vm.$methods[methodName].call(this.$vm)
        })
    }

    // k-model的处理 不仅仅当赋值的时候回触发watcher，并且为input添加事件
    // input中的值去修改this.$data.$xxx的值，实现双向绑定
    model(node, exp) {
        this.update(node, exp, 'model')
        node.addEventListener('input', (e) => {
            this.$vm[exp] = e.target.value
        })
    }

    modelUpdater(node, val) {
        node.value = val
    }
    
}

// 监听器: 负责页面中的一个依赖的更新
class Watcher {
    constructor(vm, fn) {
        this.vm = vm
        this.getter = fn
        
        // 触发依赖收集和执行渲染函数
        this.get()
    }

    // 触发依赖收集和执行渲染函数
    get() {
        // 触发依赖收集
        Dep.target = this
        // 执行渲染函数
        this.getter.call(this.vm)
        Dep.target = null
    }

    update() {
        this.get()
    }
} 

class Dep {
    constructor() {
        this.deps = new Set()
    }

    addDep(watcher) {
        this.deps.add(watcher)
    }

    notify() {
        this.deps.forEach(watcher => watcher.update())
    }
}
