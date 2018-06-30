<template>
  <v-dialog v-model='status' max-width='500px'>
    <v-card>
      <v-card-title>
        <span class='headline'>Agregar tirada</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field label='Nombre' required v-model='roll.name'></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label='Tirada' required v-model='roll.roll'></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*indicates required field</small>
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
  name: 'NewRollDialog',
  props: {
    open: Boolean
  },
  data() {
    return {
      status: false,
      roll: {
        name: '',
        roll: ''
      }
    }
  },
  watch: {
    open: function(newVal) {
      this.status = newVal
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
      this.$emit('save', this.$data.roll)
      this.$data.roll = {}
    }
  }
}
</script>
