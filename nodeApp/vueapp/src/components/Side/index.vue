<template>
  <div class="Side">
    <el-row class="menu">
      <el-col :span="24" class="menu">
        <el-menu

          class="el-menu-vertical-demo menu"

          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <router-link tag="div" :to="it.path" v-for="(it,i) in meun" :key='i'>
            <el-menu-item >
              <i class="el-icon-menu"></i>
              <!-- <router-link tag='span' slot="title">导航一</router-link> -->
              <span slot="title">{{it.meta.title}}</span>
            </el-menu-item>
          </router-link>

        </el-menu>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'Sider',
  data () {
    return {
      meun: ''
    }
  },
  created () {
    this.meun = this.$store.state.meun
  }
}
</script>

<style>
.Side {
  display: inline-block;
  width: 160px;
  /* width: 100%; */
  height: 100%;
}
.router-link-active span{color: #f42;}
.menu {
  height: 100%;
}
</style>
