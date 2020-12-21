<!--
 * @Author: your name
 * @Date: 2020-12-01 15:56:28
 * @LastEditTime: 2020-12-17 11:10:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \kVue\router+vuex原理\studyvue\src\views\Home.vue
-->
<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <k-table :data="tableData">
      <k-table-column prop="date" label="日期" width="180" sortable></k-table-column>
      <k-table-column prop="name" label="姓名" width="180"></k-table-column>
      <k-table-column prop="address" label="地址"></k-table-column>
      <k-table-column prop="address" label="操作">
        <button @click="handleClick">add</button>
      </k-table-column>
    </k-table>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    handleClick() {
      console.log("点击");
    }
  }
  // components: {
  //   HelloWorld
  // }
};
</script>
