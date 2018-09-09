import Vue from 'vue'
import { get, omit } from 'lodash'

import { searchSounds } from '../../modules/api/freesound'

import { clipActions } from './clip'

export const state = {
  list: []
}

const getters = {}

const mutations = {
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

  ...clipActions('sound'),

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
