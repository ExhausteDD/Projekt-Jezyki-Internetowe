export default {
  state: {
    tags: [
      {
        title: 'Komedia',
        use: false
      },
      {
        title: 'Horror',
        use: false
      },
      {
        title: 'Dramat',
        use: false
      },
      {
        title: 'Fantastyka',
        use: false
      },
      {
        title: 'Western',
        use: false
      }
    ]
  },
  mutations: {
    newTag (state, payload) {
      state.tags.push(payload)
    }
  },
  actions: {
    newTag ({ commit }, payload) {
      commit('newTag', payload)
    }
  },
  getters: {
    tags (state) {
      return state.tags
    }
  }
}
