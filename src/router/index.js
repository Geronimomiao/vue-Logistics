import Vue from 'vue'
import Router from 'vue-router'

import Auth from '@/views/Auth'
import Data from '@/views/Data'
import Admin from '@/views/Admin'
import Bmap from '@/views/Bmap'
import BmapClient from '@/views/BmapClient'

import Detail from '@/data/Detail'
import ShowData from '@/data/ShowData'

import Index from '@/admin/index'

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
          component: ShowData,
          meta: {keepAlive: true},

        },
        {
          path: '/data/detail',
          name: 'Detail',
          component: Detail,
          meta: {keepAlive: false},
        },
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: '/admin/index',
          name: 'Index',
          component: Index
        },
      ]
    },
    {
      path: '/map',
      name: 'Bmap',
      component: Bmap
    },
    {
      path: '/map_client',
      name: 'BmapClient',
      component: BmapClient
    }
  ]
})
