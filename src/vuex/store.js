import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => {
  return new Vuex.Store({
    state: {
      username: ''
    },
    mutations: {
      updateUserInfo(state, username) {
        state.username = username
      },
    }
  })
}
