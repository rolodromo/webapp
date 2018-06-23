import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dice from './views/Dice.vue'
import Generators from './views/generators/Index.vue'
import GeneratorsList from './views/generators/List.vue'
import GeneratorsFeatured from './views/generators/Featured.vue'
import GeneratorsOwned from './views/generators/Owned.vue'
import GeneratorDetail from './views/generators/Detail.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Callback from './views/Callback.vue'
import NotFound from './views/NotFound.vue'

Vue.use(Router)

export default new Router({
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
      path: '/generadores',
      component: Generators,
      children: [
        {
          path: '',
          name: 'generators',
          component: GeneratorsList
        },
        {
          path: 'destacados',
          name: 'featured',
          component: GeneratorsFeatured
        },
        {
          path: 'propios',
          name: 'owned',
          component: GeneratorsOwned
        }
      ]
    },
    {
      path: '/generadores/:slug/:id',
      name: 'generator-detail',
      component: GeneratorDetail
    },
    {
      path: '/login',
      name: 'login',
      component: Login
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
