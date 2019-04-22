<template>
  <div id="driver_client_one">
    <div class="container" ref="container">
      <div class="container-msg">
        <Row>
          <Col span=16>
            <Input type="text" v-model="list_id" placeholder="请输入序号"></Input>
          </Col>
          <Col span="4" offset="4">
            <Button type="primary" ghost @click="getInfo">提交</Button>
          </Col>
        </Row>
        <div v-if="info">
          <div class="item">
            船名/航次: {{ info.boat_name }}
          </div>
          <div class="item">
            提单号: {{ info.order_id }}
          </div>
          <div class="item">
            目的港: {{ info.destination }}
          </div>
          <div class="item">
            装货地址: {{ info.location_detail }}
          </div>
          <div class="func">
            <div class="func_item">
              <Button type="primary" ghost @click="getInfo">拍照</Button>
            </div>
            <div class="func_item">
              <Button type="primary" ghost @click="getInfo">上传</Button>
            </div>
            <div class="func_item">
              <Button type="primary" ghost @click="getInfo">到场</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "DriverClientOne",
    data() {
      return {
        list_id: '',
        info: '',
      }
    },
    mounted() {
      this.content()
    },
    methods: {
      getInfo() {
        let param = {
          list_id: this.list_id
        }
        this.axios.post('/api/driver/info', param).then(res => {
          console.log(res.data.msg)
          this.info = res.data.msg
          // this.info.location_detail = res.data.msg.location_detail.split('\n')[0]
          // console.log(res.data.msg.location_detail.split('\n')[0])
        })
      },
      content() {
        let scroll = new BScroll(this.$refs.container, {
          click: true,
          scrollY: true,
        })
      },
    }
  }
</script>

<style lang="stylus">

  #driver_client_one
    .container
      padding: 1rem 0
      width: 90%
      margin-left: 5%
      height: 83vh
      .container-msg
        .item
          margin-top: 0.7rem
        .func
          margin-top: 0.7rem
          display: flex
          .func_item
            padding: 0.4rem
            flex 1

</style>
