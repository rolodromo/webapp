<template>
  <v-container fluid grid-list-md fill-height >
    <v-layout row wrap align-content-start>

      <v-flex xs12>
        <v-toolbar dense dark class='secondary' flat>
          <v-toolbar-title class='title font-weight-bold pa-0 ma-0'>
            Collección "{{ collection.name }}"
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <selector-menu :collection='collection'></selector-menu>
        </v-toolbar>

      </v-flex>
      <v-flex xs12 sm10 md6 lg4 xl3 v-for='(sound, i) in activeSounds' :key='i'>
        <audio-player :name='sound.name' :preload='false' :sources='sound.src' :loop='true'/>
      </v-flex>

    </v-layout>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import SelectorMenu from '@/components/collections/Menu'

export default {
  components: {
    SelectorMenu
  },
  metaInfo() {
    return {
      title: `Colleccion "${this.collection.name}"`
    }
  },
  computed: {
    ...mapState('collections', {
      collection: 'collection'
    }),
    activeSounds() {
      return Object.values(this.collection.items).filter(snd => snd.src)
    }
  }
}
</script>
