import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import moduleA from './modules/moduleA'

Vue.use(Vuex)

const state = {
  animeMessage: [],
}
const store = new Vuex.Store({
  state,
  mutations,
  getters,
  //在进行异步操作时要先经过actions，然后传入mutations进行处理
  actions,
  modules: {
    A: moduleA
  }
})

export default store