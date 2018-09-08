<template>
  <v-container fluid grid-list-md>
    <v-layout align-center justify-center justify-content-center>
      <story-cubes-viewer :generator='generator'></story-cubes-viewer>
    </v-layout>
  </v-container>
</template>

<script>
import StoryCubesViewer from '@/components/storycubes/Viewer.vue'
import { mapState } from 'vuex'

export default {
  name: 'Storycubes',
  metaInfo: {
    title: 'Storycubes'
  },
  components: {
    StoryCubesViewer
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('generators', {
      generator: 'current'
    })
  },
  methods: {}
}
</script>
<style scoped>
</style>
