<!--
 * @Author: your name
 * @Date: 2020-12-09 15:39:42
 * @LastEditTime: 2020-12-09 15:59:32
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \kVue\vue源码分析02\README.md
-->
#### 目标
- 理解vue批量异步更新策略
- 掌握虚拟DOM和Diff算法

##### 概念
- 事件循环Event Loop: 浏览器为了协调事件处理,执行脚本,网络请求和渲染等任务而制定的工作机制
- 宏任务Task: 代表一个个离散的,独立的工作单元.**浏览器完成一个宏任务,再下一个宏任务执行开始前,会对页面进行重新渲染.**主要包括创建文档对象,解析HTML，执行主线js代码以及各种事件如页面加载，输入，网络事件和定时器等。
- 微任务:微任务是更小的任务,是当宏任务执行结束后立即执行的任务。**如果存在微任务,浏览器会清空微任务之后再重新渲染。**微任务的例子有Promise回调函数,dom变化等
- [体验一下](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/?utm_source=html5weekly)


##### vue中的具体实现
**nextTick(flushSchedulerQueue)**
- 异步: 只有侦听到数据变化,Vue将开启一个队列,并缓冲在同一事件循环中发生的所有数据变更。
- 批量: 如果同一个watcher被多次触发,只会被推入到队列中一次.去重对于避免不必要的计算和DOM操作是非常重要的.然后,在下一个的事件循环"tick"中, Vue刷新队列执行实际工作
- 异步策略: vue在内部对异步队列尝试使用原生的`Promise.then`, `MutationObserver`或setImmediate, 如果执行环境都不支持, 则会采用`setTimeout`

##### update() core\observer\watcher.js
dep.notify()之后watcher执行更新，执行入队操作

##### queueWatcher(watcher) core\observer\scheduler.js
执行watcher入队操作

##### nextTick(flushSchedulerQueue) core\util\next-tick.js
nextTick按照特定异步策略执行队列操作

**watcher中update执行三次，但run仅执行一次，且数值变化对dom的影响也不是立竿见影的。**

> 相关API： vm.$nextTick(cb)