<!--
 * @Author: your name
 * @Date: 2020-12-01 09:12:16
 * @LastEditTime: 2020-12-01 13:30:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \kVue\router+vuex原理\vue-study-web25\src\App.vue
-->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <p @click="$store.commit('add')">{{$store.state.counter}}</p>
    <p @click="$store.dispatch('add')">async: {{$store.state.counter}}</p>
    <p>getters: {{$store.getters.computCount}}</p>
    <p>methodsFn: {{counter4()}}</p>
    <router-view/>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log('页面', this.$store.getters);
  },
  methods: {
    counter4() {
      return 4 * this.$store.state.counter;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
