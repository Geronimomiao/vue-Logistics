<template>
  <div id="table_expand">
    <Row>
      <Col span="12">
        <span class="expand-key">装箱日期: </span>
        <span class="expand-value">{{ row.date | datapreFilter }}</span>
      </Col>
      <Col span="12">
        <span class="expand-key">提箱日期: </span>
        <span class="expand-value">{{ row.suitcase_time | dateFilter  }}</span>
      </Col>
    </Row>

    <Row>
      <Col>
        <Col span="12">
          <span class="expand-key">地点: </span>
          <span class="expand-value">{{ row.location }}</span>
        </Col>
        <Col span="12">
          <span class="expand-key">车号: </span>
          <span class="expand-value">{{ row.car_num }}</span>
        </Col>
      </Col>
    </Row>
    <Row>
      <Col span="12">
        <span class="expand-key">集港时间: </span>
        <span class="expand-value">{{ row.port_time }}</span>
      </Col>
      <Col span="12">
        <span class="expand-key">离港时间: </span>
        <span class="expand-value">3/22</span>
      </Col>
    </Row>
    <Row>
      <Col span="12">
        回箱位置：{{ row.recv_suitcase_location }}
      </Col>
      <Col span="12" class="location">
        <div @click="goForMap(row.list_id)">箱子位置</div>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "TableExpand",
    data() {
      return {}
    },
    props: {
      row: Object
    },
    filters: {
      dateFilter(value) {
        let date = new Date(1900, 0, value - 1).toLocaleString().split(' ')[0]
        return date
      },
      datapreFilter(value) {
        let date = value.split(' ')[0]
        return date
      }
    },
    methods: {
      goForMap(list_id) {
        let param = {list_id: list_id}
        this.axios.post('/api/driver/getPosition', param).then(res => {
          // console.log(res)
          this.$router.push({
            name: 'Bmap',
            params: {
              list_id: list_id
            }
          })
        })
      }
    },
  }
</script>

<style lang="stylus">
  #table_expand
    .location
      font-weight: 500
</style>
