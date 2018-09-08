import Vue from 'vue'
import { get, omit, findIndex } from 'lodash'

import { searchSounds } from '../../modules/api/freesound'

export const state = {
  list: [],
  clipped: []
}

const getters = {}

const mutations = {
  setSearchResult(state, list) {
    Vue.set(state, 'list', list)
  },
  clipSound(state, sound) {
    const index = findIndex(state.list, snd => snd.id === sound.id)
    state.list[index].clipped = true

    state.clipped.push(sound)
  },
  removeClip(state, sound) {
    const index = findIndex(state.clipped, snd => snd.id === sound.id)
    state.clipped[index].clipped = false
    state.clipped.splice(index, 1)
  },
  clearClipped(state) {
    state.clipped.forEach(snd => (snd.clipped = false))
    Vue.set(state, 'clipped', [])
  }
}
const actions = {
  clip({ commit }, sound) {
    commit('clipSound', sound)
  },
  removeClip({ commit }, sound) {
    commit('removeClip', sound)
  },
  clearClipped({ commit }) {
    commit('clearClipped')
  },
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
