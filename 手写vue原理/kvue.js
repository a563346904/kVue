/*
 * @Author: your name
 * @Date: 2020-12-03 09:31:25
 * @LastEditTime: 2020-12-03 17:02:34
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
            console.log('getkey', val)
            // 判断一下Dep.target是否存在,若存在则收集依赖
            Dep.target && dep.addDep(Dep.target)
            return val;
        },
        set(v) {
            if(v != val) {
                console.log('setkey', v)
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
        console.log('obj', obj)
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

        // 2. 编译
        new Compile(options.el, this)
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
                console.log('编译文本', node.textContent)
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

        console.log('------', fn)
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
    constructor(vm, key, updateFn) {
        this.vm = vm
        this.key = key
        this.updateFn = updateFn

        // 获取一下key的值触发他的get方法，在那创建当前watcher实例和dep之间关系
        Dep.target = this
        this.vm[this.key]
        Dep.target = null
    }

    update() {
        this.updateFn.call(this.vm, this.vm[this.key])
    }
} 

class Dep {
    constructor() {
        this.deps = []
    }

    addDep(dep) {
        this.deps.push(dep)
    }

    notify() {
        this.deps.forEach(dep => dep.update())
    }
}
