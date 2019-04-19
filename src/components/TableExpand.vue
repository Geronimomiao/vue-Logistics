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
      <Col span="24">
        回箱位置：{{ row.recv_suitcase_location }}
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
  }
</script>

<style lang="stylus">


</style>
