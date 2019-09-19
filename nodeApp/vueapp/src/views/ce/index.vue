<template>
  <div class="table">
 <el-table
    :data="tableData"
    border

    :summary-method="getSummaries"
    show-summary
    style="width: 100%; margin-top: 20px">
    <el-table-column
      prop="id"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="amount1"
      label="数值 1（元）">
    </el-table-column>
    <el-table-column
      prop="amount2"
      label="数值 2（元）">
    </el-table-column>
    <el-table-column
      prop="amount3"
      label="数值 3（元）">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        id: '12987122',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      }, {
        id: '12987123',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      }, {
        id: '12987124',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        id: '12987125',
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      }, {
        id: '12987126',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }]
    }
  },
  methods: {
    getSummaries (param) {
      // console.log(param)
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (column.label === '数值 3（元）') {
          sums[index] = (sums[index - 1] / sums[index - 2]).toFixed(3)
          return
        }
        console.log(index)
        const values = data.map(item => {
          console.log(item, column.property)
          return Number(item[column.property])
        })
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = ''
        }
      })

      return sums
    }

  }
}
</script>

<style>

</style>
