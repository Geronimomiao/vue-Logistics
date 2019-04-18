import Vue from 'vue'
import Router from 'vue-router'

import Auth from '@/views/Auth'
import Data from '@/views/Data'

import Detail from '@/data/Detail'
import ShowData from '@/data/ShowData'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/data',
      name: 'Data',
      component: Data,
      children: [
        {
          path: '/data/show',
          name: 'ShowData',
          component: ShowData
        },
        {
          path: '/data/detail',
          name: 'Detail',
          component: Detail
        },
      ]
    }
  ]
})
