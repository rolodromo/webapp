<template>
  <v-flex>
    <v-dialog v-model='deleteDialog' persistent :disabled='disabled'>
      <v-flex slot='activator' d-block >
        <slot name='activator' style='display: block;'></slot>
      </v-flex>

      <v-card class='pa-0 ma-0'>
        <v-card-title class='error white--text title'>{{title}}</v-card-title>
        <v-card-text>{{description}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class='success' @click.native='deleteDialog=false'>Cancelar</v-btn>
          <v-btn class='error' @click.native='confirm'>Borrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>

</template>
<script>
export default {
  props: {
    title: String,
    description: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      deleteDialog: false
    }
  },
  methods: {
    confirm() {
      this.deleteDialog = false
      this.$emit('confirm')
    }
  }
}
</script>
