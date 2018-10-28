<template>
  <v-navigation-drawer
    right
    disable-resize-watcher
    temporary
    hide-overlay
    fixed
    v-model='openDrawer'
    :input='$emit("update:drawer", openDrawer)'
    class='grey lighten-4'
  >
    <v-card tile flat class='pa-0 ma-0'>
      <v-img
        src='/img/menu_background.jpg'
        height='150px'>
        <v-container fill-height pa-0>
          <v-layout align-start>
            <v-flex xs10 pa-3 class='text-xs-left'>
              <v-avatar size='46px'>
                <img :src='userAvatar' v-if='userAvatar'/>
                <v-icon dark size='46px' v-else>account_circle</v-icon>
              </v-avatar>
            </v-flex>
            <v-flex xs1>
              <v-btn dark icon big @click.stop='openDrawer = !openDrawer'>
                <v-icon>close</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-img>
    </v-card>
    <v-list dense router id='menu'>
      <v-subheader>Secciones</v-subheader>

      <v-list-tile :to='{name: "home"}'>
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Inicio</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile :to='{name: "generators"}'>
        <v-list-tile-action>
          <v-icon>star</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Generadores</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile :to='{name: "storycubes"}'>
        <v-list-tile-action>
          <i class='gi gi-rolling-dice-cup gi-2x gi-menu'></i>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Storycubes</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile :to='{name: "soundboard"}'>
        <v-list-tile-action>
          <v-icon>library_music</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Sonidos</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile :to='{name: "dice"}'>
        <v-list-tile-action>
          <v-icon>widgets</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Rolodromo</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile :to='{name: "clips"}'>
        <v-list-tile-action>
          <icon name='paperclip'></icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Recortes</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile :to='{name: "about"}'>
        <v-list-tile-action>
          <v-icon>info_outline</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Acerca de</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider light/>
      <v-subheader>Ajustes</v-subheader>

      <v-list-tile @click.native.stop='login' v-if='!isLogged' href='/'>
        <v-list-tile-action>
          <icon name='sign-in-alt'></icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Entrar</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile v-if='isLogged' @click.native.stop='logout' href='/'>
        <v-list-tile-action>
          <icon name='sign-out-alt' flip='horizontal'></icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Salir</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'RolMenu',
  props: {
    drawer: Boolean
  },
  data() {
    return {
      openDrawer: false
    }
  },
  computed: {
    ...mapGetters({
      isLogged: 'auth/isLogged',
      userAvatar: 'auth/userAvatar'
    })
  },
  watch: {
    drawer(newVal) {
      this.openDrawer = newVal
    }
  },
  methods: {
    ...mapActions({
      doLogout: 'auth/logout',
      startLogin: 'auth/startLogin'
    }),
    login() {
      this.startLogin(window.location.pathname)
    },
    async logout() {
      await this.doLogout()
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
#menu .gi {
  margin: 0;
  padding-left: 0.1em;
  width: 1em;
}
</style>
