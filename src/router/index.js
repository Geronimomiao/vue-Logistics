import Vue from 'vue'
import Router from 'vue-router'

import Data from '../../apps/user/views/Data'
import Detail from '../../apps/user/components/Detail'
import ShowData from '../../apps/user/components/ShowData'
import Bmap from '../../apps/user/components/Bmap'
import Auth from '../../apps/user/components/Auth'

import Admin from '../../apps/admin/views/Admin'
import Index from '../../apps/admin/components/index'
import AdminAuth from '../../apps/admin/components/Auth'
import AdminDetail from '../../apps/admin/components/Detail'
import AdminShowData from '../../apps/admin/components/ShowData'
import AdminBmap from '../../apps/admin/components/Bmap'


import Driver from '../../apps/driver/views/driver'
import BmapClient from '../../apps/driver/components/BmapClient'
import DriverClientOne from '../../apps/driver/components/DriverClientOne'
import DriverClientTwo from '../../apps/driver/components/DriverClientTwo'
import Login from '../../apps/driver/components/Login'


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
        {
          path: '/admin/auth',
          name: 'AdminAuth',
          component: AdminAuth
        },
        {
          path: '/admin/show',
          name: 'AdminShowData',
          component: AdminShowData,
          meta: {keepAlive: true},
        },
        {
          path: '/admin/detail',
          name: 'AdminDetail',
          component: AdminDetail,
        },
        {
          path: '/admin/map',
          name: 'AdminBmap',
          component: AdminBmap
        },
      ]
    },

    {
      path: '/driver',
      name: 'Driver',
      component: Driver,
      children: [
        {
          path: '/driver/index',
          name: 'BmapClient',
          component: BmapClient
        },
        {
          path: '/driver/one',
          name: 'DriverClientOne',
          component: DriverClientOne
        },
        {
          path: '/driver/two',
          name: 'DriverClientTwo',
          component: DriverClientTwo
        },
        {
          path: '/driver/login',
          name: 'Login',
          component: Login
        },
      ]
    },

  ]
})
