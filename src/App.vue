<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus">

  #app
    height: 100vh
  .ivu-notice
    width: 80%
    left 10%
    margin-right: 0
  .v-transfer-dom
    .ivu-modal-confirm-body
      padding-left: 5px
      font-size: 0.7rem
      line-height: 1.3rem
    .ivu-modal-confirm-footer
      margin-top: 4px
</style>
