<template>
  <v-app id='rolodromo'>
    <rol-menu :drawer.sync='drawer' />
    <v-toolbar color='primary white--text' app fixed clipped-left dense justify-center align-center>
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

export default {
  name: 'App',
  metaInfo: {
    titleTemplate(titleChunk) {
      return `${titleChunk ? `${titleChunk} · ` : ''} Rolodromo.com`
    }
  },
  components: {
    RolMenu
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      title: 'Rolodromo.com'
    }
  }
}
</script>
<style>
.ql-container .ql-editor {
  font-size: 1.2em;
}

.height-sm .ql-editor {
  height: 60vh;
  overflow-y: auto;
}

.height-big .ql-editor {
  height: 77vh;
  overflow-y: auto;
}
</style>
