<template>
  <div id="login">
    <div class="logo">ABR</div>
    <div class="container">
      <Input v-model="car_num" placeholder="请输入车牌号" />
      <Button type="primary" shape="circle" ghost>登录</Button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        car_num: ''
      }
    },
  }
</script>

<style lang="stylus">
  #login
    .logo
      display flex
      justify-content center
      align-items center
      font-size: 3rem
      height: 30vh
    .container
      width: 70%
      margin-left: 15%
      .ivu-btn
        width: 100%
        margin-top: 0.8rem
</style>
