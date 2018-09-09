import store from '../store'

import CollectionDetail from '../views/soundboard/CollectionDetail.vue'

export default [
  {
    path: '/colecciones/sonidos/:slug/:id',
    name: 'collection-detail',
    component: CollectionDetail,
    props: true,
    beforeEnter: async (to, from, next) => {
      await store.dispatch('collections/loadCollection', to.params.id)
      next()
    }
  }
]
