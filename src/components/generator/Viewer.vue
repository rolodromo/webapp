<template>
  <v-flex fill-height xs12>
    <v-layout column wrap fill-height  class='white'>

      <v-flex  style='flex-grow: 0;'>
        <v-card flat color='secondary'>
          <v-layout row align-center justify-center style='position: relative'>
            <v-flex xs1 style='max-width: 3em !important;'>
              <v-btn small icon dark @click='$router.back()'>
                <icon name='arrow-circle-left' scale='2' ></icon>
              </v-btn>
            </v-flex>
            <v-flex >
              <v-card-title class='title white--text pl-2 pr-5'>
                {{ generator.name }}
              </v-card-title>
              <generate-button @generate='generate()'></generate-button>
            </v-flex>

          </v-layout>
        </v-card>
      </v-flex>

      <v-flex d-flex style='flex-grow: 0;'>
        <v-card-text >
          {{ generator.desc }}
          <v-divider></v-divider>

        </v-card-text>

      </v-flex>
      <v-flex style='max-height: calc(100vh - 15.01em); overflow-y: auto;'>

        <v-card flat class='ql-container ma-2' style='flex: 1 1 100%;'>
          <v-card-text class='ql-editor' v-html='rawText'></v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
  </v-flex>
</template>

<script>
import GenerateButton from './GenerateButton.vue'
import rpgen from '@rolodromo/rpgen'

export default {
  name: 'Viewer',
  components: {
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
