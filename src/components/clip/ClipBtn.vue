<template>
  <div>
    <v-btn
      icon small round dark color='red'
      @click='addClip({ element, type })'
      v-if='!clipped'
      class='mr-2' style='position: absolute; top: 0; right:0; z-index: 2;'>
      <v-icon>add</v-icon>
    </v-btn>
    <v-btn
      icon small round dark color='red lighten-2'
      @click='removeClip({ element, type })'
      v-else
      class='mr-2' style='position: absolute; top: 0; right:0; z-index: 2;'>
      <v-icon>remove</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ClipBtn',
  props: {
    element: Object,
    clipped: Boolean,
    type: String
  },
  methods: {
    ...mapActions('soundboard', {
      addSound: 'addClip',
      removeSound: 'removeClip'
    }),
    addClip({ element, type }) {
      switch (type) {
        case 'sound':
          this.addSound(element)
          break
      }
    },
    removeClip({ element, type }) {
      switch (type) {
        case 'sound':
          this.removeSound(element)
          break
      }
    }
  }
}
</script>

<style scoped>
</style>
