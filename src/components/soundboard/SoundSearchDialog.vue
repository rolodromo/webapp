<template>
  <v-dialog v-model='open' scrollable persistent>
    <v-card>
      <v-card-title>
        <v-btn right flat small icon @click='open = false'>
          <v-icon>close</v-icon>
        </v-btn>
        <span class='headline'>Buscar </span>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text class='py-0'>
        <v-text-field
          autofocus
          clearable
          v-model='searchText'
          prepend-icon='search'
          clear-icon='backspace'
          append-outer-icon='settings'
          @click:append-outer='toggleAdvanced()'
          @click:clear='clear'
          @keyup.enter='doSearch'
        ></v-text-field>
      </v-card-text>
      <v-slide-y-transition>
        <v-card-text class='my-1 pa-0' v-if='advanced'>
          <v-layout row wrap align-content-center align-center>
            <v-flex xs12 md6 class='pb-1' align-content-center align-center>
              <span class='subheading pb-2'>Duración</span><br class='hidden-md-and-up'/>
              <v-btn-toggle v-model='maxDuration' mandatory>
                <v-btn small flat value='10'>
                  <v-icon>chevron_left</v-icon>
                  10s
                </v-btn>
                <v-btn small flat value='30'>
                  <v-icon>chevron_left</v-icon>
                  30s
                </v-btn>
                <v-btn small flat value=''>
                  Todos
                </v-btn>
              </v-btn-toggle>
            </v-flex>
            <v-flex xs12 md6 class='pb-2'>
              <span class='subheading'>Orden</span><br class='hidden-md-and-up'/>
              <v-btn-toggle small v-model='sort' @click.native='toggleDirection' mandatory>
                <v-btn small  flat value='ratingDir'>
                  <v-icon>{{ ratingDir === 'desc' ? 'expand_more' : 'expand_less'}}</v-icon>
                  rating
                </v-btn>
                <v-btn small flat value='durationDir'>
                  <v-icon>{{ durationDir === 'desc' ? 'expand_more' : 'expand_less'}}</v-icon>
                  duración
                </v-btn>
                <v-btn small flat value='scoreDir'>
                  <v-icon>{{ scoreDir === 'desc' ? 'expand_more' : 'expand_less'}}</v-icon>
                  relevancia
                </v-btn>
              </v-btn-toggle>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-slide-y-transition>
      <v-card-text style='height: 60vh;'>
        <v-layout row wrap>
          <template v-for='sound in searchList'>
            <v-flex xs12 sm6 lg4 xl3 :key='sound.id' class='pb-2 px-1' style='position: relative;'>
              <v-btn
                icon small round dark color='red'
                @click='saveClip(sound)'
                v-if='!sound.clipped'
                class='mr-2' style='position: absolute; top: 0; right:0; z-index: 3;'>
                <v-icon>add</v-icon>
              </v-btn>
              <v-btn
                icon small round dark color='red lighten-2'
                @click='unClip(sound)'
                v-else
                class='mr-2' style='position: absolute; top: 0; right:0; z-index: 3;'>
                <v-icon>remove</v-icon>
              </v-btn>
              <audio-player :name='sound.name' :sduration='sound.duration' :sources='sound.src' :preload='false'
                            :loop='false'/>
            </v-flex>
          </template>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-chip close color='green' text-color='white' :v-show='clippedList.length > 0' v-model='showClip'>
          <v-avatar class='green darken-4'>{{ clippedList.length }}</v-avatar>
          <span >seleccionados</span>
        </v-chip>
        <v-btn class='red mx-2' dark small @click='saveSearch' >
          <v-icon>add</v-icon>
          <span class='hidden-sm-and-down'>Agregar</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// import { debounce } from 'lodash'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'SoundSearchDialog',
  props: {
    searchbox: Boolean
  },
  data() {
    return {
      advanced: true,
      searchText: '',
      maxDuration: '',
      sort: 'scoreDir',
      ratingDir: 'desc',
      durationDir: 'desc',
      scoreDir: 'desc',
      sortFilter: '',
      showClip: false
    }
  },
  computed: {
    ...mapState('soundboard', {
      searchList: 'list',
      clippedList: 'clipped'
    }),
    open: {
      get() {
        return this.searchbox
      },
      set(newVal) {
        this.$emit('update:searchbox', newVal)
      }
    }
  },
  watch: {
    advanced() {
      this.maxDuration = ''
      this.sort = 'scoreDir'
      this.scoreDir = 'desc'
      this.ratingDir = 'desc'
      this.durationDir = 'desc'
      this.sortFilter = ''
    },
    sort() {
      this.toggleDirection()
    },
    clippedList(newVal) {
      this.showClip = newVal.length > 0
    },
    showClip(newVal) {
      if (!newVal) {
        this.clearClipped()
      }
    },
    open(newVal) {
      if (!newVal) {
        this.resetSearchbox()
      }
    }
  },
  methods: {
    toggleDirection() {
      if (!this.sort) return
      const dir = this[this.sort]

      this[this.sort] = dir === 'desc' ? 'asc' : 'desc'
      this.sortFilter = `${this.sort.replace('Dir', '')}_${this[this.sort]}`
    },
    ...mapActions('soundboard', ['search', 'clear', 'clip', 'removeClip', 'clearClipped']),
    resetSearchbox() {
      this.clear()
      this.clearClipped()
      this.searchText = ''
      this.sort = 'scoreDir'
      this.scoreDir = 'desc'
      this.ratingDir = 'desc'
      this.durationDir = 'desc'
    },
    // debounceSearch: debounce(function(searchText) {
    //   this.search(searchText)
    // }, 300),
    saveClip(sound) {
      this.clip(sound)
    },
    unClip(sound) {
      this.removeClip(sound)
    },
    doSearch() {
      const { searchText, maxDuration, sortFilter } = this
      this.search({ term: searchText, maxDuration, sort: sortFilter })
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    saveSearch() {
      this.$emit('save', this.clippedList)
    }
  }
}
</script>
<style scoped>
</style>
