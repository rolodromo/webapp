<template>
  <v-card class='roll-card' color='white' height='100%'>
    <v-toolbar flat dark dense color='secondary'>
      <v-btn icon @click='remove'>
        <v-icon>close</v-icon>
      </v-btn>
      <v-flex class='body-2'>{{ title }}</v-flex>
    </v-toolbar>

    <v-card-text>
      <div class='subheading'>{{ roll }}</div>
    </v-card-text>

    <v-card-title  class='text-xs-center'>
      <v-spacer></v-spacer>
      <h1 class='blue--text'>{{ total }}</h1>
      <v-btn icon ripple class='blue lighten-2 white--text' @click='run'>
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-card-title>
  </v-card>
</template>

<script>
import rpgen from '@guumaster/rpgen'
import { TweenLite } from 'gsap'

export default {
  name: 'Roll',
  props: {
    name: String,
    roll: String
  },
  data() {
    return {
      rolled: {},
      tweenedNumber: 0
    }
  },
  computed: {
    title() {
      return this.name || this.roll
    },
    total() {
      return this.tweenedNumber.toFixed(0) // this.rolled.total
    }
  },
  watch: {
    rolled(newRoll) {
      this.$data.tweenedNumber = 0
      TweenLite.to(this.$data, 0.3, { tweenedNumber: newRoll.total })
    }
  },
  created() {
    this.roller = rpgen.roller.create(this.roll || this.name)
    this.run()
  },
  activated() {
    console.log('REMOUNTED', this.roll)
  },
  methods: {
    remove() {
      this.$emit('remove', { name: this.name, roll: this.roll })
    },
    run() {
      this.rolled = this.roller(true)
      this.$emit('roll', { name: this.title, roll: this.roll, data: this.rolled })
    }
  }
}
</script>

<style scoped>
.roll-card {
  /*height: 25vh !important;*/
}
</style>
