<template>
  <div id="b_map">
    <baidu-map class="bm-view" :center="center" :zoom="zoom">
      <bm-marker v-if="position" :position='formatPosition(position.x, position.y)'
                 :icon="{url: 'http://wsmpage.cn/e-charge/e-charge.png', size: {width: 20, height: 20}}">
      </bm-marker>
    </baidu-map>
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
        position: {}
      }
    },
    mounted() {
      this.getPosition()
    },
    methods: {
      formatPosition(lng, lat){
        return {lng: lng, lat: lat}
      },
      getPosition() {
        let param = {
          list_id: this.$route.params.list_id
        }
        this.axios.post('/api/driver/getPosition', param).then(res => {
          // console.log(res.data.position)
          this.position = res.data.position
        })
      },
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
