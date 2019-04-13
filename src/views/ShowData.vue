<template>
  <div id="show-data">
    <nav-header></nav-header>
    <div class="content">

      <Upload action="http://127.0.0.1:3100/upload"
              :show-upload-list="false"
              :on-success="handleSuccess">
        <Button icon="ios-cloud-upload-outline">Upload files</Button>

      </Upload>
      <Button type="error" ghost class="del" @click="del">清空所有数据</Button>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>

  export default {
    name: 'ShowData',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      del() {
        this.axios.post('http://127.0.0.1:3100/show/del').then(res => {
          console.log(res)
        })
      },
      handleSuccess (res, file) {
        console.log(res)
      },
    }
  }
</script>

<style lang="stylus">
  #show-data
    height: 100vh

    .content
      margin-top: 5vh
      height: 60vh
      margin-bottom: 15vh
      position: relative
      width: 90%
      margin-left: 5%
      .del
        position: absolute
        top: 0
        right: 0



</style>
