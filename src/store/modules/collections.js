import { keyBy, pick } from 'lodash'

import { cleanName } from '../../modules/api/freesound'
import {
  loadCollection,
  listByType,
  createCollection,
  renameCollection,
  deleteCollection
} from '../../modules/api/collections'

const ALLOWED_TYPES = ['sound', 'dice', 'generator']
const PICK_FIELDS = {
  sound: ['id', 'name', 'src', 'tag', 'url']
}
export const state = {
  type: '',
  list: [],
  collection: null
}

const getters = {}

const mutations = {
  reset(state) {
    state.collection = null
    state.list = []
    state.type = ''
  },
  setCollection(state, collection) {
    state.collection = collection
  },
  setList(state, { type, list }) {
    state.type = type
    state.list = list
  },
  renameCollection(state, { name, desc }) {
    state.collection.name = name
    state.collection.desc = desc
  }
}
const actions = {
  async createCollection({ commit }, { name, desc, type, items }) {
    if (!ALLOWED_TYPES.includes(type)) {
      throw new Error(`Unknown type ${type}"`)
    }
    const newList = items.map(item => {
      const filtered = pick(item, PICK_FIELDS[type])
      if (type === 'sound') {
        return cleanName(filtered)
      }
      return filtered
    })
    const formattedItems = keyBy(newList, item => `${type}/${item.id}`)
    try {
      const newCol = await createCollection({ name, desc, type, items: formattedItems })
      commit('toast/success', 'Guardado con éxito', { root: true })
      return newCol
    } catch (e) {
      console.log(e)
      commit('toast/error', 'Error al guardar', { root: true })
      return false
    }
  },
  async renameCollection({ commit }, { id, name, desc }) {
    try {
      const newCol = await renameCollection({ id, name, desc })
      commit('renameCollection', { name, desc })
      commit('toast/success', 'Guardado con éxito', { root: true })
      return newCol
    } catch (e) {
      console.log(e)
      commit('toast/error', 'Error al guardar', { root: true })
      return false
    }
  },
  async deleteCollection({ commit }, id) {
    try {
      await deleteCollection(id)
      commit('toast/success', 'Eliminado con éxito', { root: true })
      return true
    } catch (e) {
      console.log(e)
      commit('toast/error', 'Error al eliminar', { root: true })
      return false
    }
  },
  async loadCollections({ commit }, type) {
    if (!ALLOWED_TYPES.includes(type)) {
      throw new Error(`Unknown type ${type}"`)
    }

    const list = await listByType(type)

    commit('setList', { type, list })
  },
  async loadCollection({ commit }, id) {
    const collection = await loadCollection(id)

    commit('setCollection', collection)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
