import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => {
  return new Vuex.Store({
    state: {
      user: {}
    },
    mutations: {
      updateUserInfo(state, user) {
        state.user = user
      },
    }
  })
}
