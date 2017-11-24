/**
 * Created by Zhanghao on 28/08/2017.
 */
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
})

export default store
