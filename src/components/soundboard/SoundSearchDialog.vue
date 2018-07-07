<template>
  <v-dialog v-model='open' scrollable >
    <v-card>
      <v-card-title>
        <span class='headline'>Buscar sonidos</span>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text class='py-0'>
        <v-text-field
          autofocus
          clearable
          prepend-icon='search'
          append-outer-icon='settings'
          @click:append-outer='toggleAdvanced()'
          clear-icon='backspace'
          v-model='searchText'
          @click:clear='clear'
          @keyup.enter='doSearch'
        ></v-text-field>
      </v-card-text>
      <v-slide-y-transition>
        <v-card-text class='py-1' v-if='advanced'>
          <v-layout row wrap align-left>
            <v-flex xs6 class='pa-0 ma-0'>
              <span class='title pr-2'>Duración</span>
              <v-btn-toggle v-model='maxDuration' mandatory>
                <v-btn flat value='10'>
                  <v-icon>chevron_left</v-icon>10s
                </v-btn>
                <v-btn flat value='30'>
                  <v-icon>chevron_left</v-icon>30s
                </v-btn>
                <v-btn flat value=''>
                  Todos
                </v-btn>
              </v-btn-toggle>
            </v-flex>
            <v-flex xs6>
              <span class='title pa-2'>Orden</span>
              <v-btn-toggle v-model='sort' @click.native='toggleDirection' mandatory>
                <v-btn flat value='ratingDir'>
                  <v-icon>{{ ratingDir === 'desc' ? 'expand_more' : 'expand_less'}}</v-icon>rating
                </v-btn>
                <v-btn flat value='durationDir'>
                  <v-icon>{{ durationDir === 'desc' ? 'expand_more' : 'expand_less'}}</v-icon>duración
                </v-btn>
                <v-btn flat value='scoreDir'>
                  <v-icon>{{ scoreDir === 'desc' ? 'expand_more' : 'expand_less'}}</v-icon>relevancia
                </v-btn>
              </v-btn-toggle>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-slide-y-transition>
      <v-card-text style='height: 60vh;'>
        <v-layout row wrap>
          <template v-for='sound in searchList' >
            <v-flex xs12 sm6 lg4 xl3 :key='sound.id' class='pb-2 px-1' style='position: relative;'>
              <v-btn icon small round dark color='red' class='mr-2' style='position: absolute; top: 0; right:0; z-index: 3;'>
                <v-icon>add</v-icon>
              </v-btn>
              <audio-player :name='sound.name' :sduration='sound.duration' :sources='sound.src' :preload='false' :loop='false'/>
            </v-flex>
          </template>
        </v-layout>
      </v-card-text>
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
      sortDuration: true,
      sortRating: true,
      sortScore: true,
      sort: '',
      ratingDir: 'desc',
      scoreDir: 'desc',
      durationDir: 'desc',
      sortFilter: ''
    }
  },
  computed: {
    ...mapState('soundboard', {
      searchList: 'list'
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
    }
  },
  methods: {
    toggleDirection() {
      if (!this.sort) return
      const dir = this[this.sort]

      this[this.sort] = dir === 'desc' ? 'asc' : 'desc'
      this.sortFilter = `${this.sort.replace('Dir', '')}_${this[this.sort]}`
    },
    ...mapActions('soundboard', ['search', 'clear']),
    openSearchBox() {
      this.clear()
      this.searchText = ''
      this.searchbox = true
    },
    // debounceSearch: debounce(function(searchText) {
    //   this.search(searchText)
    // }, 300),
    doSearch() {
      const { searchText, maxDuration, sortFilter } = this
      this.search({ term: searchText, maxDuration, sort: sortFilter })
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    }
  }
}
</script>
<style scoped>
</style>
