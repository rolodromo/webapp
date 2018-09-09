import store from '../store'
import Index from '../views/ViewContainer.vue'
import CollectionList from '../views/soundboard/CollectionList.vue'
import SoundSearch from '../views/soundboard/Search.vue'

export default [
  {
    path: '/soundboard',
    component: Index,
    children: [
      {
        path: '',
        name: 'soundboard',
        component: CollectionList,
        beforeEnter: async (to, from, next) => {
          await store.dispatch('collections/loadCollections', 'sounds')
          next()
        }
      },
      {
        path: 'search',
        name: 'sound-search',
        component: SoundSearch
      }
    ]
  }
]
