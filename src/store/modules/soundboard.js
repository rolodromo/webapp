import Vue from 'vue'
import { get, omit } from 'lodash'

import { searchSounds } from '../../modules/api/freesound'

import { clipActions } from './clip'

export const state = {
  list: [],
  term: '',
  empty: false,
  searching: false
}

const getters = {}

const mutations = {
  setTerm(state, term) {
    state.term = term
  },
  setSearching(state, val) {
    state.searching = val
  },
  setSearchResult(state, list) {
    Vue.set(state, 'list', list)
    state.empty = state.term && !list.length && !state.searching
  }
}
const actions = {
  async search({ dispatch, commit }, { term, maxDuration, sort }) {
    const query = (term || '').trim()
    if (!query) return

    commit('setTerm', term)
    commit('setSearching', true)
    commit('setSearchResult', [])

    dispatch('wait/start', 'search-sounds', { root: true })

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

    dispatch('wait/end', 'search-sounds', { root: true })
    commit('setSearching', false)
    commit('setSearchResult', list)
  },
  ...clipActions('sound'),

  clear({ commit }) {
    commit('setTerm', '')
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
