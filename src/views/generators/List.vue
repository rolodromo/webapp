<template>
  <v-container fluid grid-list-lg>
    <selector-menu :filter='filter'></selector-menu>
    <spinner dark size='250'></spinner>
    <v-layout row wrap>
      <v-flex xs12 sm10 md6 lg4 xl3 v-for='generator in list' :key='generator.id'>
        <list-item :generator='generator'></list-item>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ListItem from '@/components/generator/ListItem.vue'
import SelectorMenu from '@/components/generator/Menu.vue'
import Spinner from '@/components/common/Spinner'

export default {
  name: 'GeneratorsList',
  metaInfo() {
    return {
      title: 'Generadores'
    }
  },
  components: { ListItem, SelectorMenu, Spinner },
  props: {
    filter: String
  },
  computed: {
    ...mapState('generators', {
      list: 'list'
    })
  },
  watch: {
    filter(newVal) {
      this.loadList(newVal)
    }
  },
  created() {
    this.loadList(this.filter)
  },
  methods: {
    ...mapActions('generators', ['loadList', 'reset'])
  },
  beforeRouteLeave(to, from, next) {
    this.reset()
    next()
  }
}
</script>
