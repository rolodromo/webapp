<template>
  <v-container fluid fill-height class='px-2 pt-4 pb-2'>
    <v-slide-x-transition>
      <v-layout justify-center align-center>
        <generator-editor :generator='generator'></generator-editor>
      </v-layout>
    </v-slide-x-transition>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import GeneratorEditor from '@/components/generator/Editor.vue'

export default {
  name: 'GeneratorEdit',
  metaInfo() {
    return {
      title: `Generador "${this.generator.name || ''}"`
    }
  },
  components: { GeneratorEditor },
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
