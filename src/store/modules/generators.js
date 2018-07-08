import { get, pick, pickBy, findIndex } from 'lodash'
import * as api from '../../modules/api/generators'
import * as apiMe from '../../modules/api/me'
import Vue from 'vue'

const EMPTY_GENERATOR = {
  data: {}
}
export const state = {
  current: EMPTY_GENERATOR,
  generatorList: [],
  listFilter: 'all',
  list: []
}
export const mutations = {
  setList(state, { type, list }) {
    state.listFilter = type
    state.list = list
  },
  addLike(state, { id, userId }) {
    const fav = state.list.filter(item => item.id === id)[0]
    Vue.set(fav, 'likes', (fav.likes || []).concat([userId]))
  },
  removeLike(state, { id, userId }) {
    const favIndex = findIndex(state.list, { id })
    if (state.listFilter === 'liked') {
      state.list.splice(favIndex, 1)
      return
    }
    const fav = state.list[favIndex]
    Vue.set(fav, 'likes', (fav.likes || []).filter(id => id !== userId))
  },
  setGenerator(state, generator) {
    state.current = generator.name ? generator : EMPTY_GENERATOR
  },
  setGeneratorList(state, list) {
    state.generatorList = list
  },
  addExternal(state, payload) {
    state.current.data = {
      ...state.current.data,
      alias: {
        ...state.current.data.alias,
        [payload.alias]: payload.id
      }
    }
    state.current.children = {
      ...state.current.children,
      [payload.alias]: payload.content
    }
  },
  removeExternal(state, key) {
    state.current = {
      ...state.current,
      children: pickBy(state.current.children, (v, k) => k !== key),
      data: {
        ...state.current.data,
        alias: pickBy(state.current.data.alias, (v, k) => k !== key)
      }
    }
    console.log('new state', key, state.current)
  }
}
export const getters = {
  isNew(state) {
    return !state.current.id
  },
  authorId(state) {
    return get(state.current, 'author.id')
  }
}

export const actions = {
  setNew({ commit }) {
    commit('setGenerator', {})
  },

  async load({ commit }, id) {
    const generator = await api.loadGenerator(id)
    commit('setGenerator', generator)
  },
  async save({ commit }, payload) {
    let newData

    const data = {
      ...pick(payload, ['name', 'desc']),
      listed: payload.listed,
      data: {
        ...pick(payload.data, ['tpls', 'tables', 'alias'])
      }
    }

    try {
      if (!payload.id) {
        newData = await api.createGenerator(data)
      } else {
        newData = await api.updateGenerator(payload.id, data)
      }
      commit('setGenerator', {
        ...newData
      })
      commit('toast/success', 'Guardado con éxito', { root: true })
      return newData
    } catch (e) {
      console.log(e)
      commit('toast/error', 'Error al guardar', { root: true })
    }
  },
  async remove({ state, commit }) {
    try {
      await api.deleteGenerator(state.current.id)
      commit('toast/success', 'Eliminado con éxito', { root: true })
      return true
    } catch (e) {
      console.log(e)
      commit('toast/error', 'Error al eliminar', { root: true })
      return false
    }
  },
  async loadList({ commit }, type) {
    let list
    switch (type) {
      case 'featured':
        list = await api.loadFeatured()
        break
      case 'owned':
        list = await apiMe.loadOwnGenerators()
        break
      case 'liked':
        list = await apiMe.loadFavoriteGenerators()
        break
      case 'hidden':
        list = await api.loadHidden()
        break
      default:
        list = await api.loadAll()
    }
    commit('setList', { type, list })
  },
  async loadGeneratorList({ state, commit }) {
    if (state.generatorList.length) {
      return state.generatorList
    }
    const names = await api.loadNames()
    commit('setGeneratorList', names)
  },
  async loadExternal({ commit }, payload) {
    const external = await api.loadGenerator(payload.id)
    commit('addExternal', {
      alias: payload.name,
      id: payload.id,
      content: { ...pick(external.data, ['tpls', 'tables']) }
    })
    return external
  },
  async addLike({ commit }, payload) {
    await api.addLike(payload.id)
    commit('addLike', payload)
  },
  async removeLike({ commit }, payload) {
    await api.removeLike(payload.id)
    commit('removeLike', payload)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
