<template>
  <div class="register">
    <div class="card">
      <div class="cardHead">
        <img src="../../assets/img/logo.png" alt />
        <span>注册</span>
      </div>
      <el-form
        :model="registerFrom"
        status-icon
        :rules="rules"
        ref="registerFrom"
        label-width="100px"
        class="demo-registerFrom"
      >
        <el-form-item label="email/邮箱" prop="email">
          <el-input v-model="registerFrom.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerFrom.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerFrom.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="registerFrom.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="identity">
          <el-select v-model="registerFrom.identity" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerFrom')">提交</el-button>
          <el-button @click="resetForm('registerFrom')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { register } from "../../api/user";

export default {
  name: "register",
  data() {
    var validateEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (mailReg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的邮箱格式"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerFrom.checkPass !== "") {
          this.$refs.registerFrom.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerFrom.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateIdentity = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择身份"));
      } else {
        callback();
      }
    };
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    return {
      registerFrom: {
        email: "",
        name: "",
        password: "",
        checkPass: "",
        identity: ""
      },
      options: [
        {
          value: "admin"
        },
        {
          value: "user"
        }
      ],
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        pass: [
          { validator: validatePass, trigger: "blur" },
          { min: 6, max: 25, message: "长度在 6 到 25 个字符" }
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        identity: [{ validator: validateIdentity, trigger: "blur" }],
        name: [{ validator: validateName, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // register(this.registerFrom).then(res=>{
          //   console.log(res)
          // })
          // .catch(err=>{
          //   console.log(err)
          // })
          // console.log(this.registerFrom)
         
          this.axios.post('/api/register',this.registerFrom)
          .then(res=>{
            console.log(res)
          }).catch(err=>{
            // alert('ll',err)
            alert(err)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
.register {
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