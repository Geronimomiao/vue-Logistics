<template>
  <div id="show-data">
    <div class="content" ref="content">
      <div class="content-msg">
        <div class="select">
          <DatePicker type="date" placeholder="请选择日期" style="width: 70%" v-model="date"></DatePicker>
          <Button type="primary" ghost @click="timeData">查询</Button>
        </div>
        <div class="select">
          <Input v-model="order_id" placeholder="请输入提单号" style="width: 70%"/>
          <Button type="primary" ghost @click="showData">查询</Button>
        </div>
        <div class="all">
          <Row>
            <Col span="6">
              <Button type="success" ghost @click="showData">全部订单</Button>
            </Col>
            <Col span="6">
              <Button type="success" ghost @click="backTwoDays">前两日</Button>
            </Col>
            <Col span="6">
              <Button type="success" ghost @click="today">今日</Button>
            </Col>
            <Col span="6">
              <Button type="success" ghost @click="afterTwoDays">后两日</Button>
            </Col>
          </Row>
        </div>
        <div class="table">
          <Table border :columns="columns" :data="data">
            <template slot-scope="{ row }" slot="order_id">
              <strong @click="goForDetail(row.order_id)">{{ row.order_id }}</strong>
            </template>
          </Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { mapState } from 'vuex'

  export default {
    name: 'ShowData',
    data() {
      return {
        order_id: '',
        data: [{date: '', order_id: '', status: ''}],
        date: '',
        columns: [
          {
            title: '日期',
            key: 'date',
            width: 60
          },
          {
            title: '提单号',
            slot: 'order_id'
          },
          {
            title: '状态',
            key: 'status',
            width: 90
          },
        ],
      }
    },
    mounted() {
      this.content()
    },
    computed: {
      ...mapState(['username'])
    },
    filters: {
      dateFilter(value) {
        if (value) {
          value.forEach(item => {
            let pre_date = item.date[0].split(' ')[0].split('-')
            let mon = pre_date[1]
            let day = pre_date[2]
            // let date = `${year}-${mon}-${day}`
            let date = `${mon}-${day}`
            item.date = date
            item.order_id = item._id
            item.status = item.status[0]
          })
        }
        return value
      },
      timeFilter(value, arg) {
        let arr = []
        value.forEach(item => {
          console.log(item.date)
          if (item.date == arg) {
            arr.push(item)
          }
        })
        return arr
      }
    },
    methods: {
      content() {
        let scroll = new BScroll(this.$refs.content, {
          click: true,
          scrollY: true,
        })
      },
      async showData() {
        let param = { contact: this.username }
        await this.axios.post('/api/show/data', param).then(res => {
          let news_filter = this.$options.filters['dateFilter']
          this.data = news_filter(res.data.msg)
          console.log(this.data)
        })
      },
      async timeData() {
        let param = { contact: this.username }
        await this.axios.post('/api/show/data', param).then(res => {
          console.log(res.data)
          let news_filter = this.$options.filters['dateFilter']
          this.data = news_filter(res.data.msg)

          let time_filter = this.$options.filters['timeFilter']
          let d = new Date(this.date)
          let arg = (d.getMonth() + 1) + '-' + d.getDate()
          this.data = time_filter(this.data, arg)
        })
      },

      goForDetail(order_id) {
        this.$store.commit('updateOrderId', order_id)
        console.log(order_id)
        this.$router.push({
          name: 'Detail'
        })
      },
      today() {
        let d = new Date()
        let arg = (d.getMonth() + 1) + '-' + d.getDate()
        this.findData(arg)
      },
      backTwoDays() {
        let d = new Date()
        let arg1 = (d.getMonth() + 1) + '-' + (d.getDate() - 1)
        let arg2 = (d.getMonth() + 1) + '-' + (d.getDate() - 2)
        this.findTwoData(arg1, arg2)
      },
      afterTwoDays() {
        let d = new Date()
        let arg1 = (d.getMonth() + 1) + '-' + (d.getDate() + 1)
        let arg2 = (d.getMonth() + 1) + '-' + (d.getDate() + 2)
        this.findTwoData(arg1, arg2)
      },
      findData(arg) {
        let param = { contact: this.username }
        this.axios.post('/api/show/data', param).then(res => {
          // console.log(res.data)
          let news_filter = this.$options.filters['dateFilter']
          let pre_data = news_filter(res.data.msg)
          let time_filter = this.$options.filters['timeFilter']
          this.data = time_filter(pre_data, arg)
          console.log(this.data)
        })
      },
      findTwoData(arg1, arg2) {
        let param = { contact: this.username }
        this.axios.post('/api/show/data', param).then(res => {
          console.log(res.data)
          let news_filter = this.$options.filters['dateFilter']
          this.data = news_filter(res.data.msg)
          let time_filter = this.$options.filters['timeFilter']
          let data_1 = time_filter(this.data, arg1)
          let data_2 = time_filter(this.data, arg2)
          this.data = data_1.concat(data_2)
        })
      },
    },

  }
</script>

<style lang="stylus">
  #show-data

    .content
      overflow hidden
      margin-top: 3vh
      margin-bottom: 3vh
      height: 77vh
      position: relative
      width: 90%
      margin-left: 5%


      .del
        position: absolute
        top: 0
        right: 0

      .select
        display: flex
        margin-top: 2vh
        justify-content space-between

      .all
        margin-top: 2vh
        .ivu-col-span-6
          text-align: center

      .table
        margin-top: 2vh

        .ivu-table-cell
          padding-left: 10px
          padding-right: 10px
</style>
