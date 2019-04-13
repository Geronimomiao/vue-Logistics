<template>
  <div id="nav_header">
    <div class="container">
      <div class="item">首页</div>
      <div class="item" v-if="username">你好，{{username}}</div>
      <div class="item" v-else>请登录</div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "NavHeader",
    data() {
      return {}
    },
    computed: {
      ...mapState(['username'])
    }
  }
</script>

<style lang="stylus">

  #nav_header
    background-color: #000000
    height: 10vh
    .container
      width: 90%
      margin-left: 5%
      display: flex
      justify-content space-between
      .item
        color aliceblue
        line-height: 10vh
        font-size: 3vh


</style>
