import Vue from 'vue'
import axios, { CancelToken } from 'axios'
import { get, omit } from 'lodash'

export const state = {
  searchResult: [],
  cancelToken: null
}

const getters = {}
const mutations = {
  setCancelToken(state, token) {
    state.cancelToken = token
  },
  setSearchResult(state, list) {
    Vue.set(state, 'list', list)
  }
}
const actions = {
  async search({ state, commit }, { term, maxDuration, sort }) {
    const query = (term || '').trim()
    if (!query) return

    if (state.cancelToken) {
      state.cancelToken.cancel()
    }

    const source = CancelToken.source()
    commit('setCancelToken', source)
    commit('setSearchResult', [])

    // TODO: Move to api module
    const res = await axios
      .get('http://localhost:3000', {
        params: {
          query,
          maxDuration,
          sort
        },
        cancelToken: source.token
      })
      .then(res => res.data)
      .catch(thrown => {
        if (axios.isCancel(thrown)) return
        throw thrown
      })

    const list = get(res, 'results', []).map(sound => {
      return {
        ...omit(sound, ['previews']),
        src: [
          sound.previews['preview-lq-ogg'],
          sound.previews['preview-lq-mp3'],
          sound.previews['preview-hq-ogg'],
          sound.previews['preview-hq-mp3']
        ]
      }
    })

    commit('setSearchResult', list)
    commit('setCancelToken', null)
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
