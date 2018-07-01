<template>
  <v-container fluid fill-height class='px-2 pt-4 pb-2'>
    <v-slide-x-transition>
      <v-layout justify-center align-center>
        <generator-editor :generator='content'></generator-editor>
      </v-layout>
    </v-slide-x-transition>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import GeneratorEditor from '@/components/generator/Editor.vue'

export default {
  name: 'generator-edit',
  components: { GeneratorEditor },
  props: {
    slug: String,
    id: String
  },
  data() {
    return {
      loading: false,
      content: {},
      error: null
    }
  },
  computed: {
    ...mapGetters('auth', ['isLogged'])
  },
  created() {
    if (this.id) {
      this.fetchData()
    }
  },
  methods: {
    ...mapActions({
      loadGenerator: 'generators/load'
    }),
    async fetchData() {
      this.error = null
      this.loading = true
      try {
        this.content = await this.loadGenerator(this.id)
        this.loading = false
      } catch (e) {
        this.error = e
      }
    }
  }
}
</script>
