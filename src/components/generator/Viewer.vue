<template>
  <v-container fluid fill-height class='my-0 py-0'>
    <v-layout column>
      <v-flex>
        <!-- TOOLBAR -->
        <viewer-toolbar :name='generator.name'/>
      </v-flex>

      <v-flex xs12 fill-height class='white pa-0 ma-0'>

        <!-- GENERATOR BTN -->
        <generate-button @generate='generate()'></generate-button>

        <!-- GENERATOR TEXT -->
        <v-card flat class='transparent ql-container pa-0 ma-0 text-container' :class='heightClass'>
          <v-card-text class='ql-editor pa-3 px-4' v-html='rawText'></v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import rpgen from '@rolodromo/rpgen'
import { mapGetters } from 'vuex'
import GenerateButton from './GenerateButton.vue'
import ViewerToolbar from './ViewerToolbar.vue'

export default {
  name: 'Viewer',
  components: {
    ViewerToolbar,
    GenerateButton
  },
  props: {
    generator: {
      type: Object
    }
  },
  data() {
    return {
      rawText: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['isLogged']),
    heightClass() {
      return this.$vuetify.breakpoint.smAndDown ? 'height-sm' : 'height-big'
    },
    text() {
      return this.rawText
    },
    engine() {
      try {
        const { tpls, tables } = this.generator.data
        const childrenNames = Object.keys(this.generator.children)
        let children = ''
        if (childrenNames.length) {
          children = childrenNames.reduce((str, key) => {
            const data = this.generator.children[key]
            return `${str}\n\n${data.tables}`
          }, '')
        }
        return rpgen.generator.create(`${tpls}\n\n${tables}\n\n${children}`)
      } catch (e) {
        console.log('Generator Detail:', e)
        this.error('Error cargando datos')
      }
    }
  },
  watch: {
    generator() {
      if (this.engine) {
        this.generate()
      }
    }
  },
  methods: {
    generate() {
      try {
        this.rawText = this.engine.generate()
      } catch (e) {
        console.log(e)
        this.rawText = 'Error al generar contenido'
      }
    }
  }
}
</script>
<style scoped>
.text-container {
  overflow-y: auto;
}

.height-sm {
  max-height: 71.5vh;
}

.height-big {
  max-height: 81.2vh;
}
</style>
