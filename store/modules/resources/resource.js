import Vue from 'vue'

export const state = () => ({
  listResources: [],
  dataLoading: false,
  questions: [],
})

export const mutations = {
  SET_LIST_RESOURCES(state, data) {
    if (data.length > 0) {
      state.listResources = data
      state.listResources.map(r => {
        // r.dataBody = []
        r.questionnaires.map(item => {
          if (item.solved && item.solved !== true) {
            item.solved = false
          }
        })
      })
      state.dataLoading = false
    } else {
      state.dataLoading = true
    }
  },
  SET_QUESTIONS(state, data){
    if (data.length > 0){
      state.questions = data
    }
  },
  CLEAR_DATA(state) {
    state.listResources = []
  },
  CLEAR_DATA_QUESTIONS(state) {
    state.questions = []
  }
}

export const actions = {
  async getResource({commit, state}, valuationId) {
    try {
      const response = await this.$axios.get(`/api/v1/get-list-resources/${valuationId}`)
      console.log(response)
      if (response && response.data.data && response.data.data.length > 0) {
        commit('SET_LIST_RESOURCES', response.data.data)
        return true
      } else {
        commit('CLEAR_DATA')
        // commit('notData')
        console.log('No se encontraron recursos')
        return false
      }
    } catch (error) {
      commit('CLEAR_DATA')
      // commit('notData')
      return false
    }
  },
  async answerQuestionResource({commit, state}, data) {

    try {
      const response = await this.$axios.get(`/api/v1/get-answer-resources/${JSON.stringify(data)}`)
      commit('SET_QUESTIONS', response.data.data)
      return response
    } catch (error) {
      console.log(error)
      return false
    }
  },
  async clearDataQuestions({commit, state}){
    commit('CLEAR_DATA_QUESTIONS')
  },
  async sendResource({commit, state}, resource) {
    let resp
    try {
      resp = await this.$axios.post(
        `/api/v1/send-resource-patient`,
        resource
      )
      console.log('ESTADO RESPUESTA ', resp.status)
      if (resp.status === 200) {
        return resp = true
      } else {
        return resp = false
      }
    } catch (e) {
      console.log('ERROR', e)
      return resp = false
    }
  }
}

export const getters = {}
