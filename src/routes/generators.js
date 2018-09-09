import store from '../store'

import Index from '../views/ViewContainer.vue'
import GeneratorsList from '../views/generators/List.vue'
import GeneratorDetail from '../views/generators/Detail.vue'
import GeneratorEdit from '../views/generators/Edit.vue'

export default [
  {
    path: '/generadores',
    component: Index,
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
        meta: {
          auth: true
        },
        beforeEnter: async (to, from, next) => {
          await store.dispatch('generators/load', to.params.id)
          await store.dispatch('generators/loadGeneratorList')
          next()
        }
      }
    ]
  }
]
