export default {
  state: {
    loading: false,
    error: null
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    setLoading ({ commit }, payload) { // wyswietlanie ladowanoa
      commit('setLoading', payload)
    },
    setError ({ commit }, payload) { // pomylki
      commit('setError', payload)
    },
    clearError ({ commit }) { // usuwanie pomylki
      commit('clearError')
    }
  },
  getters: {
    loading (state) { // otrzymanie statusu ladowania
      return state.loading
    },
    error (state) { // komunikat o pomylce
      return state.error
    }
  }
}
