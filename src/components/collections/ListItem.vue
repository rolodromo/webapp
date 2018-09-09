<template>
  <v-card :to='collection.link'>

    <v-card-title class='secondary'>
      <div class='title white--text'>{{ collection.name }}</div>
      <v-spacer></v-spacer>

      <v-badge overlap color='blue lighten-2' class='pa-1'>
        <span slot='badge'>{{ collection.length }}</span>
        &nbsp;
      </v-badge>

    </v-card-title>

    <v-card-text>
      <div>{{ collection.desc }}</div>
    </v-card-text>

  </v-card>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    collection: Object
  },
  computed: {
    count() {
      return this.collection.name
    }
  }
}
</script>
