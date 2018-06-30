<template>
  <v-container fluid fill-height class='px-2 pt-4 pb-2'>
    <v-slide-x-transition>
      <v-layout justify-center align-center>
        <generator-viewer :generator='content'></generator-viewer>
      </v-layout>
    </v-slide-x-transition>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import GeneratorViewer from '@/components/generator/Viewer.vue'

export default {
  name: 'generator-detail',
  components: { GeneratorViewer },
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
  watch: {
    // call again the method if the route changes
    // $route: 'fetchData'
  },
  created() {
    this.fetchData()
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
