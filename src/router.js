import Vue from 'vue'
import Router from 'vue-router'

import store from './store'
import Home from './views/Home.vue'
import Dice from './views/Dice.vue'
import StoryCubes from './views/StoryCubes.vue'
import GeneratorsIndex from './views/generators/Index.vue'
import GeneratorsList from './views/generators/List.vue'
import GeneratorDetail from './views/generators/Detail.vue'
import GeneratorEdit from './views/generators/Edit.vue'
import SoundboardIndex from './views/soundboard/Index.vue'
import SoundList from './views/soundboard/List.vue'
import SoundSearch from './views/soundboard/Search.vue'
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
      path: '/acerca',
      name: 'about',
      component: About
    },
    {
      path: '/storycubes',
      name: 'storycubes',
      component: StoryCubes,
      props: true,
      beforeEnter: async (to, from, next) => {
        await store.dispatch('generators/load', 'r1yvGJa1-')
        next()
      }
    },
    {
      path: '/soundboard',
      component: SoundboardIndex,
      children: [
        {
          path: '',
          name: 'soundboard',
          component: SoundList
        },
        {
          path: 'search',
          name: 'sound-search',
          component: SoundSearch
        }
      ]
    },
    {
      path: '/generadores',
      component: GeneratorsIndex,
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
          path: 'ocultos',
          name: 'generators-hidden',
          component: GeneratorsList,
          props: {
            filter: 'hidden'
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
            await store.dispatch('generators/loadGeneratorList')
            next()
          }
        },
        {
          path: ':slug/:id',
          name: 'generator-detail',
          component: GeneratorDetail,
          props: true,
          beforeEnter: async (to, from, next) => {
            await store.dispatch('generators/load', to.params.id)
            next()
          }
        },
        {
          path: ':slug/:id/edit',
          name: 'generator-edit',
          component: GeneratorEdit,
          props: true,
          beforeEnter: async (to, from, next) => {
            await store.dispatch('generators/load', to.params.id)
            await store.dispatch('generators/loadGeneratorList')
            next()
          },
          meta: {
            auth: true
          }
        }
      ]
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
