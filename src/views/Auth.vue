<template>
  <div id="auth">
    <nav-header></nav-header>
    <div class="content">
      <Card style="width:80%">
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          登录页面
        </p>
        <a href="#" slot="extra" @click.prevent="changeLimit">
          <Icon type="ios-loop-strong"></Icon>
          Login
        </a>
        <Form>
          <FormItem prop="user">
            <Input type="text" v-model="user" placeholder="Username">
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
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  export default {
    name: "Auth",
    data() {
      return {
        user: '',
        password: '',
      }
    },
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
