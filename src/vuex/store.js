import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => {
  return new Vuex.Store({
    state: {
      order_id: '',
      username: '',
      driver: {},
    },
    mutations: {
      updateUserInfo(state, username) {
        state.username = username
      },
      updateDriverInfo(state, dirver) {
        state.dirver = dirver
      },
      updateOrderId(state, order_id) {
        state.order_id = order_id
      },
    }
  })
}
