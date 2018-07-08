<template>
  <v-card
    :to='to'
    dark class='elevation-10' style='border-radius: 10px!important;'>
    <v-card-media
      height='50vh'
      class='text--white'
      :src='imageUrl'>
      <v-container fill-height fluid>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
            <span class='display-2' style='text-shadow: 2px 2px 3px #0c0b28;'>{{ title }}</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-media>
  </v-card>
</template>

<script>
export default {
  name: 'featured-card',
  props: {
    imageUrl: String,
    title: String,
    to: String
  }
}
</script>

<style scoped>
</style>
