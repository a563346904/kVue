#### 源码分析

##### 术语解释
- runtime: 仅包含运行时，不包含编译器
    - 缺点:
        - 不包含编译器 不可以使用字符串模板
- common: cjs规范,用于webpack1
    - 用于webpack1
    - nodejs环境
- esm： es模块, 用于webpack2+
- umd： universal module definition, 兼容cjs和amd, 用于浏览器


每个版本不一样，打包时运行环境不一样

init.html
```javascript
// 优先级 render > template > el
const app = new Vue({
    el: "#app",
    // template: '<div></div>'
    // render(h){return h('div', 'render')}
    data: {foo: 'foo'}
})
```

##### entry-runtime-width-compiler.js
- 扩展$mount： 处理el或者template，编译为render
- render 首选
- template是次选
- 最后使用el

template是需要编译为render函数
执行编译过程把用户传进来的模板或者el转换成

##### runtime/index.js
- 安装平台特有patch函数（安装patch）
- 定义了mount（声明$mount:mountComponent）

##### core/index.js
- 初始化全局API(initGlobal)： /nextTick/use/filter/directive/component/mixin/set/delete/util

##### instance/index.js
- 构造函数的声明


##### new Vue 主要做了什么事
1. 选项的合并
2. 声明各种属性及事件监听以及和这个组件相关的插槽的初始化
3. 调用beforeCreate
4. 初始化组件所有相关的state（inject， props， methods, data）
5. created 


```javascript
initMixin(Vue) // _init() 大部分是实例属性
stateMixin(Vue) // $set
eventsMixin(Vue) // $on/$emit/...
lifecycleMixin(Vue) // _update()
renderMixin(Vue) // _render()/nextTick
```

##### 数据响应式
数据响应式是MVVM框架的一大特点，通过某种策略可以感知数据的变化。Vue中利用了JS语言特性[Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty),通过定义对象属性getter/setter拦截对属性的访问。具体实现是在Vue初始化时，会调用initState，它会初始化data，props等，这里着重关注data初始化

##### 整体流程
**initState (vm: Component) src\core\instance\state.js**
初始化数据，包括props、methods、data、computed和watch

##### initData核心代码是将data数据响应化
```javascript
function initData (vm: Component) {
    // 执行数据响应化
    observe(data, true /* asRootData */)
}
```

##### core/observer/index.js
observe方法返回一个Observer实例  

##### core/observer/index.js
Observer对象根据数据类型执行对应的响应化操作,defineReactive定义对象属性的getter/setter，getter负责添加依赖，setter负责通知更新

##### core/observer/dep.js
Dep负责管理一组Watcher，包括watcher实例的增删及通知更新

##### Watcher
Watcher解析一个表达式并收集依赖，当数值变化时触发回调函数，常用于$watch API和指令中。每个组件也会有对应的Watcher，数值变化会触发其update函数导致重新渲染
```javascript
export default class Watcher {
    constructor () {}
    get () {}
    addDep (dep: Dep) {}
    update () {}
}
```

##### 数组响应化
数组数据变化的侦测跟对象不同，我们操作数组通常使用push、pop、splice等方法，此时没有办法得
知数据变化。所以vue中采取的策略是拦截这些方法并通知dep。

##### src\core\observer\array.js
```javascript
if (Array.isArray(value)) {
    // 替换数组原型
    protoAugment(value, arrayMethods) // value.__proto__ = arrayMethods
    this.observeArray(value)
}
```
