<template>
  <div id="index">
    <div class="upload">
      <Upload action="/api/upload"
              :show-upload-list="false"
              :on-success="handleSuccess">
        <Button icon="ios-cloud-upload-outline">上传文件</Button>
      </Upload>
      <Upload action="/api/upload/user"
              :show-upload-list="false"
              :on-success="handleSuccess">
        <Button icon="ios-cloud-upload-outline">上传用户信息</Button>
      </Upload>
      <Button type="error" ghost class="del" @click="del">清空所有数据</Button>
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
      },
    }
  }
</script>

<style lang="stylus">
  #index
    height: 83vh
    .upload
      padding: 20px
      display: flex
      justify-content space-between
</style>
