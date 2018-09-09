import Index from '../views/ViewContainer.vue'
import SoundList from '../views/soundboard/List.vue'
import SoundSearch from '../views/soundboard/Search.vue'

export default [
  {
    path: '/soundboard',
    component: Index,
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
  }
]
