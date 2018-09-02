<template>
  <v-card
    :to='to'
    dark class='elevation-10' style='border-radius: 10px!important;'>
    <v-img
      height='50vh'
      class='text--white'
      :src='imageUrl'>
      <v-container fill-height fluid>
        <v-layout fill-height align-center justify-center>
          <v-flex xs12 align-end flexbox align-c >
            <i v-if='giIcon' :class='giIcon' class='amber--text  icon-pos shadow-text gi'></i>
            <div class='amber--text display-3 text-xs-center shadow-text text-pos'>
              {{ title }}
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: 'featured-card',
  props: {
    imageUrl: String,
    title: String,
    to: Object,
    giIcon: String
  }
}
</script>

<style scoped>
.text-pos {
  white-space: nowrap;
}
.shadow-text {
  text-shadow:
    -1px -1px 0 #000,
    0 -1px 0 #000,
    1px -1px 0 #000,
    -1px 0 0 #000,
    4px 0 6px #000,
    -4px 4px 6px #000,
    0 4px 6px #000,
    4px 4px 6px #000;
}
.icon-pos {
  font-size: 5em;
  position: absolute;
  top: 0.3em;
  left: -0.3em;
}
</style>
