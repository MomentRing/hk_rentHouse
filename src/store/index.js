import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    cityNameNow: '北京',
    cityCode: 'AREA|88cff55c-aaa4-e2e0',
    area: '',
    subway: '',
    rentType: null,
    price: null,
    more: '',
    roomType: '',
    oriented: '',
    characteristic: '',
    floor: ''
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload.data.body
    },
    clearToken (state, payload) {
      state.user = {}
    },
    setCityName (state, payload) {
      state.cityNameNow = payload
    },
    setCityCode (state, payload) {
      state.cityCode = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
