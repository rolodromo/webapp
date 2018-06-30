<template>
  <v-container fluid fill-height class='my-0 py-0'>
    <v-layout column>
      <v-flex>
        <!-- TOOLBAR -->
        <v-toolbar flat dense color='secondary'>
          <v-toolbar-side-icon>
            <v-btn small icon dark @click='$router.back()'>
              <icon name='arrow-circle-left' scale='2'></icon>
            </v-btn>
          </v-toolbar-side-icon>
          <v-toolbar-title class='white--text'>{{ generator.name }}</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-menu offset-y left>
            <v-btn small icon dark slot='activator'>
              <v-icon>menu</v-icon>
            </v-btn>

            <v-list>
              <v-list-tile @click='reset(generator)'>
                <v-list-tile-avatar>
                  <v-icon color='secondary'>restore</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>Reiniciar</v-list-tile-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-avatar>
                  <v-icon color='error'>delete_forever</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>Borrar</v-list-tile-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-avatar>
                  <v-icon color='success'>save_alt</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>Guardar</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>


          <v-tabs
            slot='extension'
            v-model='tab'
            color='secondary'
            grow dark
          >
            <v-tabs-slider color='red'></v-tabs-slider>
            <v-tab>
              <v-icon left>settings</v-icon>
              <span class='hidden-sm-and-down'>Datos</span>
            </v-tab>

            <v-tab>
              <v-icon left>view_list</v-icon>
              <span class='hidden-sm-and-down'>Tablas</span>
            </v-tab>

            <v-tab>
              <v-icon left>layers</v-icon>
              <span class='hidden-sm-and-down'>Plantilla</span>
            </v-tab>
            <v-tab>
              <v-icon left>refresh</v-icon>
              <span class='hidden-sm-and-down'>Generador</span>
            </v-tab>
          </v-tabs>
        </v-toolbar>
      </v-flex>

      <v-flex xs12 fill-height color='white'>
        <v-card class=' pa-0 ma-0'>
          <v-tabs-items v-model='tab'>

            <!-- EXTRAS -->
            <v-tab-item>
              <v-card
                flat
                class='white pa-4 ma-0'
                :height='small ? "70.5vh" : "81.3vh"'
              >
                <v-text-field
                  v-model='name'
                  label='Nombre'
                  required
                ></v-text-field>

                <v-textarea
                  auto-grow
                  hide-details
                  rows='3'
                  label='Descripción'
                  v-model='desc'
                >
                </v-textarea>

              </v-card>
            </v-tab-item>

            <!-- TABLAS -->
            <v-tab-item>
              <v-textarea
                class=' table-area pa-1 ma-2  grey lighten-4'
                :height='small ? "70vh" : "78.5vh"'
                no-resize
                hide-details
                flat
                v-model='tables'
              >
              </v-textarea>
            </v-tab-item>

            <!-- PLANTILLAS -->
            <v-tab-item>
              <quill-editor
                ref='quillEditor'
                :options='editorOption'
                v-model='editorTpls'
                :class='heightClass'
                @change='onEditorChange($event)'
              >
                <div id='toolbar' slot='toolbar'>
                  <button class='ql-bold'></button>
                  <button class='ql-italic'></button>
                  <button class='ql-underline'></button>
                  <button class='ql-blockquote'></button>
                  <button class='ql-list' value='ordered'></button>
                  <button class='ql-list' value='bullet'></button>
                  <button class='ql-indent' value='+1'></button>
                  <button class='ql-indent' value='-1'></button>
                  <select class='ql-size'>
                    <option value='small'></option>
                    <option selected></option>
                    <option value='large'></option>
                  </select>
                  <button class='ql-link'></button>
                  <button @click='addHr'>
                    <icon name='minus'></icon>
                  </button>
                  <button class='ql-clean'></button>
                </div>
              </quill-editor>
            </v-tab-item>
            <v-tab-item id='generator-test' lazy >
              <v-card
                flat class='transparent ql-container pa-0 ma-0 text-container'
                :height='small ? "70.5vh" : "81.3vh"'
                style='position: relative;'
              >
                <v-card-text class='ql-editor pa-3 px-4' v-html='exampleText'></v-card-text>
                <generate-button class='test-btn' @click.native='generate'></generate-button>

              </v-card>
            </v-tab-item>

          </v-tabs-items>

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
  name: 'GeneratorEditor',
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
      name: '',
      desc: '',
      tpls: '',
      editorTpls: '',
      tables: '',
      tab: null,
      exampleText: '',
      testGenerator: null,
      editorOption: {
        modules: {
          toolbar: '#toolbar'
        }
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['isLogged']),
    editor() {
      return this.$refs.quillEditor.quill
    },
    heightClass() {
      return this.$vuetify.breakpoint.smAndDown ? 'height-sm' : 'height-big'
    },
    small() {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  watch: {
    generator(gen) {
      console.log('CHANGED', gen)
      this.reset(gen)
    },
    tpls(newVal) {
      this.editorTpls = newVal.replace(/;@tpl\|main\n/, '')
    },
    tab(index) {
      if (index === 3) {
        const childrenNames = Object.keys(this.children)
        let children = ''
        if (childrenNames.length) {
          children = childrenNames.reduce((str, key) => {
            const data = this.generator.children[key]
            return `${str}\n\n${data.tables}`
          }, '')
        }
        this.testGenerator = rpgen.generator.create(`;@tpl|main\n${this.tpls}\n\n${this.tables}\n\n${children}`)
        this.generate()
      }
    }
  },
  created() {
    console.log('CREATED', this.generator)
  },
  methods: {
    reset(gen) {
      this.name = gen.name
      this.desc = gen.desc
      this.tpls = gen.data.tpls
      this.tables = gen.data.tables
      this.children = gen.children
    },
    generate() {
      this.exampleText = this.testGenerator.generate()
    },
    addHr() {
      const range = this.editor.getSelection()
      if (range) {
        this.editor.insertEmbed(range.index, 'divider', '', 'user')
      }
    },
    onEditorChange(e) {
      this.tpls = `;@tpl|main\n${e.html}`
    }
  }
}
</script>
<style>
.test-btn {
  top: calc(100% - 6em) !important;
  right: 1em !important;
}
</style>
<style scoped>
.table-area {
  border-radius: 4px;
}
</style>
