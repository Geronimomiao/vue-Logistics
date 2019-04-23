<template>
  <div id="driver_client_two">
    <div class="container" ref="container">
      <div class="container-msg">
        <Row>
          <Col span=16>
            <Input type="text" v-model="list_id_1" placeholder="请输入序号"></Input>
          </Col>
          <Col span="4" offset="2">
            <Button type="primary" ghost @click="getInfo_1">提交</Button>
          </Col>
        </Row>
        <div v-if="info_1">
          <div class="item">
            船名/航次: {{ info_1.boat_name }}
          </div>
          <div class="item">
            提单号: {{ info_1.order_id }}
          </div>
          <div class="item">
            目的港: {{ info_1.destination }}
          </div>
          <div class="item">
            装货地址: {{ info_1.location_detail }}
          </div>
          <div class="func">
            <div class="func_item">
              <Button type="primary" ghost @click="getLocation">到场</Button>
            </div>
            <div class="func_item">
              <a href="javascript:;" class="file">上传照片
                <input type="file" accept="image/*" capture @change="tirggerFile($event)" placeholder="上传照片"></input>
              </a>
            </div>
            <div class="func_item">
              <Button type="primary" ghost @click="">到场</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" ref="container">
      <div class="container-msg">
        <Row>
          <Col span=16>
            <Input type="text" v-model="list_id_2" placeholder="请输入序号"></Input>
          </Col>
          <Col span="4" offset="2">
            <Button type="primary" ghost @click="getInfo_2">提交</Button>
          </Col>
        </Row>
        <div v-if="info_2">
          <div class="item">
            船名/航次: {{ info_2.boat_name }}
          </div>
          <div class="item">
            提单号: {{ info_2.order_id }}
          </div>
          <div class="item">
            目的港: {{ info_2.destination }}
          </div>
          <div class="item">
            装货地址: {{ info_2.location_detail }}
          </div>
          <div class="func">
            <div class="func_item">
              <Button type="primary" ghost @click="getLocation">到场</Button>
            </div>
            <div class="func_item">
              <a href="javascript:;" class="file">上传照片
                <input type="file" accept="image/*" capture @change="tirggerFile($event)" placeholder="上传照片"></input>
              </a>
            </div>
            <div class="func_item">
              <Button type="primary" ghost @click="">到场</Button>
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
    name: "DriverClientTwo",
    data() {
      return {
        list_id_1: '',
        list_id_2: '',
        info_1: '',
        info_2: '',
      }
    },
    mounted() {
      this.content()
    },
    methods: {
      content() {
        let scroll = new BScroll(this.$refs.container, {
          click: true,
          scrollY: true,
        })
      },
      getInfo_1() {
        let param = {
          list_id: this.list_id_1
        }
        this.axios.post('/api/driver/info', param).then(res => {
          console.log(res.data.msg)
          this.info_1 = res.data.msg
          // this.info.location_detail = res.data.msg.location_detail.split('\n')[0]
          // console.log(res.data.msg.location_detail.split('\n')[0])
        })
      },
      getInfo_2() {
        let param = {
          list_id: this.list_id_2
        }
        this.axios.post('/api/driver/info', param).then(res => {
          console.log(res.data.msg)
          this.info_2 = res.data.msg
          // this.info.location_detail = res.data.msg.location_detail.split('\n')[0]
          // console.log(res.data.msg.location_detail.split('\n')[0])
        })
      },
    }
  }
</script>

<style lang="stylus">
  #driver_client_two
    .container
      padding: 1rem 0
      width: 90%
      margin-left: 5%
      height: 41vh
      .container-msg
        .item
          margin-top: 0.3rem
        .func
          margin-top: 0.7rem
          display: flex
          .func_item
            padding: 0.4rem
            flex 1
            .file
              position: relative;
              display: inline-block;
              border: 1px solid #2d8cf0;
              border-radius: 4px;
              padding: 4px 12px;
              overflow: hidden;
              color: #2d8cf0;
              text-decoration: none;
              text-indent: 0;
              line-height: 20px;
              input
                position: absolute;
                font-size: 100px;
                right: 0;
                top: 0;
                opacity: 0;
</style>
