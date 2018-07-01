import { get, pick } from 'lodash'
import * as api from '../../modules/api/generators'
import * as apiMe from '../../modules/api/me'

export const state = {
  current: {},
  local: {},
  names: [],
  tableNames: [],
  list: []
}
export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setGenerator(state, generator) {
    state.current = generator
  }
}
export const getters = {
  isNew(state) {
    return !state.current.id
  },
  authorId(state) {
    return get(state.current, 'author.id')
  },
  canEdit(state, getters, rootState, rootGetters) {
    const isLogged = rootGetters['auth/isLogged']
    const isAdmin = rootGetters['auth/isAdmin']

    if (!isLogged) return false
    if (isAdmin || getters.isNew) return true

    const loggedUserId = rootGetters['auth/userId']
    const authorId = getters['authorId']

    return authorId === loggedUserId
  }
}

export const actions = {
  async load({ commit }, id) {
    const generator = await api.loadGenerator(id)
    commit('setGenerator', generator)
    return generator
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
      // case 'liked':
      //   list = await api.loadLikedGenerators()
      //   break
      default:
        list = await api.loadAll()
    }
    commit('setList', list)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
