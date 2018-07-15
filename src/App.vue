<template>
  <v-app id='rolodromo'>
    <toast/>
    <rol-menu :drawer.sync='drawer' />
    <rol-toolbar @menu:click='drawer = !drawer' />
    <v-content>
      <v-container fluid fill-height class='grey lighten-4' pa-1>
        <v-layout justify-center align-start>
          <transition>
            <router-view></router-view>
          </transition>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import RolMenu from '@/components/layout/Menu.vue'
import RolToolbar from '@/components/layout/Toolbar.vue'

export default {
  name: 'App',
  components: {
    RolMenu,
    RolToolbar
  },
  data() {
    return {
      title: 'Rolodromo.com',
      clipped: false,
      drawer: false
    }
  },
  metaInfo: {
    titleTemplate(titleChunk) {
      return `${titleChunk ? `${titleChunk} · ` : ''} Rolodromo.com`
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
.gi {
  height: 1.55em;
  width: 2em;
  padding: 0;
  margin: 0;
  padding-top: 0.3em;
}
.fa-icon {
  font-size: 1.85em;
  min-width: 1em;
}
</style>
