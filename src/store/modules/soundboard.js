import Vue from 'vue'
import { findIndex, get, omit } from 'lodash'

import { searchSounds } from '../../modules/api/freesound'

export const state = {
  list: []
}

const getters = {}

const mutations = {
  markClipped(state, sound) {
    const index = findIndex(state.list, snd => snd.id === sound.id)

    state.list[index].clipped = true
    Vue.set(state.list, index, state.list[index])
  },
  unmarkClipped(state, sound) {
    const index = findIndex(state.list, snd => snd.id === sound.id)
    state.list[index].clipped = false
    Vue.set(state.list, index, state.list[index])
  },
  setSearchResult(state, list) {
    Vue.set(state, 'list', list)
  }
}
const actions = {
  async search({ commit }, { term, maxDuration, sort }) {
    const query = (term || '').trim()
    if (!query) return

    commit('setSearchResult', [])

    const res = await searchSounds({ query, maxDuration, sort })

    const list = get(res, 'results', []).map(sound => {
      return {
        ...omit(sound, ['previews']),
        src: [
          sound.previews['preview-hq-ogg'],
          sound.previews['preview-hq-mp3'],
          sound.previews['preview-lq-ogg'],
          sound.previews['preview-lq-mp3']
        ]
      }
    })

    commit('setSearchResult', list)
  },
  addClip({ commit, dispatch }, sound) {
    commit('markClipped', sound)
    return dispatch('clip/add', { obj: sound, id: sound.id, type: 'sound' }, { root: true })
  },
  removeClip({ commit, dispatch }, sound) {
    commit('unmarkClipped', sound)
    return dispatch('clip/remove', { id: sound.id, type: 'sound' }, { root: true })
  },
  clear({ commit }) {
    commit('setSearchResult', [])
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
