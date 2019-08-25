<template>
  <div class="Personal">
<el-card class="box-card">
 <ul>
   <li>
     <span>头像</span> <img :src="current.avatar" alt="">
     <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"

   :show-file-list = "false"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>

</el-upload>
   </li>
    <li>
     <span>用户名</span> <span>{{current.name}}</span>
   </li>
  <li>
     <span>邮箱</span> <span>{{current.email}}</span>
   </li>
    <li>
     <span>身份</span> <span>{{current.identity == 'admin' ? '管理员': '用户'}}</span>
   </li>
    <li>
     <span>余额</span> <span>{{current.Balance}}</span>   <el-button @click="open" size="small" type="primary">充值</el-button>
   </li>
     <li>
     <span>创建日期</span> <span>{{current.date}}</span>
   </li>
 </ul>
</el-card>
  </div>
</template>

<script>
import { getcurrent, postBla } from '../../api/user'
export default {
  name: 'Personal',
  data () {
    return {
      current: ''
    }
  },
  methods: {
    getcurrent () {
      getcurrent()
        .then(res => {
          this.current = res.data.data
          this.current.date = this.ChangeDate(this.current.date)
        })
    },
    open () {
      this.$prompt('请输入充值金额', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        postBla({ 'Balance': value })
          .then(res => {
            this.$message({
              type: 'success',
              message: '充值成功'
            })
            this.getcurrent()
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    ChangeDate (date) {
      var time = date
      var d = new Date(time)

      return (
        d.getFullYear() +
        '-' +
        (d.getMonth() + 1) +
        '-' +
        d.getDate() +
        ' ' +
        d.getHours() +
        ':' +
        d.getMinutes() +
        ':' +
        d.getSeconds()
      )
    }
  },
  created () {
    this.getcurrent()
  }
}
</script>

<style scoped>
 .Personal{
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center
 }
  .box-card {
    width: 600px;
    padding: 40px;
  }
  .box-card ul li {
    display: flex;align-items: center;padding: 10px;
  }
  .box-card ul li span{
    display: block;
    margin-right: 20px;
    font-size: 22px
  }
  .box-card ul li  img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
   .box-card ul li  button{
     margin: 0 30px;
   }
</style>
