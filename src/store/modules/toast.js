const DEFAULT_TOAST = {
  message: '',
  top: true,
  bottom: false,
  type: 'success',
  timeout: 2000
}

export const state = {
  data: DEFAULT_TOAST
}

export const mutations = {
  success(state, message) {
    state.data = {
      ...state.data,
      type: 'success',
      show: true,
      message
    }
  },
  error(state, message) {
    state.data = {
      ...state.data,
      type: 'error',
      show: true,
      message
    }
  },
  show(state, payload) {
    state.data = {
      ...state.data,
      show: true,
      ...payload
    }
  },
  hide(state) {
    state.data = DEFAULT_TOAST
  }
}

export default {
  namespaced: true,
  getters: {},
  actions: {},
  state,
  mutations
}
