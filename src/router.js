import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dice from './views/Dice.vue'
import Generators from './views/Generators.vue'
import Login from './views/Login.vue'
import Callback from './views/Callback.vue'

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
      path: '/generadores',
      name: 'generators',
      component: Generators
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/callback',
      component: Callback
    }
  ]
})
