<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap justify-space-between>

      <v-flex xs12 text-xs-left pb-3>
        <v-layout row fluid align-baseline>
          <v-spacer></v-spacer>
          <v-btn color='red' dark icon @click='openSearchBox'>
            <v-icon>search</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>

      <v-flex xs12 md6 lg4 v-for='(sound, i) in activeSounds' :key='i'>
        <audio-player :name='sound.name' :preload='false' :sources='sound.src' :loop='true'/>
      </v-flex>

      <sound-search-dialog :searchbox.sync='searchbox' @save='saveSearch'></sound-search-dialog>

    </v-layout>
  </v-container>
</template>
<script>
import SoundSearchDialog from '@/components/soundboard/SoundSearchDialog.vue'

export default {
  components: {
    SoundSearchDialog
  },
  metaInfo: {
    title: 'Sonidos'
  },
  data() {
    return {
      searchbox: false,
      sounds: [
        { name: 'Crows', src: ['//www.freesound.org/data/previews/353/353432_392324-lq.mp3'] },
        { name: 'Epic Fantasy', src: ['//www.freesound.org/data/previews/331/331898_3914271-lq.mp3'] },
        { name: 'Relaxed tavern ambient', src: ['//www.freesound.org/data/previews/321/321220_418555-hq.mp3'] },
        { name: 'Haunting Ambience', src: ['//www.freesound.org/data/previews/262/262352_4206277-lq.mp3'] },
        { name: 'Pre battle music', src: ['//www.freesound.org/data/previews/243/243979_2188371-lq.mp3'] },
        { name: 'Ohm', src: ['//www.freesound.org/data/previews/106/106561_1818884-lq.mp3'] },
        { name: 'Fast Waterfall', src: ['//www.freesound.org/data/previews/76/76691_634166-lq.mp3'] },
        { name: 'Night Crickets', src: ['//www.freesound.org/data/previews/53/53380_407362-lq.mp3'] },
        {
          name: 'Cinematic Atmospheric Element',
          src: ['//www.freesound.org/data/previews/350/350891_1256155-lq.mp3']
        },
        { name: 'Deep Space vibration', src: ['//www.freesound.org/data/previews/321/321723_5260872-lq.mp3'] }
      ]
    }
  },
  computed: {
    activeSounds() {
      return this.sounds.filter(snd => snd.src)
    }
  },
  methods: {
    openSearchBox() {
      this.searchbox = true
    },
    saveSearch(list) {
      this.sounds = this.sounds.concat(list)
      this.searchbox = false
    }
  }
}
</script>
