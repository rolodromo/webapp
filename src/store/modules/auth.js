import { get } from 'lodash'

import * as auth from '../../modules/api/auth'
import * as auth0 from '../../modules/auth/auth0'
import * as generators from '../../modules/api/generators'
import * as me from '../../modules/api/me'

import * as storage from '../../modules/auth/storage'

const state = {
  user: {
    profile: {
      name: 'Anonimo',
      picture: null,
      id: null
    },
    token: null
  }
}

const getters = {
  isLogged(state) {
    return !!(state.user && state.user.token)
  },
  isAdmin(state) {
    return get(state.user, 'profile.isAdmin', false)
  },
  userId(state) {
    return get(state.user, 'profile.id', -1)
  }
}
const mutations = {
  setUserInfo(state, userInfo) {
    state.user = userInfo
  }
}

const actions = {
  startLogin() {
    auth0.startLogin()
  },
  async saveCredentials({ dispatch }, authResult) {
    await storage.saveIdToken(authResult.idToken)
    const profile = await auth.login(authResult.accessToken)
    console.log('SAVING PROFLE', profile)
    await storage.saveProfile(profile)
    return dispatch('loadUserInfo')
  },
  async logout({ commit }) {
    await storage.logout()
    commit('setUserInfo', { profile: {}, token: null })
  },
  async loadUserInfo({ commit }) {
    const userInfo = await storage.getUserInfo()
    generators.setAuthToken(get(userInfo, 'token.accessToken'))
    me.setAuthToken(get(userInfo, 'token.accessToken'))
    commit('setUserInfo', userInfo)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
