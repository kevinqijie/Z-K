<template>
  <div class="home">
    <Headers />
    
    <div class="main">
      <Side />
      <router-view></router-view>
    </div>
 
  </div>
</template>

<script>
// import jwt from 'jwt-decode'
import Headers from "@/components/header";
import Side from '@/components/Side'
export default {
  name: "home",
  components: {
    Headers,
    Side
  },
 data () {
   return {
     token:''
   }
 },
  methods: {
    //  jtoken(){
    //   var token = this.$store.state.token
    //   // console.log(token)
    //   //  console.log(1)
    //   window.location.href = token.avatar
    //  }
  }
};
</script>

<style>
.home{width: 100%;height: 100%;}
.main{display: flex;height: calc(100% - 91px);}
</style>