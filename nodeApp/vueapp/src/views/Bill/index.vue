<template>
  <div class="zj">
    <div class="zlist">
      <el-table :data="inData" style="width: 100%" v-loading="loading">
        <el-table-column label="日期" width="180" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>

            <span>{{scope.row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品" width="180" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.product}}</span>
          </template>
        </el-table-column>
        <el-table-column label="支出" width="180" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.expend}}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述" width="180" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.describe}}</span>
          </template>
        </el-table-column>
        <el-table-column label="余额" width="180" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.balance}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row._id)">详情</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="mack" v-if="mack">
      <el-card class="box-card" v-loading="loading2">
        <h1>详情</h1>
        <div class="list">
          <ul>
            <li>
              <span>消费时间:</span>
              <div>{{detailsData.date}}</div>
            </li>
            <li>
              <span>消费产品:</span>
              <div>{{detailsData.product}}</div>
            </li>
            <li>
              <span>产品描述：</span>
              <div class="miaoshu">{{detailsData.describe}}</div>
            </li>
            <li>
              <span>消费金额：</span>
              <div>{{detailsData.expend}}</div>
            </li>
            <li>
              <span>所剩余额：</span>
              <div>{{detailsData.balance}}</div>
            </li>
          </ul>
        </div>
        <el-button class="close" type="danger" @click="closeMack">关闭</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import {
  getinformation,
  deleteinformation,
  getGeReninformation
} from '../../api/information'
export default {
  name: 'bill',
  data () {
    return {
      inData: [],
      loading: true,
      loading2: false,
      mack: false,
      detailsData: []
    }
  },
  methods: {
    closeMack () {
      this.mack = false
    },
    handleEdit (id) {
      // console.log(index, row);
      this.mack = true
      this.loading2 = true
      getGeReninformation(id).then(res => {
        // console.log(res)
        this.detailsData = res.data.data
        this.detailsData.date = this.changeDate(this.detailsData.date)
        console.log(this.detailsData)
        this.loading2 = false
      })
    },
    handleDelete (id) {
      // console.log(id)
      // this.loading = true
      // deleteinformation({ id }).then(res => {
      //   this.loading = false
      //   this.getinformation()
      // })
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        deleteinformation({ id }).then(res => {
          this.loading = false
          this.getinformation()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getinformation () {
      getinformation()
        .then(res => {
          this.inData = res.data.data
          this.inData.forEach(it => {
            it.date = this.changeDate(it.date)
          })
          this.loading = false
        })
        .catch(err => {
          this.loading = false

          this.inData = []
          this.$message({ message: err.message, type: 'error' })
        })
    },
    changeDate (date) {
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
    this.getinformation()
  }
}
</script>

<style scoped>
.zj {
  width: 100%;
  height: 100%;
  /* background: red */
}
.mack {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(200, 200, 200, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}
.box-card {
  width: 600px;
  height: 500px;
  border-radius: 20px;
  position: relative;
}
.box-card h1 {
  text-align: center;
  color: #409eff;
}
.el-table::before {
  display: none;
}
.list {
  width: 100%;
  padding: 40px 0;
  display: flex;
  justify-content: center;
}
.list ul {
  width: 400px;
}
.list ul li {
  display: flex;
  justify-content: space-between
}
.list ul li span {
  font-size: 20px;
  line-height: 30px;
  height: 30px;
  display: block;
}
.list ul li div {
  width: 280px;
  height: 30px;
  line-height: 30px;
}
.list ul li div.miaoshu {
  height: 80px;
  border: 1px solid #e6e6e6;

  margin-top: 15px;
  border-radius: 10px;
}
.close{
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%)
}
</style>
