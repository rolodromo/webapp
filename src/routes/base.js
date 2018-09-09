import store from '../store'

import Home from '../views/Home.vue'
import Dice from '../views/Dice.vue'
import StoryCubes from '../views/StoryCubes.vue'
import About from '../views/About.vue'
import Callback from '../views/Callback.vue'

export default [
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
    path: '/callback',
    component: Callback
  }
]
