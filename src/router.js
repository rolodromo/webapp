import Vue from 'vue'
import Router from 'vue-router'

import store from './store'
import Home from './views/Home.vue'
import Dice from './views/Dice.vue'
import Generators from './views/generators/Index.vue'
import GeneratorsList from './views/generators/List.vue'
import GeneratorDetail from './views/generators/Detail.vue'
import GeneratorEdit from './views/generators/Edit.vue'
import Soundboard from './views/Soundboard.vue'
import About from './views/About.vue'
import Callback from './views/Callback.vue'
import NotFound from './views/NotFound.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dados',
      name: 'dice',
      component: Dice
    },
    {
      path: '/soundboard',
      name: 'soundboard',
      component: Soundboard
    },
    {
      path: '/acerca',
      name: 'about',
      component: About
    },
    {
      path: '/generadores',
      component: Generators,
      children: [
        {
          path: '',
          name: 'generators',
          component: GeneratorsList,
          props: {
            filter: 'all'
          }
        },
        {
          path: 'destacados',
          name: 'generators-featured',
          component: GeneratorsList,
          props: {
            filter: 'featured'
          }
        },
        {
          path: 'favoritos',
          name: 'generators-liked',
          component: GeneratorsList,
          props: {
            filter: 'liked'
          },
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'propios',
          name: 'generators-owned',
          component: GeneratorsList,
          props: {
            filter: 'owned'
          },
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'nuevo',
          name: 'generator-new',
          component: GeneratorEdit,
          props: true,
          meta: {
            requiresAuth: true
          },
          beforeEnter: async (to, from, next) => {
            await store.dispatch('generators/setNew')
            await store.dispatch('generators/loadTableNames')
            next()
          }
        }
      ]
    },
    {
      path: '/generadores/:slug/:id',
      name: 'generator-detail',
      component: GeneratorDetail,
      props: true,
      beforeEnter: async (to, from, next) => {
        await store.dispatch('generators/load', to.params.id)
        next()
      }
    },
    {
      path: '/generadores/:slug/:id/edit',
      name: 'generator-edit',
      component: GeneratorEdit,
      props: true,
      beforeEnter: async (to, from, next) => {
        await store.dispatch('generators/load', to.params.id)
        await store.dispatch('generators/loadTableNames')
        next()
      },
      meta: {
        auth: true
      }
    },
    {
      path: '/callback',
      component: Callback
    },
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
