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
              <Button type="primary" ghost @click="getLocation">到场</Button>
            </div>
            <div class="func_item">
              <a href="javascript:;" class="file">上传照片
                <input type="file" accept="image/*" capture @change="tirggerFile($event)" placeholder="上传照片"></input>
              </a>
            </div>
            <div class="func_item">
              <Button @click="upLoadImg">提交</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import uuid from 'uuid'

  export default {
    name: "DriverClientOne",
    data() {
      return {
        list_id: '',
        info: '',
        file: '',
        postData: {
          token: '',
          key: ''
        },
      }
    },
    mounted() {
      this.content()
      this.getToken()
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
      getLocation() {
        navigator.geolocation.getCurrentPosition((p) => {
          // console.log(p.coords)
          this.axios.get('/baidu/geoconv/v1/', {
            params: {
              coords: `${p.coords.longitude},${p.coords.latitude}`,
              from: 1,
              to: 5,
              ak: 'OGQnghxuwbYbqcTm3mzrEGQbGVMdv4id',
            }
          }).then(res => {
            // this.my_location = res.data.result[0]
            let param = {
              position: res.data.result[0],
              list_id: this.list_id
            }
            this.axios.post('/api/driver/setPosition', param).then(res => {
              console.log(res)
            })
            console.log(res.data.result[0])
          })
        })
      },
      getToken() {
        let key = 'logistics/' + uuid.v4()
        console.log(key)
        this.postData.key = key
        let param = {
          key: key
        }
        this.axios.post('/api/getToken', param).then(res => {
          console.log(res.data.result)
          this.postData.token = res.data.result
        })
      },
      tirggerFile(event) {
         this.file = event.target.files[0]
      },
      upLoadImg() {
        let data = new FormData()
        data.append('token', this.postData.token)
        data.append('key', this.postData.key)
        data.append('file', this.file)
        this.axios.post('https://up-z1.qiniup.com', data ).then(res => {
          let url = 'http://wsmpage.cn/'
          let key = res.data.key
          let pic_url = url + key
          return pic_url
        }).then(url => {
          let param = {
            list_id: this.list_id,
            pic: url
          }
          this.axios.post('/api/driver/setPic', param).then(res => {
            console.log(res)
          })
        })
      }
    }
  }
</script>

<style lang="stylus">

  #driver_client_one
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
