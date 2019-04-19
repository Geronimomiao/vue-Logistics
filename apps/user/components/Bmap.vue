<template>
  <div id="b_map">
    <baidu-map class="bm-view" :center="center" :zoom="zoom"></baidu-map>
  </div>
</template>

<script>
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'

  export default {
    name: "Bmap",
    components: {
      BaiduMap,
    },
    data() {
      return {
        center: {lng: 117.211056, lat: 39.1434},
        zoom: 11,
      }
    },
  }
</script>

<style lang="stylus">
  #b_map
    .BMap_Marker
      img
        width: 100%
    .bm-view
      position: fixed
      height: 83vh
      width: 100%
    .anchorBL
      img
        display: none
</style>
