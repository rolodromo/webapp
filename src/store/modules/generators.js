import { pick, pickBy, get } from 'lodash'
import * as api from '../../modules/api/generators'
import * as apiMe from '../../modules/api/me'

const EMPTY_GENERATOR = {
  data: {}
}
export const state = {
  current: EMPTY_GENERATOR,
  tableNames: [],
  list: []
}
export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setGenerator(state, generator) {
    state.current = generator.name ? generator : EMPTY_GENERATOR
  },
  setTableNames(state, names) {
    state.tableNames = names
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
      default:
        list = await api.loadAll()
    }
    commit('setList', list)
  },
  async loadTableNames({ state, commit }) {
    if (state.tableNames.length) {
      return state.tableNames
    }
    const names = await api.loadNames()
    commit('setTableNames', names)
  },
  async loadExternal({ commit }, payload) {
    const external = await api.loadGenerator(payload.id)
    commit('addExternal', {
      alias: payload.name,
      id: payload.id,
      content: { ...pick(external.data, ['tpls', 'tables']) }
    })
    return external
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
