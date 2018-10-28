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
  width: 2em;
  height: 2em;
  padding: 0.3em;
  margin: 0;
}
.fa-icon {
  font-size: 1.85em;
  min-width: 1em;
}

.glossy i.gi {
  margin: 0.01em;
  width: 2em;
  height: 2em;
  text-align: center;
  object-fit: contain;
  border-radius: 10%;
  background-color: #ece9c3;
  box-shadow:
          inset 0 0.03em #e2dab3,
          inset 0 -0.03em #a7a184,
          inset 0.01em 0 #d7cfaa,
          inset -0.03em 0 #a7a184;
}

/*
TODO: Move to gameicons-webfont
*/
.gi-inset {
  color: transparent;
  text-shadow:
          1px 1px 3px rgba(255, 255, 255, 0.8),
          0 0 0 rgba(0, 0, 0, 1),
          2px 2px 3px rgba(255, 255, 255, 0.4);
}

.gi-green {
  color: rgba(144, 255, 41, 0.6);
}

.gi-red {
  color: rgba(255, 41, 41, 0.6);
}

.gi-blue {
  color: rgba(41, 84, 255, 0.6);
}

.gi-yellow {
  color: rgba(255, 248, 41, 0.6);
}

.gi-orange {
  color: rgba(255, 101, 41, 0.6);
}

.gi-pink {
  color: rgba(255, 41, 248, 0.6);
}

.gi-grey {
  color: rgba(15, 0, 15, 0.6);
}

.gi-lime {
  color: rgba(195, 255, 0, 0.6);
}

.gi-cyan {
  color: rgba(0, 242, 255, 0.6);
}
</style>
