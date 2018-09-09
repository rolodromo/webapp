<template>
  <v-menu light offset-y left>

    <edit-collection-dialog
      :open='newCollectionDialog'
      @close='newCollectionDialog=false'
      :collection='collection'
      @save='rename'></edit-collection-dialog>

    <v-btn small icon dark slot='activator'>
      <v-icon>menu</v-icon>
    </v-btn>

    <v-list>
      <delete-dialog
        v-if='isLogged'
        title='Borrar colección?'
        description='Esta accion borrará la colección de forma permanente. No se puede deshacer.'
        :disabled='!canDelete'
        @confirm='remove'>
        <v-list-tile slot='activator' @click='' :disabled='!canDelete'>
          <v-list-tile-avatar>
            <v-icon color='error'>delete_forever</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>Borrar</v-list-tile-title>
        </v-list-tile>
      </delete-dialog>

      <v-list-tile @click='openDialog' :disabled='!canEdit'>
        <v-list-tile-avatar>
          <v-icon color='success'>edit</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-title>Renombrar</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import EditCollectionDialog from '../../components/collections/NewCollectionDialog'

export default {
  name: 'Menu',
  components: {
    EditCollectionDialog
  },
  data() {
    return {
      newCollectionDialog: false,
      canEdit: false,
      canDelete: false
    }
  },
  props: {
    collection: {
      type: Object
    }
  },
  created() {
    this.calcPerms()
  },
  computed: {
    ...mapGetters('auth', ['isLogged', 'isAdmin', 'userId'])
  },
  methods: {
    ...mapActions('collections', ['renameCollection', 'deleteCollection']),
    calcPerms() {
      this.canEdit = this.isAdmin || this.isNew || this.userId === this.collection.authorId
      this.canDelete = !this.isNew && (this.isAdmin || this.userId === this.collection.authorId)
      console.log('perm', this.canEdit, this.canDelete, this.userId, this.collection.authorId)
    },
    async openDialog() {
      this.newCollectionDialog = true
    },
    async rename({ name, desc }) {
      const renamed = await this.renameCollection({ id: this.collection.id, name, desc })

      if (!renamed) return

      this.$router.replace({
        name: 'collection-detail',
        params: {
          slug: renamed.slug,
          id: renamed.id
        }
      })
    },
    async remove() {
      const removed = await this.deleteCollection(this.collection.id)
      if (!removed) {
        return
      }
      this.$router.replace({
        name: 'soundboard'
      })
    }
  }
}
</script>

<style scoped>
</style>
