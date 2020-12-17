/*
 * @Author: your name
 * @Date: 2020-12-17 09:36:22
 * @LastEditTime: 2020-12-17 16:15:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \kVue\router+vuex原理\studyvue\tests\unit\example.spec.js
 */
import Vue from 'vue'
import { shallowMount, mount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'
// import KTable from '@/components/kTable/'
import KTable from '@/components/kTable/kTable.vue'
import KTableBody from '@/components/kTable/kTableBody.vue'
import KTableColumn from '@/components/kTable/kTableColumn.vue'
import KTableHeader from '@/components/kTable/kTableHeader.vue'

Vue.component('KTable', KTable)
Vue.component('KTableBody', KTableBody)
Vue.component('KTableColumn', KTableColumn)
Vue.component('KTableHeader', KTableHeader)

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })

describe('kTable.vue', () => {
  describe('表格是否成功渲染出元素', () => {
    const wrapper = mount({
      template: `
        <k-table :data="data">
          <k-table-column prop="date" label="日期" width="180" sortable></k-table-column>
          <k-table-column prop="name" label="姓名" width="180"></k-table-column>
          <k-table-column prop="address" label="地址"></k-table-column>
          <k-table-column prop="address" label="操作">
            <button>add</button>
          </k-table-column>
        </k-table>
      `,
      data() {
        return {
          data: [
            {
              date: "2016-05-02",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1518 弄"
            }
          ]
        }
      }
    })  
    
    it('渲染表格', () => {
                     
      expect(wrapper.find('tr').exists()).toBe(true);
      expect(wrapper.find('th').exists()).toBe(true);
      expect(wrapper.find('td').exists()).toBe(true);
    })

    it('自定义渲染列', () => {
      const btn = wrapper.find('button');          
      expect(btn.exists()).toBe(true);
      expect(btn.text()).toBe('add');
    })

    it('自定义排序是否有显示', () => {
      const sortIcon = wrapper.find('.sortIcon');          
      expect(sortIcon.exists()).toBe(true);
    })
  })
})

// function add(num1, num2) {
//   return num1 + num2;
// }

// describe('add方法', () => {
//   it('应该能正确计算加法', () => {
//     expect(add(1, 3)).toBe(4)
//     expect(add(-1, 3)).toBe(2)
//     expect(add(1, 4)).toBe(5)
//   })
// })