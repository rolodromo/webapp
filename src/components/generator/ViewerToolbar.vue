<template>
  <v-toolbar flat dense extended color='secondary'>
    <v-toolbar-side-icon>
      <v-btn small icon dark @click='$router.back()'>
        <icon name='arrow-circle-left' scale='2'></icon>
      </v-btn>
    </v-toolbar-side-icon>
    <v-toolbar-title slot='extension' class='white--text'>{{ name }}</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn dark icon v-if='isLogged' :to='{ name: "generator-edit" }'>
      <v-icon>edit</v-icon>
    </v-btn>
    <!--  <v-menu offset-y left>
        <v-btn dark icon slot='activator'>
          <v-icon>menu</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile>
            <v-list-tile-title>m1 </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>-->

  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ViewerToolbar',
  props: {
    name: String
  },
  computed: {
    ...mapGetters('auth', ['isLogged'])
  }
}
</script>

<style scoped>
</style>
