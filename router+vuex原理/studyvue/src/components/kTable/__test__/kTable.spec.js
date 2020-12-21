/*
 * @Author: your name
 * @Date: 2020-12-17 10:47:35
 * @LastEditTime: 2020-12-17 11:10:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \kVue\router+vuex原理\studyvue\src\components\kTable\__test__\kTable.spec.js
 */
import kTable from '../kTable.vue'
import { mount } from '@vue/test-utils'

describe('kTable.vue', () => {
    describe('表格是否成功渲染出元素', () => {
      it('渲染表格', () => {
        const wrapper = mount(kTable, {
          props: {
            data: [
                {
                  date: "2016-05-02",
                  name: "王小虎",
                  address: "上海市普陀区金沙江路 1518 弄"
                }
            ]
          }
        })
        console.log('-----------------', wrapper)
        expect(wrapper.find('th').exists()).toBe(true)
        expect(wrapper.find('td').exists()).toBe(true)
      })
    })
  })