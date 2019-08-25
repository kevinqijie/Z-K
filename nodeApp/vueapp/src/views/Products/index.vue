<template>
  <div class="Products">
    <div class="addbox" v-if="this.identity == 'admin' ? true : false">
      <el-button class="add" type="primary" @click="handleEdit('3',)">添加</el-button>
    </div>
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
      <el-table-column label="操作" align="center" v-if="this.identity == 'admin' ? true : false">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit('2',scope.row._id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" v-if="this.identity == 'user' ? true : false">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit('1',scope.row._id)">详情</el-button>
          <el-button size="mini" type="danger" @click="handleBuy(scope.row._id)">购买</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 详情产品弹框 -->
    <div class="mack" v-if="mack1">
      <el-card class="box-card" v-loading="loading1">
        <h1>详情</h1>
        <div class="list">
          <ul>
            <li>
              <span>产品名：</span>
              <div>{{prodetailsData.name}}</div>
            </li>
            <li>
              <span>上架时间：</span>
              <div>{{prodetailsData.date}}</div>
            </li>
            <li>
              <span>产品描述：</span>
              <div class="miaoshu">{{prodetailsData.describe}}</div>
            </li>
            <li>
              <span>单价：</span>
              <div>{{prodetailsData.price}}</div>
            </li>
            <li>
              <span>所剩数量：</span>
              <div>{{prodetailsData.Quantity}}</div>
            </li>
          </ul>
        </div>
        <div class="btnbox">
          <el-button class="close" type="danger" @click="closeMack(1)">关闭</el-button>
        </div>
      </el-card>
    </div>
 <!-- 编辑产品弹框 -->

    <div class="mack" v-if="mack2">
      <el-card class="box-card" v-loading="loading1">
        <h1>编辑</h1>
        <div class="list">
          <ul>
            <li>
              <span>产品名：</span>
              <input type="text" :placeholder="prodetailsData.name" v-model="prodetailsData.name" />
            </li>

            <li>
              <span>产品描述：</span>
              <textarea
                class="miaoshu"
                name
                id
                cols="30"
                rows="10"
                v-model="prodetailsData.describe"
                :placeholder="prodetailsData.describe"
              ></textarea>
            </li>
            <li>
              <span>单价（元）：</span>
              <input type="text" :placeholder="prodetailsData.price" v-model="prodetailsData.price" />
            </li>
            <li>
              <span>所剩数量（个）：</span>
              <input
                type="text"
                :placeholder="prodetailsData.Quantity"
                v-model="prodetailsData.Quantity"
              />
            </li>
          </ul>
        </div>
        <div class="btnbox">
          <el-button class="update" type="primary" @click="updatepro(prodetailsData)">更新</el-button>
          <el-button class="close" type="danger" @click="closeMack(2)">关闭</el-button>
        </div>
      </el-card>
    </div>

    <!-- 添加产品弹框-->
    <div class="mack" v-if="mack3">
      <el-card class="box-card" v-loading="loading1">
        <h1>添加产品</h1>
        <div class="list">
          <ul>
            <li>
              <span>产品名：</span>
              <input type="text" :placeholder="fromData.name" v-model="fromData.name" />
            </li>

            <li>
              <span>产品描述：</span>
              <textarea
                class="miaoshu"
                name
                id
                cols="30"
                rows="10"
                v-model="fromData.describe"
                :placeholder="fromData.describe"
              ></textarea>
            </li>
            <li>
              <span>单价（元）：</span>
              <input type="text" :placeholder="fromData.price" v-model="fromData.price" />
            </li>
            <li>
              <span>数量（个）：</span>
              <input type="text" :placeholder="fromData.Quantity" v-model="fromData.Quantity" />
            </li>
          </ul>
        </div>
        <div class="btnbox">
          <el-button class="add" type="primary" @click="setpro(fromData)">添加</el-button>
          <el-button class="close" type="danger" @click="closeMack(3)">关闭</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getpro, getOnepro, postOnepro, setpro, delpro } from '../../api/pro'

export default {
  name: 'Products',
  data () {
    return {
      inData: [],
      loading: true,
      identity: '',
      mack1: false,
      mack2: false,
      prodetailsData: '',
      loading1: false,
      mack3: false,
      fromData: {
        name: '',
        price: '',
        Quantity: '',
        describe: ''
      }

    }
  },
  methods: {
    setpro (data) {
      this.loading1 = true
      console.log(1)
      setpro(data).then(res => {
        this.$message({
          message: res.data.message,
          type: 'success'
        })
        this.loading1 = false
        this.mack3 = false
        this.getpro()
      })
    },
    updatepro (data) {
      this.loading1 = true
      postOnepro(data).then(res => {
        console.log(res)
        this.loading1 = false
        this.$message({
          message: res.data.message,
          type: 'success'
        })
        this.mack2 = false
        this.getpro()
      })
    },
    handleEdit (index, id) {
      switch (index) {
        case '1':
          this.mack1 = true
          break
        case '2':
          this.mack2 = true
          break
        case '3':
          this.mack3 = true
          break
      }
      // this.mack1 = true
      if (id) {
        getOnepro(id).then(res => {
          this.prodetailsData = res.data.data

          this.loading1 = false
        }).catch(err => {
          console.log(err)
        })
      }
    },
    handleDelete (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        delpro({ id }).then(res => {
          this.loading = false
          this.getpro()
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
    handleBuy (id) {
      console.log(id)
    },
    closeMack (index) {
      switch (index) {
        case '1':
          this.mack1 = false
          break
        case '2':
          this.mack2 = false
          break
        case '3':
          this.mack3 = false
          break
      }
    },
    getpro () {
      getpro().then(res => {
        this.inData = res.data.data

        this.loading = false
        this.inData.forEach(it => {
          it.date = this.ChangeDate(it.date)
        })
        // console.log(this.inData)
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
    this.getpro()
    this.identity = this.$store.state.token.identity
  }
}
</script>

<style scoped>
.Products {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}
.addbox {
  padding: 10px;
  box-sizing: border-box;
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
  width: 500px;
}
.list ul li {
  display: flex;
  justify-content: space-between;
}
.list ul li span {
  font-size: 20px;
  line-height: 30px;
  height: 30px;
  display: block;
  width: 180px;
  text-align: right;
}
.list ul li div {
  width: 280px;
  height: 30px;
  line-height: 30px;
}
.list ul li input,
.list ul li textarea {
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #999;
  padding: 5px;
  flex: 1;
  outline: none;
}
.list ul li div.miaoshu {
  height: 80px;
  border: 1px solid #e6e6e6;

  margin-top: 15px;
  border-radius: 10px;
}
.btnbox {
  position: absolute;
  bottom: 30px;
  display: flex;
  width: 100%;
  justify-content: center;
}
.btnbox button {
  margin: 0 20px;
}
</style>
