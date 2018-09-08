<template>
  <v-container fluid grid-list-md>

    <search-options></search-options>
    <search-list></search-list>

  </v-container>
</template>
<script>
import SearchOptions from '@/components/soundboard/SearchOptions.vue'
import SearchList from '@/components/soundboard/SearchList.vue'

import { mapActions } from 'vuex'

export default {
  components: {
    SearchOptions,
    SearchList
  },
  metaInfo: {
    title: 'Buscar Sonidos'
  },
  methods: {
    ...mapActions('soundboard', ['clear'])
  },
  beforeRouteLeave(to, from, next) {
    this.clear()
    next()
  }
}
</script>
