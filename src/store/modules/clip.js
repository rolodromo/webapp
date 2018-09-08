import Vue from 'vue'

export const state = {
  clipped: {}
}

const getters = {}

const mutations = {
  addClip(state, { obj, id, type }) {
    Vue.set(state.clipped, `${type}/${id}`, { type, ...obj })
  },
  removeClip(state, { id, type }) {
    Vue.delete(state.clipped, `${type}/${id}`)
  },
  clear(state) {
    Vue.set(state, 'clipped', {})
  }
}
const actions = {
  add({ commit }, obj) {
    commit('addClip', obj)
  },
  remove({ commit }, obj) {
    commit('removeClip', obj)
  },
  clear({ commit }) {
    commit('clear')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
