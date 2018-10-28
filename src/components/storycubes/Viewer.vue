<template>
  <div class='storycubes pt-3' :class='size'>
    <generate-button class='generate-pos' @generate='regenerate'></generate-button>
    <div v-html='rawText'></div>
  </div>
</template>

<script>
import rpgen from '@rolodromo/rpgen'
import GenerateButton from '@/components/generator/GenerateButton.vue'

export default {
  name: 'GeneratorViewer',
  components: {
    GenerateButton
  },
  props: {
    generator: {
      type: Object,
      default() {
        return {
          data: {
            tpls: '',
            tables: ''
          }
        }
      }
    }
  },
  data() {
    return {
      rawText: ''
    }
  },
  computed: {
    tpls() {
      return this.generator.data.tpls
    },
    tables() {
      return this.generator.data.tables
    },
    size() {
      return this.$vuetify.breakpoint.name
    }
  },
  created() {
    this.engine = rpgen.generator.create(`${this.tpls}\n\n${this.tables}`)
    this.rawText = this.engine.generate()
  },
  methods: {
    regenerate() {
      this.rawText = this.engine.generate()
    }
  }
}
</script>

<style>
.storycubes .generate-pos {
  top: -3.8em !important;
  right: 0 !important;
}

.storycubes.xs .generate-pos,
.storycubes.sm .generate-pos,
.storycubes.md .generate-pos {
  right: 2.5em !important;
}

.storycubes .gi {
  font-size: 2em;
}

.storycubes {
  text-align: center;
  min-width: 400px !important;
  position: relative;
}

.storycubes.xs {
  font-size: 1.5em;
}

.storycubes.sm {
  font-size: 2.5em;
}

.storycubes.md {
  font-size: 3em;
}

.storycubes.lg {
  font-size: 3.1em;
}

.storycubes.xl {
  font-size: 3.5em;
}

.storycubes p i {
  object-fit: contain;
  border-radius: 10%;
  background-color: #ece9c3;
  box-shadow:
          inset 0 0.03em #e2dab3,
          inset 0 -0.03em #a7a184,
          inset 0.01em 0 #d7cfaa,
          inset -0.03em 0 #a7a184;
}
</style>
