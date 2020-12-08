<!--
 * @Author: your name
 * @Date: 2020-12-07 10:36:12
 * @LastEditTime: 2020-12-07 10:40:41
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \kVue\第04计算属性与生命周期\README.md
-->
#### 计算属性和监听器
---
模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板
过重且难以维护，此时就可以考虑计算属性和监听器。  
范例：课程数量统计

```javascript
<p>
    <!-- 绑定表达式 -->
    <!-- 课程总数：{{courses.length + '门'}} -->
    <!-- 计算属性 -->
    <!-- 课程总数：{{total}} -->
    <!-- 监听器 -->
    课程总数：{{totalCount}}
</p>

<script>
    const app = new Vue({
        computed: {
            total() {
                return this.courses.length + '门'
            }
        },
        // 下面这种不能生效，因为初始化时不会触发
        // watch: {
        // courses(newValue, oldValue) {
        // this.totalCount = newValue.length + '门'
        // }
        // },
        watch: {
            courses: {
                immediate: true,
                // deep: true,
                handler(newValue, oldValue) {
                this.totalCount = newValue.length + '门'
            }
            }
        }
    })
</script>
```  

> [计算属性和侦听器](https://cn.vuejs.org/v2/guide/computed.html)
- 监听器更通用，理论上计算属性能实现的侦听器也能实现
- 处理数据的场景不同，监听器适合一个数据影响多个数据，计算属性适合一个数据受多个数
据影响
- 计算属性有缓存性，计算所得的值如果没有变化不会重复执行
- 监听器适合执行异步操作或较大开销操作的情况