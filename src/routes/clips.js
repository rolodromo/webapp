import ViewContainer from '../views/ViewContainer.vue'
import List from '../views/clips/List.vue'

export default [
  {
    path: '/recortes',
    component: ViewContainer,
    children: [
      {
        path: '',
        name: 'clips',
        component: List

      }
    ]
  }
]
