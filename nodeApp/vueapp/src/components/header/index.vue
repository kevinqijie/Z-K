<template>
  <div class="head">
    <img src="../../assets/img/logo.png" alt />
    <div class="userbox">
      <img :src="token.avatar" alt />
      <div class="userlist">
        <div class="wecome">欢迎您！</div>
        <span class="name">{{token.name}}</span>
        <el-dropdown @command="handleCommand" class="sp">
          <span class="el-dropdown-link ">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">个人中心</el-dropdown-item>
            <el-dropdown-item command="b">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Head',
  data () {
    return {
      token: ''
    }
  },
  methods: {
    handleCommand (command) {
      // this.$message('click on item ' + command)
      switch (command) {
        case 'a':
          // alert('a')
          this.$router.push({ 'path': '/home/personal' })
          break
        case 'b':
          localStorage.removeItem('token')
          // console.log('qin t')
          // this.$store.dispatch('jToken', [])
          // // console.log('qin m')
          // this.$store.dispatch('jmeun', [])
          // // console.log('qin e')
          // this.$store.dispatch('jTess', null)
          // this.$store.dispatch('jrouter', null)
          // // this.$store.dispatch('jmeun', '')
          this.$store.dispatch('jlogin')
          this.$router.push({ 'path': '/login' })
          window.location.reload()
          break
      }
    }
  },
  created () {
    this.token = this.$store.state.token
  }
}
</script>

<style scoped>
.head {
  width: 100%;
  /* height: 70px; */
  padding: 10px 20px;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d9d9d9
}
.userbox {
  display: flex;
  align-items: center
}
.userbox img {
  width: 70px;
  height: 70px;
  border-radius: 100%;
}
.userlist{
  padding: 0 20px;
  position: relative;

}
.sp{
  /* margin:5px;
   */

 position:absolute;
 right: 0;
 bottom: 0;
}
.userlist .wecome{
  color: #f42
}
.userlist .name{display: inline-block; height: 20;line-height: 20px}
</style>
