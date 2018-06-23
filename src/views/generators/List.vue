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
  data() {
    return {
      list: []
    }
  },
  async created() {
    this.list = await generators.loadAll()
    console.log('list', this.list)
  },
  methods: {}
}
</script>
