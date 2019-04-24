<template>
  <div id="table_expand">
    <Row>
      <Col span="12">
        <span class="expand-key">序列号: </span>
        <span class="expand-value">{{ row.list_id }}</span>
      </Col>
      <Col span="12">
        <span class="expand-key">联系人: </span>
        <span class="expand-value">{{ row.contact }}</span>
      </Col>
    </Row>

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
      <Col span="6" class="location">
        <div @click="goForMap(row.list_id)">箱子位置</div>
      </Col>
      <Col span="6" class="location pic">
        <div @click="showImg(row.list_id)">箱号铅封</div>
      </Col>
    </Row>
    <Modal
      v-model="model"
      title="到场照片"
    >
      <img v-if="this.current==1" :src="this.pic1" alt="">
      <img v-if="this.current==2" :src="this.pic2" alt="">
      <Page :total="20" :current="current" @on-change="changePage"/>
      <div slot="footer">
        <Button type="success" size="large" @click="download">下载</Button>
      </div>
    </Modal>
  </div>


</template>

<script>
  export default {
    name: "TableExpand",
    data() {
      return {
        pic1: '',
        pic2: '',
        model: false,
        current: 1
      }
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
      },
      showImg(list_id) {
        let param = {list_id: list_id}
        this.axios.post('/api/driver/getPosition', param).then(res => {
          console.log(res)
          this.pic2 = res.data.pic_box_num
          this.pic1 = res.data.pic_seal
          console.log(this.pic)
        }).then(() => this.model = true)
      },
      changePage(i) {
        this.current = i
      },
      download() {
        this.downloadIamge(this.pic1, this.pic1)
        this.downloadIamge(this.pic2, this.pic2)
      },
      downloadIamge(imgsrc, name) {//下载图片地址和图片名
        let image = new Image();
        console.log(imgsrc)
        // 解决跨域 Canvas 污染问题
        image.setAttribute("crossOrigin", "anonymous");
        let that = this
        image.onload = function() {
          let canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          let context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, image.width, image.height);
          let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
          console.log(url)
          that.downloadCanvas(url, name)
          // let a = document.createElement("a"); // 生成一个a元素
          // let event = new MouseEvent("click"); // 创建一个单击事件
          // a.download = name || "photo"; // 设置图片名称
          // a.href = url; // 将生成的URL设置为a.href属性
          // a.dispatchEvent(event); // 触发a的单击事件
        };
        image.src = imgsrc;
      },
      downloadCanvas(url, name){
        let link = document.createElement("a");
        let blob = this.dataURLtoBlob(url);
        let objurl = URL.createObjectURL(blob);

        link.download = name + ".png";
        link.href = objurl;
        link.click();
      },
      dataURLtoBlob(url) {
        console.log(url)
        var arr = url.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while(n--){
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
      },
    },
  }
</script>

<style lang="stylus">
  #table_expand
    .location
      font-weight: 500
    .pic
      color #13c2c2
      font-weight: bolder
</style>
