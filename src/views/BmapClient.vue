<template>
  <div id="bmap_client">
    <nav-header></nav-header>
      <div class="func">
        <Button type="primary" @click="getLocation">发送位置</Button>
      </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  export default {
    name: "BmapClient",
    data() {
      return {}
    },
    mounted() {
      this.getLocation()
    },
    methods: {
      getLocation() {
        navigator.geolocation.getCurrentPosition((p) => {
          console.log(p.coords)
          this.axios.get('/baidu/geoconv/v1/', {
            params: {
              coords: `${p.coords.longitude},${p.coords.latitude}`,
              from: 1,
              to: 5,
              ak: 'OGQnghxuwbYbqcTm3mzrEGQbGVMdv4id',
            }
          }).then(res => {
            console.log(this.my_location)
            this.my_location = res.data.result[0]
          })
        })
      },
    }
  }
</script>

<style lang="stylus">

  #bmap_client
    .func
      height: 83vh
      display: flex
      justify-content center
      align-items center

</style>
