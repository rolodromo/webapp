<template>
  <v-layout row wrap justify-space-between>
    <v-flex xs12 sm6 lg4 xl3 :key='sound.id' class='pb-2 px-1' style='position: relative;' v-for='sound in searchList'>

      <clip-btn
        :element='sound'
        :clipped='sound.clipped'
        type='sound'
      />

      <audio-player
        :name='sound.name'
        :sduration='sound.duration'
        :sources='sound.src'
        :preload='false'
        :loop='false'
      />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

import ClipBtn from '@/components/clip/ClipBtn'

export default {
  components: { ClipBtn },
  computed: {
    ...mapState('soundboard', {
      searchList: 'list'
    })
  }
}
</script>
