import Vue from 'vue'
import Router from 'vue-router'

import BmapClient from '../../apps/driver/components/BmapClient'

import Data from '../../apps/user/views/Data'
import Detail from '../../apps/user/components/Detail'
import ShowData from '../../apps/user/components/ShowData'
import Bmap from '../../apps/user/components/Bmap'
import Auth from '../../apps/user/components/Auth'

import Admin from '../../apps/admin/views/Admin'
import Index from '../../apps/admin/components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/data',
      name: 'Data',
      component: Data,
      children: [
        {
          path: '/data/auth',
          name: 'Auth',
          component: Auth
        },
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
        {
          path: '/data/map',
          name: 'Bmap',
          component: Bmap
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
      path: '/map_client',
      name: 'BmapClient',
      component: BmapClient
    }
  ]
})
