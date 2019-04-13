<template>
  <div id="show-data">
    <nav-header></nav-header>
    <div class="content" ref="content">
      <div class="content-msg">
        <div class="upload">
          <Upload action="http://127.0.0.1:3100/upload"
                  :show-upload-list="false"
                  :on-success="handleSuccess">
            <Button icon="ios-cloud-upload-outline">上传文件</Button>
          </Upload>
          <Button type="error" ghost class="del" @click="del">清空所有数据</Button>
        </div>
        <div class="select">
          <DatePicker type="date" placeholder="请选择日期" style="width: 70%" v-model="date"></DatePicker>
          <Button type="primary" ghost @click="timeData">查询</Button>
        </div>
        <div class="select">
          <Input v-model="order_id" placeholder="请输入提单号" style="width: 70%"/>
          <Button type="primary" ghost @click="showData">查询</Button>
        </div>
        <div class="table">
          <Table :columns="columns" :data="data"></Table>
        </div>
      </div>
    </div>

    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'ShowData',
    data() {
      return {
        order_id: '',
        data: [{date: '', order_id: '', box_num: ''}],
        date: '',
        columns: [
          {
            title: '日期',
            key: 'date'
          },
          {
            title: '提单号',
            key: 'order_id'
          },
          {
            title: '箱号',
            key: 'box_num'
          },

        ],
      }
    },
    mounted() {
      this.content()
    },
    filters: {
      dateFilter(value) {
        if (value) {
          value.forEach(item => {
            let pre_date = item.date.split(' ')[0].split('-')
            let year = pre_date[0]
            let mon = pre_date[1]
            let day = pre_date[2]
            let date = `${year}-${mon}-${day}`
            item.date = date
          })
        }
        return value
      },
      timeFilter(value, arg) {
        let arr = []
        console.log(arg)
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
      del() {
        this.axios.post('http://127.0.0.1:3100/show/del').then(res => {
          console.log(res)
        })
      },
      content() {
        let scroll = new BScroll(this.$refs.content, {
          click: true,
          scrollY: true,
        })
      },
      handleSuccess(res) {
        console.log(res)
      },
      async showData() {
        if (this.order_id) {
          let params = {
            order_id: this.order_id
          }
          await this.axios.post('http://127.0.0.1:3100/show/dataDetail', params).then(res => {
            let news_filter = this.$options.filters['dateFilter']
            this.data = news_filter([res.data.msg])
            console.log(this.data)
          })
        } else {
          await this.axios.post('http://127.0.0.1:3100/show/data').then(res => {
            let news_filter = this.$options.filters['dateFilter']
            this.data = news_filter(res.data.msg)
          })
        }
      },
      async timeData() {
        await this.axios.post('http://127.0.0.1:3100/show/data').then(res => {
          let news_filter = this.$options.filters['dateFilter']
          this.data = news_filter(res.data.msg)

          let time_filter = this.$options.filters['timeFilter']
          let d =  new Date(this.date)
          let arg = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
          this.data = time_filter(this.data, arg)
        })
      }
    },

  }
</script>

<style lang="stylus">
  #show-data
    height: 100vh

    .content
      overflow hidden
      margin-top: 5vh
      height: 70vh
      position: relative
      width: 90%
      margin-left: 5%
      margin-bottom: 5vh

      .del
        position: absolute
        top: 0
        right: 0

      .select
        display: flex
        margin-top: 2vh
        justify-content space-between

      .table
        margin-top: 2vh

</style>
