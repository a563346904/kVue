<!--
 * @Author: your name
 * @Date: 2020-12-24 18:48:16
 * @LastEditTime: 2020-12-28 14:11:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \kVue\手写vue3源码03\README.MD
-->
#### 编译器原理
---
template => ast => render

运行app之前 
compile => render()

init() => 数据响应式+依赖收集 => componentEffect()
mount => render() => vnode => patch(null, n2) =>dom 

Update
componentEffect() => render() => vnode => patch(n1, n2) => dom

编译器执行时刻
- webpack环境: vue-loader能够将.vue我呢见提前转换,过程中会将template预编译,所以运行是在项目打包时;这种情况运行时不需要编译器, vue.runtime.js,字符串模板不允许,即template选项

- vue.global: 携带编译器, 他会在程序运行时提前编译组件模板,允许出现字符串模板

ast => render()
vnode => dom


#### 步骤有三
1. baseParse()


2. transform()转换,ast深加工
- 把表达式解析成需要做的事


3. 生成generate()
- script string => new Function()


#### 编译器优化策略
1. 静态节点提升
静态不变的部分就把他声明成常量,放在渲染函数外部,渲染函数执行的时候直接使用
2. 补丁标记和动态属性标记

3. 缓存事件处理

4. 块block


#### vue3异步策略
set => trigger => run => queueJob => queueFlush => flushJobs => callWithErrorHandling => reactive => componentEffect

#### vDom
    - children 既可以是数组也可以是文本
    - dynamicChildren 记录动态子节点和属性比对时有效减少遍历操作
    - patchFlag patchFlag 标注动态内容类型使得patch过程更快
    - shapeFlag shapeFlag标记组件形态,比如是否是组件或者teleport
    - type 表明节点类型