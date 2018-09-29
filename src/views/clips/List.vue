<template>
  <v-container fluid grid-list-lg>
    <new-collection-dialog
      :open='newCollectionDialog'
      :collection='{}'
      @close='newCollectionDialog=false'
      @save='addCollection'></new-collection-dialog>


    <v-toolbar dense dark class='secondary lighten-1' flat>
      <i class='gi-sound-waves gi gi-2x'></i>
      <v-toolbar-title class='title font-weight-bold pa-0 ma-0'>
        Sonidos
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu offset-y left light>
        <v-btn small icon dark slot='activator'>
          <v-icon>menu</v-icon>
        </v-btn>

        <v-list>
          <v-list-tile @click='openDialog("sound")'>
            <v-list-tile-avatar>
              <v-icon color='success'>save_alt</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-title>Colección</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-layout row wrap>
      <v-card-title v-if='!sounds.length' flat class='font-weight-thin font-italic title ml-5'>No hay clips de audio
      </v-card-title>
      <v-flex xs12 sm10 md6 lg4 xl3 v-for='sound in sounds' :key='sound.id'>
        <clip-item :element='sound'></clip-item>
      </v-flex>
    </v-layout>

    <v-toolbar dense dark class='secondary lighten-1' flat>
      <i class='gi-tied-scroll gi gi-2x'></i>
      <v-toolbar-title class='title font-weight-bold pa-0 ma-0'>
        Generadores
      </v-toolbar-title>
      <v-spacer></v-spacer>


    </v-toolbar>

    <v-layout row wrap>
      <v-card-title v-if='!generators.length' flat class='font-weight-thin font-italic title ml-5'>No hay generadores
      seleccionados
      </v-card-title>
      <v-flex xs12 sm10 md6 lg4 xl3 v-for='generator in generators' :key='generator.id'>
        <clip-item :element='generator'></clip-item>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import ClipItem from '../../components/clips/ClipItem'
import NewCollectionDialog from '../../components/collections/NewCollectionDialog'

export default {
  name: 'List',
  components: { NewCollectionDialog, ClipItem },
  data() {
    return {
      collectionType: '',
      newCollectionDialog: false
    }
  },
  computed: {
    ...mapGetters('clip', {
      sounds: 'sounds',
      generators: 'generators'
    })
  },
  methods: {
    ...mapActions('collections', {
      createCollection: 'createCollection'
    }),
    ...mapMutations('clip', {
      clearClips: 'clearByType'
    }),

    openDialog(type) {
      this.collectionType = type
      this.newCollectionDialog = true
    },
    async addCollection({ name, desc }) {
      const type = this.collectionType
      const items = this[`${type}s`] // TODO: remove horrible hack

      const newCol = await this.createCollection({
        name,
        desc,
        type,
        items
      })

      this.clearClips(type)

      this.$router.push({
        name: 'collection-detail',
        params: {
          slug: newCol.slug,
          id: newCol.id
        }
      })
      this.newCollectionDialog = false
    }
  }
}
</script>
