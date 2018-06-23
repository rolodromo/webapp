<template>

  <v-card flat height='100%' :to='generator.link'>

    <v-layout column fill-height  align-content-start >

      <v-flex d-flex class=' py-0 px-2' style='flex-grow: 0;' >
        <v-card-title  class='secondary'>
          <div class='title force-color'>{{ generator.name }}</div>
        </v-card-title>
      </v-flex>

      <v-flex d-flex align-content-start style='flex-grow: 1;' class='py-0 px-2'>
        <v-card-text  style='min-height: 8em;'>
          {{ generator.desc }}
        </v-card-text>
      </v-flex>

      <v-flex style='flex-grow: 0;' class='py-0 px-2 text--secondary text--darken-3'>
        <v-divider></v-divider>
        <v-card-actions class='ma-0 pa-2 '>
          <span>{{generator.createdAt | moment('from', 'now')}}</span>
          <v-spacer></v-spacer>
          <avatar size='small' :src='generator.author.picture' :alt='generator.author.name'/>
        </v-card-actions>

      </v-flex>
    </v-layout>

  </v-card>

</template>
<script>

export default {
  props: {
    generator: Object
  },
  computed: {

  }
}
</script>
<style scoped>
.force-color {
  color: #FFF;
}
</style>
