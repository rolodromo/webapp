<template>
  <v-container fluid class='dados' grid-list-md>

    <v-flex xs12 text-xs-left pb-3>
      <v-layout row fluid align-baseline>
        <v-spacer></v-spacer>
        <v-btn color='red' dark icon :to='{ name: "sound-search" }'>
          <v-icon>search</v-icon>
        </v-btn>
      </v-layout>
    </v-flex>

    <v-layout row wrap justify-space-between>

      <v-flex xs12 sm10 md6 lg4 xl3 v-for='collection in collections' :key='collection.id'>
        <list-item :collection='collection'></list-item>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ListItem from '@/components/collections/ListItem.vue'

export default {
  name: 'CollectionList',
  components: { ListItem },
  metaInfo: {
    title: 'Colecciones de Sonidos'
  },
  computed: {
    ...mapState('collections', {
      collections: 'list'
    })
  }
}
</script>

<style scoped>
</style>
