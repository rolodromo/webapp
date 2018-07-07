<template>
  <v-card dark class=' pa-2 ma-0 lighten-3' :class='{ "teal lighten-3": playing, "indigo lighten-3": !playing }'>
    <v-card-title class='pa-2 ma-0 pb-3 title white--text'>{{ name }}</v-card-title>
    <v-card-text class='pa-0 ma-0 myslide'>
      <v-slider color='indigo darken-4' class='pa-0 ma-0' dark @click.native='setPosition' min='0' :max='duration'
                step='0.01' v-model='progressBar'></v-slider>
    </v-card-text>
    <v-container class='pa-0 ma-0 container-bar'>
      <v-layout row class='pa-0 ma-0  player-bar' justify-left align-baseline>

        <v-flex xs1 class='pa-0 ma-0' dark>
          <v-btn class='pa-0 ma-0' color='indigo darken-4' icon flat @click.native='playing ? pause() : loadAndPlay()'>
            <v-icon v-if='playing === false'>play_arrow</v-icon>
            <v-icon v-else>pause</v-icon>
          </v-btn>
        </v-flex>

        <v-flex xs1 class='pa-0 ma-0'>
          <v-btn class='pa-0 ma-0' color='indigo darken-4' icon flat @click.native='stop()'>
            <v-icon>stop</v-icon>
          </v-btn>
        </v-flex>

        <v-flex xs3 class='pa-0 ma-0 px-2 mr-1 indigo--text time'>
          <p>{{ timeLabel }} / {{ durationLabel }}</p>
        </v-flex>
        <v-spacer></v-spacer>

        <v-flex xs1 class='pa-0'>
          <v-btn class='pa-0 ma-0' color='indigo darken-4' icon flat @click.native='toggleMute()'>
            <v-icon v-if='!muted'>volume_up</v-icon>
            <v-icon v-else>volume_off</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3 sm3 class='pa-0 pl-2 pr-3 myslide'>
          <v-slider color='indigo darken-4' min='0' max='100' step='10' :value='100' @input='userVol'></v-slider>
        </v-flex>

      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
import VueHowler from 'vue-howler'
import moment from 'moment'

export default {
  mixins: [VueHowler],
  props: {
    name: String,
    sduration: Number,
    sources: Array
  },
  data() {
    return {
      progressBar: 0,
      sliderVal: 100
    }
  },
  computed: {
    durationLabel() {
      const duration = moment.duration(this.duration || this.sduration, 'seconds')
      return moment(duration.asMilliseconds()).format('mm:ss')
    },
    timeLabel() {
      return moment(moment.duration(this.seek, 'seconds').asMilliseconds()).format('mm:ss')
    }
  },
  watch: {
    seek(newVal) {
      this.progressBar = newVal
    }
  },
  methods: {
    loadAndPlay() {
      if (!this.preload) {
        this.$data._howl.load()
      }
      this.play()
    },
    userVol(val) {
      this.setVolume(val / 100)
    },
    setPosition() {
      this.setSeek(this.progressBar)
    }
  }
}
</script>
<style>
.container-bar {
}

.player-bar {
  height: 2.5em;
}

.time {
  margin-top: -0.5em;
  white-space: nowrap;
}

.myslide {
  flex-grow: 1;
  height: 2.2em;
}

.myslide .v-slider input {
  margin-top: -0.7em !important;
}
</style>
