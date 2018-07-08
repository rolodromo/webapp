<template>
  <v-container fluid fill-height class='px-2 pt-4 pb-2'>
    <v-slide-x-transition>
      <v-layout row wrap justify-center align-center>
        <generator-viewer :generator='generator'></generator-viewer>
      </v-layout>
    </v-slide-x-transition>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import GeneratorViewer from '@/components/generator/Viewer.vue'

export default {
  name: 'generator-detail',
  metaInfo() {
    return {
      title: `Generador "${this.generator.name || ''}"`
    }
  },
  components: {
    GeneratorViewer
  },
  props: {
    slug: String,
    id: String
  },
  computed: {
    ...mapGetters('auth', ['isLogged']),
    ...mapState('generators', {
      generator: 'current'
    })
  }
}
</script>
