<template>
  <div id="driver_client_two">
    <div class="container">
      <driver-client-one></driver-client-one>
    </div>
    <div class="container">
      <driver-client-one></driver-client-one>
    </div>
  </div>
</template>

<script>
  import DriverClientOne from './DriverClientOne'

  export default {
    name: "DriverClientTest",
    data() {
      return {}
    },
    components: {
      DriverClientOne
    }
  }
</script>

<style lang="stylus">

  #driver_client_two
    .container
      height 41vh
      overflow hidden


</style>
