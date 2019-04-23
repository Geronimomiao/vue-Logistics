<template>
    <div id="detail">
      <div class="content" ref="content">
        <div class="content-msg">
          <Card>
            <p slot="title">
              订单详情
            </p>
            <div class="card-body">
              <Row>
                <Col span="24">
                  提单号：{{ data.order_id }}
                </Col>
                <Col span="24">
                  提单状态: {{ data.status }}
                </Col>
                <Col span="24">
                  船名/航次：{{ data.boat_name }}
                </Col>
                <Col span="24">
                  目的港：{{ data.destination }}
                </Col>
                <Col span="24">
                  集港日期：{{ data.port_time }}
                </Col>
                <Col span="24">
                  开船日期: 3-22
                </Col>
              </Row>
              <Table :columns="columns" :data="msg" :ellipsis="true">
                <template slot-scope="{ row }" slot="box_num">
                  <strong>
                    {{ row.box_num }}
                  </strong>
                </template>
              </Table>
            </div>
          </Card>
        </div>
      </div>

    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import expandRow from './TableExpand'
  import {mapState} from 'vuex'

  export default {
    name: "Detail",
    data() {
      return {

        data: {},
        msg: [],
        components: { expandRow },
        columns: [
          {
            type: 'expand',
            width: 15,
            render: (h, params) => {
              return h(expandRow, {
                props: {
                  row: params.row
                }
              })
            }
          },
          {
            title: '箱号',
            slot: 'box_num',
            width: 95
          },
          {
            title: '铅封',
            key: 'seal_num',
            width: 90
          },
          {
            title: '箱型',
            key: 'box_type',
          },
          {
            title: '状态',
            key: 'status',
          },
        ],
      }
    },
    computed: {
      ...mapState(['order_id'])
    },
    mounted() {
      this.showData()
    },
    filters: {
      msgFilter(value) {
        value.forEach(item => {
          item._expanded = true
        })
        console.log(value)
        return value
      }
    },
    methods: {
      showData() {
        let params = {
          order_id: this.order_id
        }
        this.axios.post('/api/show/orderDetail', params).then(res => {
          let Filter = this.$options.filters['msgFilter']

          this.data = res.data.msg[0]
          this.msg =  Filter(res.data.msg)
          this.content()
          console.log(this.msg)
        })
      },
      content() {
        let scroll = new BScroll(this.$refs.content, {
          click: true,
          scrollY: true,
        })
      },
    },
  }
</script>

<style lang="stylus">
  #detail
    .content
      overflow hidden
      margin-top: 3vh
      margin-bottom: 3vh
      height: 77vh
      position: relative
      width: 90%
      margin-left: 5%
      .ivu-card-body
        padding: 10px
        .card-body
          font-size: 0.6rem
          .ivu-table-expanded-cell
            padding: 10px 20px
          .ivu-table-cell
            text-align: center
            padding-left: 5px
            padding-right: 0
            width: 100%
          .ivu-collapse-header
            padding-left: 0
            height: 30px
            line-height: 30px
            i
              display: none

</style>
