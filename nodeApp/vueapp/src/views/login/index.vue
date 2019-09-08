<template>
  <div class="login">
    <div class="card">
      <div class="cardHead">
        <img src="../../assets/img/logo.png" alt />
        <span>登陆</span>
      </div>
      <el-form
        :model="loginFrom"
        status-icon
        :rules="rules"
        ref="loginFrom"
        label-width="100px"
        class="demo-loginFrom"
      >
        <el-form-item label="email/邮箱" prop="email">
          <el-input v-model="loginFrom.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginFrom.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginFrom')">登陆</el-button>
          <el-button @click="toRegister()">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import jwt from 'jwt-decode'
import { login } from '../../api/user'
import { routermap } from '../../router'
export default {
  name: 'login',
  data () {
    var validateEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }

    return {
      loginFrom: {
        email: '',
        password: ''
      },

      rules: {
        email: [{ validator: validateEmail, trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          login(this.loginFrom)
            .then(res => {
              // console.log(res)
              localStorage.setItem('token', res.data.token)
              this.$message({ message: '登陆成功', type: 'success' })
              // this.$store.dispatch('jToken', jwt(res.data.token))
              // var te = jwt(res.data.token).identity
              // this.$store.commit('setTess', te)
              // // console.log('c', routermap)
              // this.$store.commit('setromap', routermap)
              // this.$router.addRoutes(this.$store.state.router.concat([{ // 这里调用addRoutes方法，动态添加符合条件的路由
              //   path: '*',
              //   redirect: '/404' // 所有不匹配路径(*)都重定向到404，为什么写在这里而不放到静态路由表里可以查看“前端路上”的文章
              // }]))

              this.$router.push({ 'path': '/home' })
            })
            .catch(err => {
              this.$message({ message: err.message, type: 'error' })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    toRegister () {
      // console.log(1)
      this.$router.push({ 'path': '/register' })
    }
  }
}
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/bg.jpg") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  width: 500px;
  /* height:600px ; */
  background: #fff;
  padding: 30px;
  border-radius: 10px;
}
.cardHead {
  height: 50px;
  line-height: 50px;
  font-size: 30px;
  font-weight: bold;
  color: blue;
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}
.cardHead img {
  height: 50px;
  float: left;
}
.cardHead span {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
