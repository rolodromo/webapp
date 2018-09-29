<template>
  <v-layout row wrap>

    <v-flex xs12 pa-0 ma-0>
      <v-card-text class='py-0'>
        <v-text-field
          autofocus
          clearable
          v-model='searchText'
          prepend-icon='search'
          clear-icon='backspace'
          @click:clear='clear'
          @keyup.enter='doSearch'
        ></v-text-field>
      </v-card-text>
    </v-flex>

    <v-slide-y-transition>
      <v-flex xs12>
        <v-layout>
          <v-flex xs12 sm6 d-flex>
            <v-select
              v-model='durationSelect'
              :items='durationList'
              text='Duración'
              @change='doSearch'
            ></v-select>
          </v-flex>

          <v-flex xs12 sm6 d-flex>
            <v-select
              v-model='sortSelect'
              :items='sortList'
              text='Orden'
              @change='doSearch'
            ></v-select>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-slide-y-transition>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'SoundSearch',
  data() {
    return {
      searchText: '',
      sortSelect: 'score_desc',
      durationSelect: '',
      sortList: [
        { text: 'relevancia ↓', value: 'score_desc' },
        { text: 'relevancia ↑', value: 'score_asc' },
        { text: 'duración ↓', value: 'duration_desc' },
        { text: 'duración ↑', value: 'duration_asc' },
        { text: 'likes ↓', value: 'rating_desc' },
        { text: 'likes ↑', value: 'rating_asc' }
      ],
      durationList: [
        { text: '< 10s', value: '10' },
        { text: '< 30s', value: '30' },
        { text: '< 1m', value: '60' },
        { text: '< 5m', value: '300' },
        { text: 'Todos', value: '' }
      ]
    }
  },
  computed: {
    ...mapState('soundboard', {
      searchList: 'list'
    })
  },
  watch: {
    advanced(val) {
      if (val) return
      this.sortSelect = 'score_desc'
      this.durationSelect = ''
      this.searchText = ''
      this.clear()
    }
  },
  methods: {
    ...mapActions('soundboard', ['search', 'clear']),
    doSearch() {
      const { searchText: term, durationSelect: maxDuration, sortSelect: sort } = this
      this.search({ term, maxDuration, sort })
    }
  }
}
</script>
