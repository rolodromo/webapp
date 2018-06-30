<template>
  <v-card flat class='white pa-0 darken-1'>
    <v-toolbar dense dark flat class='secondary'>
      <v-toolbar-title dense>
        <slot name='title'></slot>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if='linkTo' fab small icon target='_blank' :href='linkTo' color='red'>
        <v-icon>open_in_new</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <slot name='content'></slot>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    linkTo: {
      type: String
    }
  }
}
</script>
