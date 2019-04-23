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
          <Button type="success" ghost @click="showData">全部订单</Button>
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
        -ms-text-align-last: left
        text-align-last: left

      .table
        margin-top: 2vh

        .ivu-table-cell
          padding-left: 10px
          padding-right: 10px
</style>
