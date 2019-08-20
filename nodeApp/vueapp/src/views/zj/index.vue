<template>
  <div class="zj" >
    <div class="zlist">
      <el-table :data="inData" style="width: 100%"  v-loading="loading">
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
  </div>
</template>

<script>
import { getinformation,deleteinformation ,getGeReninformation} from "../../api/information";
export default {
  name: "zj",
  data() {
    return {
      inData: [],
      loading : "ture"
    };
  },
  methods: {
    handleEdit(id) {
      // console.log(index, row);
      getGeReninformation(id)
      .then(res=>{
        console.log(res)
      })
    },
    handleDelete(id) {
      // console.log(id)
      this.loading = true
     deleteinformation({id})
     .then(res=>{
       this.loading = false;
     })
    },
    getinformation() {
      getinformation().then(res => {
        this.inData = res.data.data || [];
        this.loading = false
      }).catch(err=>{
        this.loading = false;
        this.$message({ message:err.message,
              type:'error'})
      })
    }
  },
  created() {
    this.getinformation();
  }
};
</script>

<style>
.zj {
  width: 100%;
  height: 100%;
  /* background: red */
}
</style>