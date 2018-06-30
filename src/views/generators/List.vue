<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <selector-menu :filter='filter'></selector-menu>
      </v-flex>
      <v-flex xs12 sm12 md6 lg4 xl3 v-for='generator in list' :key='generator.id' >
        <list-item :generator='generator'></list-item>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ListItem from '@/components/generator/ListItem.vue'
import SelectorMenu from '@/components/generator/Menu.vue'

export default {
  name: 'generators-list',
  components: { ListItem, SelectorMenu },
  props: {
    filter: String
  },
  computed: {
    ...mapState({
      list: state => state.generators.list
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
    ...mapActions('generators', ['loadList'])
  }
}
</script>
