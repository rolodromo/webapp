<template>
  <v-list dense>
    <v-subheader>Secciones</v-subheader>

    <v-list-tile :to='{name: "home" }' router ripple>
      <v-list-tile-action>
        <v-icon>home</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Inicio</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-list-tile :to='{name: "generators"}' router>
      <v-list-tile-action>
        <v-icon>star</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Generadores</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>


    <v-list-tile :to='{name: "soundboard"}' router>
      <v-list-tile-action>
        <v-icon>library_music</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Sonidos</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-list-tile :to='{name: "dice"}' router>
      <v-list-tile-action>
        <v-icon>widgets</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Rolodromo</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-list-tile :to='{name: "about"}' router>
      <v-list-tile-action>
        <v-icon>info_outline</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Acerca de</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-divider light/>
    <v-subheader>Ajustes</v-subheader>

    <v-list-tile :to='{name: "login"}' router v-if='!isLogged'>
      <v-list-tile-action>
        <icon name='sign-in' scale='1.15'></icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Entrar</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-list-tile v-if='isLogged' @click.native='logout'>
      <v-list-tile-action>
        <icon name='sign-out' flip='horizontal' scale='1.15'></icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Salir</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'rol-menu',
  computed: {
    ...mapGetters({
      isLogged: 'auth/isLogged'
    })
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    })
  }
}
</script>
