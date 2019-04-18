<template>
  <div id="nav_header">
    <div class="container">
      <div class="item" @click="goback">
        <Icon type="md-arrow-dropleft" />
      </div>
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
    },
    methods: {
      goback() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="stylus">

  #nav_header
    background-color: #f0f0f0
    height: 7vh

    .container
      width: 90%
      margin-left: 3%
      display: flex
      justify-content space-between
      .item
        color black
        line-height: 7vh
        font-size: 1rem
        i
          font-size: 1.5rem


</style>
