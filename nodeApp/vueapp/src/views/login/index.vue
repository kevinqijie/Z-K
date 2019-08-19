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
import {login} from '../../api/user'
export default {
  name: "login",
  data() {
    var validateEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    return {
      loginFrom: {
        email: "",
        password: ""
      },

      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.loginFrom)
          // login(this.loginFrom).then(res=>{

          //   console.log(res)
          // })
          // .catch(err=>{
          //   console.log(err)
          // })
          // console.log(this.loginFrom)

          this.axios
            .post("/api/login", this.loginFrom)
            .then(res => {
              localStorage.setItem('token',res.data.token);
              this.$router.push({'path':'/home'})
            })
            .catch(err => {
              // alert('ll',err)
              alert(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toRegister() {
      console.log(1)
      this.$router.push({'path':'/register'})
    }
  }
};
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