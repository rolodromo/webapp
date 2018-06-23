<template>
  <v-app id='rolodromo'>
    <v-navigation-drawer
      app
      clipped
      v-model='drawer'
      class='grey lighten-4'
    >
      <rol-menu />
    </v-navigation-drawer>
    <v-toolbar color='primary white--text' app fixed  dense justify-center align-center>
      <v-toolbar-side-icon color='white--text' @click.native='drawer = !drawer'>
        <logo size='small'/>
      </v-toolbar-side-icon>
      <span class='title ml-3 mr-5'> {{ title }}</span>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height class='grey lighten-4' pa-1>
        <transition>
          <router-view></router-view>
        </transition>
      </v-container>
    </v-content>
    <toast/>
  </v-app>
</template>

<script>
import RolMenu from '@/components/layout/Menu.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    RolMenu
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      title: 'Rolodromo.com'
    }
  },
  created() {
    this.loadUserInfo()
  },
  methods: {
    ...mapActions('auth', ['loadUserInfo'])
  }
}
</script>
