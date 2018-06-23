import { pick, pickBy, get } from 'lodash'
import * as api from '../../modules/api/generators'

const getTableNames = tables => `\n${tables}`.match(/\n;([^\n])+\n/gm).map(name => name.replace(/;/, '').trim())

const extractTableNames = generator => {
  let names = getTableNames(generator.data.tables)
  const scopes = Object.keys(generator.children)

  names = scopes.reduce((all, scope) => {
    return all.concat(getTableNames(generator.children[scope].tables).map(name => `${scope}.${name}`))
  }, names)
  return names
}

export const state = {
  current: {},
  local: {},
  names: [],
  tableNames: []
}
export const mutations = {
  setNames(state, names) {
    state.names = names
  },
  set(state, newGenerator) {
    state.current = newGenerator
    state.local = newGenerator
  },
  localMeta(state, data) {
    state.local = {
      ...state.local,
      ...pick(data, ['name', 'desc'])
    }
  },
  localData(state, data) {
    state.local = {
      ...state.local,
      data: {
        ...state.local.data,
        ...pick(data, ['tpls', 'tables', 'alias'])
      }
    }
    state.tableNames = extractTableNames(state.local)
  },
  addExternal(state, payload) {
    state.local.data = {
      ...state.local.data,
      alias: {
        ...state.local.data.alias,
        [payload.alias]: payload.id
      }
    }
    state.local.children = {
      ...state.local.children,
      [payload.alias]: payload.content
    }
  },
  removeExternal(state, key) {
    state.local = {
      ...state.local,
      children: pickBy(state.local.children, (v, k) => k !== key),
      data: {
        ...state.local.data,
        alias: pickBy(state.local.data.alias, (v, k) => k !== key)
      }
    }
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
    const generators = await api.loadGenerator(id)
    commit('set', generators)
    return generators
  },
  async save({ state, commit }, payload) {
    let newData

    const data = {
      ...pick(payload, ['name', 'desc']),
      data: {
        ...pick(payload.data, ['tpls', 'tables', 'alias'])
      }
    }

    try {
      if (!state.current.id) {
        newData = await api.createGenerator(data)
      } else {
        newData = await api.updateGenerator(state.current.id, data)
      }
      commit('set', {
        ...state.local,
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
    } catch (e) {
      console.log(e)
      commit('toast/error', 'Error al eliminar', { root: true })
    }
  },
  async loadNames({ state, commit }) {
    if (state.names.length) {
      return state.names
    }
    const names = await api.loadNames()
    commit('setNames', names)
    return names
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
