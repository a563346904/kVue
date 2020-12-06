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
