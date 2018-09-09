import Vue from 'vue'
import Router from 'vue-router'

import store from './store'

import baseRoutes from './routes/base'
import clipsRoutes from './routes/clips'
import generatorsRoutes from './routes/generators'
import soundboardRoutes from './routes/soundboard'
import collectionsRoutes from './routes/collections'
import NotFound from './views/NotFound.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    ...baseRoutes,
    ...clipsRoutes,
    ...generatorsRoutes,
    ...soundboardRoutes,
    ...collectionsRoutes,
    {
      path: '*',
      component: NotFound
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth && !store.getters['auth/isLogged'])) {
    store.dispatch('auth/startLogin', to.path)
    next(false)
    return
  }
  next()
})

export default router
