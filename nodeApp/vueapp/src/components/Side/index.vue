<template>
  <div class="Side ">
    <el-row class="menu">
      <el-col :span="24" class="menu">
 
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo menu"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      >
       <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <!-- <router-link tag='span' slot="title">导航一</router-link> -->
        <span slot="title"> <router-link  to='/zj' >导航一</router-link> </span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
                <span slot="title"> <router-link  to='/zj' >导航一3</router-link> </span>
      </el-menu-item>
      <el-menu-item index="3" >
        <i class="el-icon-document"></i>
               <span slot="title"> <router-link  to='/zj' >导航一2</router-link> </span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
               <span slot="title"> <router-link  to='/zj' >导航一</router-link> </span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
  </div>
</template>

<script>
export default {
 name:'Side '
}
</script>

<style>
.Side{
  display: inline-block;
  width: 160px;
  /* width: 100%; */
  height: 100%;
}
.menu{
  height: 100%;
}
</style>