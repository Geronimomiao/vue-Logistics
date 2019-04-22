<template>
  <div id="driver_footer">
    <div class="container">
      <div class="item" :class="(this.selected == 1) ? 'selected' : '' " @click="goForOne">一个箱子</div>
      <div class="item" :class="(this.selected == 2) ? 'selected' : '' " @click="goForTwo">两个箱子</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DriverFooter",
    data() {
      return {
        selected: 1
      }
    },
    methods: {
      goForOne() {
        this.selected = 1
        this.$router.push({path: '/driver/one'})
      },
      goForTwo() {
        this.selected = 2
        this.$router.push({path: '/driver/two'})
      }
    },
  }
</script>

<style lang="stylus">

  #driver_footer
    height: 10vh
    background-color: #f0f0f0
    position: fixed;
    bottom: 0;
    width: 100%;

    .container
      display: flex

      .item
        text-align: center
        line-height: 10vh
        font-size: 1.2rem
        flex 1

      .selected
        background-color: rgba(27,26,29,0.11)

</style>
