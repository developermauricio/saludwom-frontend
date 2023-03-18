// import VuexPersistence from 'vuex-persist'
// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })
//
// export const plugins = [vuexLocal.plugin]
export const state = () => ({
  openChatValuation: false,
  valueOpenChatV: null,
})

export const getters = {
  getOpenChatValuation(state) {
    return state.openChatValuation
  }
}
export const actions = {
  async changeStateOpenChatAction(context) {
    // make request
    context.commit('changeStateOpenChat')
  }
}
export const mutations = {
  changeStateOpenChat(state) {
    state.openChatValuation = state.valueOpenChatV
  }
}
