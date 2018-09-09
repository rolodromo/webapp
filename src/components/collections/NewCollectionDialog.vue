<template>
  <v-dialog light v-model='status' max-width='500px'>
    <v-card>
      <v-card-title>
        <span class='headline'>Colección</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field label='Nombre' required v-model='name'></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label='Descripción' required v-model='desc'></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*campos obligatorios</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color='blue darken-1' flat @click.native='close'>Close</v-btn>
        <v-btn color='blue darken-1' flat @click.native='save'>Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'NewCollectionDialog',
  props: {
    open: Boolean,
    collection: Object
  },
  data() {
    return {
      status: false,
      name: '',
      desc: ''
    }
  },
  watch: {
    open: function(newVal) {
      this.status = newVal
      this.name = this.collection.name
      this.desc = this.collection.desc
    },
    status: function(newVal, oldVal) {
      if (newVal || newVal === oldVal) return
      this.close()
    }
  },
  methods: {
    close() {
      this.status = false
      this.$emit('close')
    },
    save() {
      this.status = false
      const { name, desc } = this
      this.$emit('save', { name, desc })
      // this.$data.collection = {}
    }
  }
}
</script>
