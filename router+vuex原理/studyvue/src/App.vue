<!--
 * @Author: your name
 * @Date: 2020-12-01 15:48:35
 * @LastEditTime: 2020-12-02 14:56:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \kVue\router+vuex原理\studyvue\src\App.vue
-->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <p @click="$store.commit('add')">{{$store.state.counter}}</p>
      <p @click="$store.dispatch('add')">async: {{$store.state.counter}}</p>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(this.$store)
    // setInterval(() => {
    //   this.$store.state.counter++
    // }, 1000);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
