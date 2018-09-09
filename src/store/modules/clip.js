import Vue from 'vue'
import { has, filter } from 'lodash'

export const state = {
  clipped: {}
}

const getters = {
  isClipped: state => (id, type) => has(state.clipped, `${type}/${id}`),
  sounds(state) {
    return filter(state.clipped, { type: 'sound' })
  },
  generators(state) {
    return filter(state.clipped, { type: 'generator' })
  }
}

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

export const clipActions = type => {
  return {
    addClip({ dispatch }, obj) {
      return dispatch('clip/add', { obj, id: obj.id, type }, { root: true })
    },
    removeClip({ dispatch }, obj) {
      return dispatch('clip/remove', { id: obj.id, type }, { root: true })
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
