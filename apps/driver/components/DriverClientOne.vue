<template>
  <div id="driver_client_one">
    <div class="container" ref="container">
      <div class="container-msg">
        <Row>
          <Col span=16>
            <Input type="text" v-model="list_id" placeholder="请输入序号"></Input>
          </Col>
          <Col span="4" offset="2">
            <Button type="success" ghost @click="getInfo">提交</Button>
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
              <a href="javascript:;" class="file">铅封照片
                <input type="file" accept="image/*" capture @change="sealFile($event)" placeholder="上传照片"></input>
              </a>
            </div>
            <div class="func_item">
              <a href="javascript:;" class="file">箱号照片
                <input type="file" accept="image/*" capture @change="boxFile($event)" placeholder="上传照片"></input>
              </a>
            </div>
            <div class="func_item">
              <Button type="primary" @click="upLoad">提交</Button>
            </div>
          </div>
          <div class="msg">
            tip: 提上箱后点击上传照片，上传集装箱箱门信息，确认无误后点击提交
          </div>
          <div class="func">
            <div class="func_item">
              <Button type="primary" ghost @click="getLocation">到场</Button>
            </div>
          </div>
          <div class="msg">
            tip: 我们确认到达工厂后，点击到厂按钮
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
        seal: {
          file: '',
          token: '',
          key: ''
        },
        box: {
          file: '',
          token: '',
          key: ''
        },
        length: ''
      }
    },
    mounted() {
      this.content()
      this.getSealToken()
      this.getBoxToken()
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
            let param_1 = {
              position: res.data.result[0],
              list_id: this.list_id
            }
            this.axios.post('/api/driver/setPosition', param_1).then(res => {
              if (res.status == 200) {
                this.$Notice.open({
                  title: '通知',
                  desc: `
                    提交成功\n
                    请您耐心等待\n
                    如果有问题 请联系此单的操作人员
                  `
                });
              }
            })
            let param_2 = {
              status: '到场',
              list_id: this.list_id,
            }
            this.axios.post('/api/show/update/status', param_2).then(res => {
              console.log(res)
            })
          })
        })
      },
      getSealToken() {
        let key = 'logistics/' + uuid.v4()
        console.log(key)
        this.seal.key = key
        let param = {
          key: key
        }
        this.axios.post('/api/getToken', param).then(res => {
          console.log(res.data.result)
          this.seal.token = res.data.result
        })
      },
      getBoxToken() {
        let key = 'logistics/' + uuid.v4()
        console.log(key)
        this.box.key = key
        let param = {
          key: key
        }
        this.axios.post('/api/getToken', param).then(res => {
          console.log(res.data.result)
          this.box.token = res.data.result
        })
      },
      sealFile(e) {
        console.log(e.target.files)
        this.seal.file = e.target.files[0]
      },
      boxFile(e) {
        console.log(e.target.files)
        this.box.file = e.target.files[0]
      },
      upLoad() {
        this.upLoadBoxImg()
        this.upLoadSealImg()
        let param = {
          status: '提箱',
          list_id: this.list_id,
        }
        this.axios.post('/api/show/update/status', param).then(res => {
          console.log(res)
        })
      },
      upLoadSealImg() {
        let data = new FormData()
        data.append('token', this.seal.token)
        data.append('key', this.seal.key)
        data.append('file', this.seal.file)
        this.axios.post('https://up-z1.qiniup.com', data).then(res => {
          let url = 'http://wsmpage.cn/'
          let key = res.data.key
          let pic_url = url + key
          return pic_url
        }).then(url => {
          let param = {
            list_id: this.list_id,
            pic: url
          }
          this.axios.post('/api/driver/setSealPic', param).then(res => {
            // console.log(res.status)
            if (res.status == 200) {
              this.$Notice.open({
                title: '通知',
                desc: `
                  铅封照片上传成功\n
                  感谢您的支持 辛苦了 谢谢
                `
              });
            }
          })
        })
      },
      upLoadBoxImg() {
        let data = new FormData()
        data.append('token', this.box.token)
        data.append('key', this.box.key)
        data.append('file', this.box.file)
        this.axios.post('https://up-z1.qiniup.com', data).then(res => {
          let url = 'http://wsmpage.cn/'
          let key = res.data.key
          let pic_url = url + key
          return pic_url
        }).then(url => {
          let param = {
            list_id: this.list_id,
            pic: url
          }
          this.axios.post('/api/driver/setBoxPic', param).then(res => {
            // console.log(res.status)
            if (res.status == 200) {
              this.$Notice.open({
                title: '通知',
                desc: `
                  箱号照片上传成功\n
                  感谢您的支持 辛苦了 谢谢
                `
              });
            }
          })
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

      .container-msg
        padding-top: 1rem

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

        .msg
          text-indent 2em
          color red
</style>
