import Vue from 'vue'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VueAxios from 'vue-axios'
import axios from 'axios'
import BaiduMap from 'vue-baidu-map'

import App from './App'
import createStore from './vuex/store'
import NavHeader from './components/NavHeader'
import NavFooter from './components/NavFooter'
import DriverHeader from '../apps/driver/components/DriverHeader'
import DriverFooter from '../apps/driver/components/DriverFooter'

Vue.config.productionTip = false
Vue.use(iView);
Vue.use(VueAxios, axios);
Vue.use(BaiduMap, { ak: 'OGQnghxuwbYbqcTm3mzrEGQbGVMdv4id' })
Vue.component('nav-header', NavHeader)
Vue.component('nav-footer', NavFooter)
Vue.component('driver-header', DriverHeader)
Vue.component('driver-footer', DriverFooter)

const store = createStore()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
