import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import generators from './modules/generators'
import toast from './modules/toast'
import soundboard from './modules/soundboard'
import clip from './modules/clip'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    generators,
    toast,
    soundboard,
    clip
  }
})

export default store
