<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm8 md6 lg4 v-for='generator in list' :key='generator.id'>
        <list-item :generator='generator'></list-item>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import * as generators from '../../modules/api/generators'
import ListItem from '@/components/generator/ListItem.vue'

export default {
  name: 'generators-list',
  components: { ListItem },
  props: {
    filter: String
  },
  data() {
    return {
      list: []
    }
  },
  computed: {
    method() {
      switch (this.filter) {
        case 'featured':
          return 'loadFeatured'
        case 'own':
          return 'loadOwnGenerators'
        default:
          return 'loadAll'
      }
    }
  },
  async created() {
    // TODO: Cache? Store?
    this.list = await generators[this.method]()
  },
  methods: {}
}
</script>
