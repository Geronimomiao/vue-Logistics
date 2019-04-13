<template>
  <div id="show-data">
    <nav-header></nav-header>
    <div class="msg">
      <form>
        <input type="file" name="file" multiple="multiple" @change="getFile($event)"/>
        <button @click="submitForm($event)">提交</button>
      </form>
      <template>
        <Upload action="http://127.0.0.1:3100/upload">
          <Button icon="ios-cloud-upload-outline">Upload files</Button>
        </Upload>
      </template>

    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'ShowData',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      getFile(event) {
        this.file = event.target.files[0];
        console.log(this.file);
      },
      submitForm(event) {
        event.preventDefault();
        let formData = new FormData();
        formData.append('name', this.name);
        formData.append('age', this.age);
        formData.append('file', this.file);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
        axios.post('http://127.0.0.1:3100/upload', formData, config).then(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style lang="stylus">
  #show-data
    height: 100vh
    .msg
      height: 60vh
      margin-bottom: 20vh
</style>
