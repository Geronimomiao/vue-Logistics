import Vue from 'vue'
import Router from 'vue-router'
import ShowData from '@/views/ShowData'
import Auth from '@/views/Auth'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/show',
      name: 'ShowData',
      component: ShowData
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
  ]
})
