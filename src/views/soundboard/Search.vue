<template>
  <v-container fluid grid-list-md>

    <search-options></search-options>
    <spinner dark size='150'></spinner>
    <search-list></search-list>

  </v-container>
</template>
<script>
import SearchOptions from '@/components/soundboard/SearchOptions.vue'
import SearchList from '@/components/soundboard/SearchList.vue'
import Spinner from '@/components/common/Spinner'

import { mapActions } from 'vuex'

export default {
  components: {
    SearchOptions,
    SearchList,
    Spinner
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
