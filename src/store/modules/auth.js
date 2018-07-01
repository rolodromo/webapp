import { get } from 'lodash'

import * as auth from '../../modules/api/auth'
import * as auth0 from '../../modules/auth/auth0'
import * as generators from '../../modules/api/generators'
import * as me from '../../modules/api/me'

import * as storage from '../../modules/storage/auth'

const DEFAULT_STATE = {
  returnUrl: '/',
  user: {
    profile: {
      name: 'Anonimo',
      picture: null,
      id: null
    },
    token: null
  }
}
const state = { ...DEFAULT_STATE }

const getters = {
  isLogged(state) {
    return !!(state.user && state.user.token)
  },
  isAdmin(state) {
    return get(state.user, 'profile.isAdmin', false)
  },
  userId(state) {
    return get(state.user, 'profile.id', -1)
  },
  returnUrl(state) {
    return state.returnUrl || '/'
  }
}
const mutations = {
  setUserInfo(state, { user, returnUrl }) {
    state.user = user
    state.returnUrl = returnUrl
  }
}

const actions = {
  async startLogin(store, url) {
    await storage.saveReturnUrl(url)
    auth0.startLogin()
  },
  async saveCredentials({ dispatch }, authResult) {
    const profile = await auth.login(authResult.accessToken)
    await storage.saveProfile(profile)
    return dispatch('loadUserInfo')
  },
  async logout({ commit }) {
    await storage.logout()
    commit('setUserInfo', DEFAULT_STATE)
  },
  async loadUserInfo({ commit }) {
    const returnUrl = await storage.getReturnUrl()
    let user = await storage.getUserInfo()
    let accessToken = get(user, 'token.accessToken')
    if (storage.isTokenExpired(accessToken)) {
      const refreshToken = get(user, 'token.refreshToken')
      user = await auth.refresh(refreshToken)
      await storage.saveProfile(user)
      accessToken = user.accessToken
    }
    generators.setAuthToken(accessToken)
    me.setAuthToken(accessToken)
    commit('setUserInfo', { user, returnUrl })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
