/*
 * @Author: your name
 * @Date: 2020-12-17 09:59:47
 * @LastEditTime: 2020-12-17 10:14:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \kVue\router+vuex原理\studyvue\src\components\kTable\index.js
 */
import Vue from 'vue'
import KTable from './kTable'
import KTableBody from './kTableBody'
import KTableColumn from './kTableColumn'
import KTableHeader from './kTableHeader'

import './index.css';

Vue.component('KTable', KTable)
Vue.component('KTableBody', KTableBody)
Vue.component('KTableColumn', KTableColumn)
Vue.component('KTableHeader', KTableHeader)