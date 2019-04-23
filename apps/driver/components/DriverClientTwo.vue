<template>
  <div id="driver_client_two">
    <driver-client-one></driver-client-one>
    <driver-client-one></driver-client-one>
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

</style>
