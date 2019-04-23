<template>
  <div id="admin">
    <nav-header></nav-header>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  export default {
    name: "admin",
    data() {
      return {}
    },
  }
</script>

<style lang="stylus">

</style>
