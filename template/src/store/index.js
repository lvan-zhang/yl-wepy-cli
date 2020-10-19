import Vuex from '@wepy/x'
import API from '@/api/api'

export default new Vuex.Store({
  state: {
    patientInfo: {}
  },
  mutations: {
    getPatientInfo (state, data) {
      state.patientInfo = data
    }
  },
  actions: {
    async getPatientInfo ({ commit }) {
      const res = await API.getPatientInfo()
      if (res.success) {
        commit('getPatientInfo', res.data)
      }
    }
  }
})
