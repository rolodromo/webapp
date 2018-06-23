<template>

  <v-container fill-height>
    <v-slide-x-transition>
      <v-layout column align-center>
        <div>
          Detalle - {{$route.params.slug}} - {{$route.params.id}}

        </div>
      </v-layout>
    </v-slide-x-transition>
  </v-container>
</template>

<script>
export default {
  name: 'generatorDetail',
  components: {},
  methods: {}
}
</script>
