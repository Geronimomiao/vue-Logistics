<template>
  <div id="auth">
    <div class="content">
      <Card style="width:80%">
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          登录页面
        </p>
        <a href="#" slot="extra" @click="login">
          <Icon type="ios-loop-strong"></Icon>
          Login
        </a>
        <Form>
          <FormItem prop="user">
            <Input type="text" v-model="username" placeholder="Username">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="password" placeholder="Password">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
        </Form>
      </Card>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Auth",
    data() {
      return {
        username: '',
        password: '',
      }
    },
    methods: {
      login() {
        let params = {
          username: this.username,
          password: this.password
        }
        this.axios.post('api/admin/login', params).then(res => {
          let data = res.data;
          if (data.status) {
            this.$store.commit('updateUserInfo', this.username)
            this.$router.push({path: '/admin/show'})
          } else {
            this.error()
          }
        })
      },
      error () {
        this.$Notice.error({
          title: 'Notification title',
          desc: '请检查输入的用户名 密码',
        });
      }
    }
  }
</script>

<style lang="stylus">

  #auth
    height: 100vh
    .content
      height: 60vh
      display: flex
      justify-content center
      align-items center
      margin-bottom: 20vh

</style>
