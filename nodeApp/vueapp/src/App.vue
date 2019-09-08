<template>
  <div id="app">

      <router-view/>

  </div>
</template>
<script>
// import jwt from 'jwt-decode'
// import { routermap } from './router'
export default {
  name: 'app',
  created () {
    if (localStorage.getItem('token')) {
      // var token = localStorage.getItem('token')
      // this.$store.dispatch('jToken', jwt(token))
      // var te = jwt(token).identity
      // this.$store.commit('setTess', te)
      // this.$store.commit('setromap', routermap)
      // this.$router.addRoutes(this.$store.state.router.concat([{ // 这里调用addRoutes方法，动态添加符合条件的路由
      //   path: '*',
      //   redirect: '/404' // 所有不匹配路径(*)都重定向到404，为什么写在这里而不放到静态路由表里可以查看“前端路上”的文章
      // }]))
    }
  }
}
</script>

<style>
#app{
  width: 100%;
  height: 100%;
}
</style>
