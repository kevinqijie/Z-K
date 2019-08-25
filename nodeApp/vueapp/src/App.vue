<template>
  <div id="app">

      <router-view/>

  </div>
</template>
<script>
import jwt from 'jwt-decode'
export default {
  name: 'app',
  created () {
    var token = localStorage.getItem('token')
    this.$store.dispatch('jToken', jwt(token))
  }
}
</script>

<style>
#app{
  width: 100%;
  height: 100%;
}
</style>
