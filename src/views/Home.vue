<template>
  <v-container fluid fill-height >
    <v-slide-x-transition>
      <v-layout column align-center justify-center >
        <logo size='big' class='mt-3 mb-3'/>
        <HelloWorld msg='Bienvenido a Rolodromo.com'/>

      </v-layout>
    </v-slide-x-transition>
  </v-container>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
