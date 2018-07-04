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
              <v-list-tile @click='resetDefault' v-if='!isNew'>
                <v-list-tile-avatar>
                  <v-icon color='secondary'>restore</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>Reiniciar</v-list-tile-title>
              </v-list-tile>

              <delete-dialog
                v-if='isLogged'
                title='Borrar generador?'
                description='Esta accion borrará el generador de forma permanente. No se puede deshacer.'
                :disabled='!canDelete'
                @confirm='remove' >
                <v-list-tile slot='activator' @click='' :disabled='!canDelete'>
                  <v-list-tile-avatar>
                    <v-icon color='error'>delete_forever</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-title>Borrar</v-list-tile-title>
                </v-list-tile>
              </delete-dialog>

              <v-list-tile @click='save' :disabled='!canEdit'>
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
                class='white pa-2 ma-0'
                :height='small ? "70.5vh" : "81.3vh"'
                style='overflow-y: auto;'
              >
                <v-card-text>
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


                  <v-divider></v-divider>
                  <v-switch v-model='listed' label='Visible'></v-switch>

                  <v-divider></v-divider>

                  <!-- TABLAS EXTERNAS -->
                  <v-subheader>Tablas externas</v-subheader>
                  <v-list>
                    <template v-for='(id, table) in externalTables'>
                      <v-list-tile :key='`${table}-${id}`'>

                        <v-list-tile-content>
                          <v-list-tile-title>{{ table }}</v-list-tile-title>
                          <v-list-tile-sub-title>{{ id }}</v-list-tile-sub-title>

                        </v-list-tile-content>
                        <v-list-tile-action class='px-0 mx-0'>
                          <v-btn small icon dark color='red' @click='removeAlias(table)'>
                            <v-icon>delete_forever</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                      </v-list-tile>
                      <v-divider :key='`${table}-${id}-div`'></v-divider>
                    </template>
                  </v-list>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn round dark small color='success' @click='externalDialog = true'>
                    <v-icon>add</v-icon>
                    Agregar
                  </v-btn>
                </v-card-actions>
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

            <!-- GENERATOR -->
            <v-tab-item id='generator-test' lazy>
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
      <v-dialog v-model='externalDialog' persistent>
        <v-card>
          <v-card-title>
            <span class='headline'>Tabla externa</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model='newAliasName' label='Alias' required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    :items='listTables'
                    v-model='newTable'
                    item-text='name'
                    item-value='id'
                    label='Tablas'
                  ></v-autocomplete>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click.native='externalDialog = false'>Cancelar</v-btn>
            <v-btn flat @click.native='addExternal'>Agregar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import rpgen from '@rolodromo/rpgen'
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'
import GenerateButton from './GenerateButton.vue'
import ViewerToolbar from './ViewerToolbar.vue'

const TEST_GENERATOR_TAB = 3

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
      authorId: null,
      tpls: '[tu_tabla]',
      editorTpls: '[tu_tabla]',
      tables: ';tu_tabla\nlinea 1\nlinea 2\nlinea 3',
      externalTables: null,
      listed: false,
      tab: null,
      isNew: true,
      canDelete: false,
      canEdit: false,
      exampleText: '',
      testGenerator: null,
      newTable: '',
      newAliasName: '',
      externalDialog: false,
      editorOption: {
        modules: {
          toolbar: '#toolbar'
        }
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['isLogged', 'isAdmin', 'userId']),
    ...mapState('generators', {
      listTables: 'tableNames'
    }),
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
    tpls(newVal) {
      this.editorTpls = newVal.replace(/;@tpl\|main\n/, '')
    },
    tab(index) {
      if (index === TEST_GENERATOR_TAB) {
        this.makeTestGenerator()
      }
    }
  },
  created() {
    this.calcPerms()
    this.reset()
  },
  methods: {
    ...mapActions({
      saveGenerator: 'generators/save',
      removeGenerator: 'generators/remove',
      loadExternal: 'generators/loadExternal',
      alert: 'toast/error'
    }),
    ...mapMutations({
      removeExternal: 'generators/removeExternal'
    }),
    makeTestGenerator() {
      let children = ''
      if (this.children) {
        const childrenNames = Object.keys(this.children)
        if (childrenNames.length) {
          children = childrenNames.reduce((str, key) => {
            const data = this.generator.children[key]
            return `${str}\n\n${data.tables}`
          }, '')
        }
      }
      this.testGenerator = rpgen.generator.create(`;@tpl|main\n${this.tpls}\n\n${this.tables}\n\n${children}`)
      this.generate()
    },
    async addExternal() {
      await this.loadExternal({
        id: this.newTable,
        name: this.newAliasName
      })
      this.newTable = {}
      this.newAliasName = ''
      this.externalDialog = false
      this.externalTables = this.generator.data.alias
      this.children = this.generator.children
    },
    removeAlias(alias) {
      this.removeExternal(alias)
      this.$nextTick(() => {
        this.externalTables = this.generator.data.alias
        this.children = this.generator.children
      })
    },
    reset() {
      const gen = this.generator

      if (!gen.name) return

      this.name = gen.name
      this.desc = gen.desc
      this.authorId = gen.author.id
      this.tpls = gen.data.tpls
      this.tables = gen.data.tables
      this.children = gen.children
      this.externalTables = gen.data.alias
      this.listed = !!gen.listed
    },
    calcPerms() {
      this.isNew = !this.generator.id
      this.canEdit = this.isAdmin || this.isNew || this.userId === this.authorId
      this.canDelete = !this.isNew && (this.isAdmin || this.userId === this.authorId)
    },
    resetDefault() {
      this.reset()
      this.makeTestGenerator()
    },
    checkMeta() {
      if (!this.name) {
        this.alert('Titulo invalido')
        this.tab = 0
        return false
      }
      return true
    },
    async save() {
      if (!this.checkMeta()) return

      const { name, desc, tables, externalTables, tpls, listed, generator } = this
      const saved = await this.saveGenerator({
        ...generator,
        name,
        desc,
        listed,
        data: {
          alias: externalTables,
          tables,
          tpls
        }
      })
      if (saved) {
        this.$router.replace({
          name: 'generator-edit',
          params: {
            slug: saved.slug,
            id: saved.id
          }
        })
      }
    },
    async remove() {
      let removed = true
      if (!this.isNew) {
        removed = await this.removeGenerator(this.generator.id)
      }
      if (removed) {
        this.$router.replace({
          name: 'generators'
        })
      }
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
