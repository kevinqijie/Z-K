<template>
  <div class="Products">
    <el-table :data="inData" style="width: 100%" v-loading="loading">
        <el-table-column label="日期" width="180" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>

            <span>{{scope.row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品" width="180" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="单价" width="180" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述" width="180" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.describe}}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="180" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.Quantity}}</span>
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
</template>

<script>
import { getpro } from '../../api/pro'

export default {
  name: 'Products',
  data () {
    return {
      inData: [],
      loading: true
    }
  },
  methods: {
    getpor () {
      getpro().then(res => {
        this.inData = res.data.data

        this.loading = false
        this.inData.forEach(it => {
          it.date = this.ChangeDate(it.date)
        })
        console.log(this.inData)
      }).catch(err => {
        console.log(err)
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
    this.getpor()
  }
}
</script>

<style scoped>
.Products{
  width: 100%;
  height: 100%;
}
</style>
