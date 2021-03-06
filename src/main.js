import '@babel/polyfill'
import Vue from 'vue'
import VueWait from 'vue-wait'
import { sync } from 'vuex-router-sync'

import './plugins'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

sync(store, router)

Vue.config.productionTip = false
Vue.config.devtools = true

store.dispatch('auth/loadUserInfo').then(() => {
  new Vue({
    router,
    store,
    render: h => h(App),
    wait: new VueWait({
      useVuex: true
    })
  }).$mount('#app')
})
