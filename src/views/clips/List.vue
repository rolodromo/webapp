<template>
  <v-container fluid grid-list-lg>

    <v-card-title flat class='display-2 font-weight-medium'>
      <i class='gi-sound-waves gi'></i>
      Sonidos
    </v-card-title>
    <v-layout row wrap>
      <v-flex xs12 sm10 md6 lg4 xl3 v-for='sound in sounds' :key='sound.id'>
        <clip-item :element='sound' ></clip-item>
      </v-flex>
    </v-layout>

    <v-card-title flat class='display-2 font-weight-medium'>
      <i class='gi-tied-scroll gi'></i>
      Generadores
    </v-card-title>
    <v-layout row wrap>
      <v-flex xs12 sm10 md6 lg4 xl3 v-for='generator in generators' :key='generator.id'>
        <clip-item :element='generator'></clip-item>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ClipItem from '../../components/clips/ClipItem'

export default {
  name: 'List',
  components: { ClipItem },
  computed: {
    ...mapGetters('clip', {
      sounds: 'sounds',
      generators: 'generators'
    })
  }
}
</script>
