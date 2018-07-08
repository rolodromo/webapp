<template>
  <v-layout justify-space-around>

    <v-flex align-content-center>
      <v-btn
        dark
        :block='blockMode'
        :icon='iconMode'
        :class='all?"elevation-1":""'
        :color='all ? "blue lighten-2" : "blue lighten-1"'
        :to='{ name: "generators" }'
      >
        <v-icon :left='blockMode'>list_alt</v-icon>
        <span class='hidden-sm-and-down'>Todos</span>
      </v-btn>
    </v-flex>

    <v-flex align-content-center>
      <v-btn
        dark
        :block='blockMode'
        :icon='iconMode'
        :class='featured?"elevation-1":""'
        :color='featured ? "blue lighten-2" : "blue lighten-1"'
        :to='{ name: "generators-featured" }'
      >
        <v-icon :left='blockMode' color='yellow'>stars</v-icon>
        <span class='hidden-sm-and-down'>Destacados</span>
      </v-btn>
    </v-flex>

    <v-flex align-content-center>
      <v-btn
        :dark='isLogged'
        :disabled='!isLogged'
        :block='blockMode'
        :icon='iconMode'
        :class='liked?"elevation-1":""'
        :color='liked ? "blue lighten-2" : "blue lighten-1"'
        :to='{ name: "generators-liked" }'
      >
        <v-icon :left='blockMode' color='red'>favorite</v-icon>
        <span class='hidden-sm-and-down'> Favoritos</span>
      </v-btn>
    </v-flex>

    <v-flex align-content-center>
      <v-btn
        :dark='isLogged'
        :disabled='!isLogged'
        :block='blockMode'
        :icon='iconMode'
        :class='owned?"elevation-1":""'
        :color='owned ? "blue lighten-2" : "blue lighten-1"'
        :to='{ name: "generators-owned" }'
      >
        <v-icon :left='blockMode' color='indigo'>face</v-icon>
        <span class='hidden-sm-and-down'>Propios</span>
      </v-btn>
    </v-flex>

    <v-flex align-content-center v-if='isAdmin'>
      <v-btn
        dark
        :block='blockMode'
        :icon='iconMode'
        :class='hidden?"elevation-1":""'
        :color='hidden ? "blue lighten-2" : "blue lighten-1"'
        :to='{ name: "generators-hidden" }'
      >
        <icon :left='blockMode' color='orange' name='eye-slash' scale='1.2' class='mx-3  darken-1'></icon>
        <span class='hidden-sm-and-down'>Ocultos</span>
      </v-btn>
    </v-flex>

    <v-flex align-content-center>
      <v-btn
        dark
        :block='blockMode'
        :icon='iconMode'
        :class='all?"elevation-1":""'
        :color='all ? "red lighten-2" : "red lighten-1"'
        :to='{ name: "generator-new" }'
      >
        <v-icon :left='blockMode'>add</v-icon>
        <span class='hidden-sm-and-down'>NUEVO</span>
      </v-btn>
    </v-flex>

  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Menu',
  props: {
    filter: String
  },
  computed: {
    ...mapGetters('auth', ['isLogged', 'isAdmin']),
    all() {
      return this.filter === 'all'
    },
    featured() {
      return this.filter === 'featured'
    },
    liked() {
      return this.filter === 'liked'
    },
    owned() {
      return this.filter === 'owned'
    },
    hidden() {
      return this.filter === 'hidden'
    },
    iconMode() {
      return this.$vuetify.breakpoint.xsOnly
    },
    blockMode() {
      return this.$vuetify.breakpoint.mdAndUp
    }
  }
}
</script>

<style scoped>
</style>
