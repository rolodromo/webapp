<template>
  <div>
    <v-btn
      icon small round dark color='red'
      @click.prevent='addClip({ element, type })'
      v-if='!isClipped(element.id, type)'
      class='mr-2' style='position: absolute; top: 0; right:0; z-index: 2;'>
      <v-icon>add</v-icon>
    </v-btn>
    <v-btn
      icon small round dark color='red lighten-2'
      @click.prevent='removeClip({ element, type })'
      v-else
      class='mr-2' style='position: absolute; top: 0; right:0; z-index: 2;'>
      <v-icon>remove</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ClipBtn',
  props: {
    element: Object,
    clipped: Boolean,
    type: String
  },
  computed: {
    ...mapGetters('clip', ['isClipped'])
  },
  methods: {
    ...mapActions('soundboard', {
      addSound: 'addClip',
      removeSound: 'removeClip'
    }),
    ...mapActions('generators', {
      addGenerator: 'addClip',
      removeGenerator: 'removeClip'
    }),
    addClip({ element, type }) {
      switch (type) {
        case 'sound':
          this.addSound(element)
          break
        case 'generator':
          this.addGenerator(element)
          break
      }
    },
    removeClip({ element, type }) {
      switch (type) {
        case 'sound':
          this.removeSound(element)
          break
        case 'generator':
          this.removeGenerator(element)
          break
      }
    }
  }
}
</script>

<style scoped>
</style>
