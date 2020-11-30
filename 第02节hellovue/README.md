#### Vue预习课
---

#### 核心知识01--Hello World
---
#### 引入vue
#### vue的安装 [https://cn.vuejs.org/v2/guide/installation.html)

##### Hello World
创建我们的第一个Vue程序
```javascript
<div id="app">{{title}}</div>

<script src="vue.js"></script>
<script>
    const app = new Vue({
        el:'#app',
        data: {
            title: 'hello,vue'
        }
    })

    setTimeout(() => {
        app.title = 'mua~,vue'
    }, 1000);
</script>
```

##### 理解Vue的设计思想
- 数据驱动应用
- MVVM模式的践行者

##### MVVM框架的三要素： 响应式，模板引擎机器渲染
- 响应式：vue如何监听数据变化
- 模板： vue的模板如何编写和解析
- 渲染： vue如何将模板转换为html