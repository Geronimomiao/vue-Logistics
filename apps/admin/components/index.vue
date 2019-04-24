<template>
  <div id="index">
    <div class="upload">
      <Upload action="/api/upload"
              :show-upload-list="false"
              :on-success="handleSuccess">
        <Button icon="ios-cloud-upload-outline">上传文件(覆盖)</Button>
      </Upload>
      <Upload action="/api/upload/data"
              :show-upload-list="false"
              :on-success="handleSuccess">
        <Button icon="ios-cloud-upload-outline">上传文件(跟新)</Button>
      </Upload>
      <Button type="error" ghost class="del" @click="del">清空所有数据</Button>
    </div>
    <div class="user">
      <Upload action="/api/upload/user"
              :show-upload-list="false"
              :on-success="handleSuccess">
        <Button icon="ios-cloud-upload-outline">上传用户信息</Button>
      </Upload>
    </div>

  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {}
    },
    methods: {
      del() {
        this.axios.post('/api/show/del').then(res => {
          console.log(res)
        })
      },
      handleSuccess(res) {
        console.log(res)
        if (res.status == 1) {
          this.open()
        }
      },
      open () {
        this.$Notice.open({
          title: '上传成功',
        });
      }
    }
  }
</script>

<style lang="stylus">
  #index
    height: 83vh
    .ivu-upload
      margin-top: 0.3rem
      display: inline-block
</style>
