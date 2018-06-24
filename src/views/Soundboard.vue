<template>
  <v-container fluid class='soundboard' grid-list-lg>
    <v-layout row wrap justify-space-between>
      <v-flex xs12 md6 lg4  v-for='(sound, i) in activeSounds' :key='i'>
        <audio-player :name='sound.name' :sources='[sound.src]' :loop='true'/>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      sounds: [
        /** SOUND EFFECTS **/
        { name: '', src: '' },
        { name: 'Inception boom', src: 'http://www.freesound.org/data/previews/104/104675_634166-lq.mp3' },
        { name: 'Steps', src: 'http://www.freesound.org/data/previews/336/336598_5121236-lq.mp3' },
        { name: 'Double Whoosh', src: 'http://www.freesound.org/data/previews/60/60028_71257-lq.mp3' },
        { name: 'Double Whoosh 2', src: 'http://www.freesound.org/data/previews/60/60018_71257-lq.mp3' },
        { name: 'Disharmony', src: 'http://www.freesound.org/data/previews/156/156543_1038806-lq.mp3' },
        { name: 'More Fear', src: 'http://www.freesound.org/data/previews/156/156542_1038806-lq.mp3' },
        { name: 'Fear.. Not', src: 'http://www.freesound.org/data/previews/156/156536_1038806-lq.mp3' },

        /** Animals **/
        { name: 'Bees', src: 'http://www.freesound.org/data/previews/73/73370_634166-lq.mp3' },
        { name: 'Crowing rooster', src: 'http://www.freesound.org/data/previews/384/384188_5121236-lq.mp3' },
        { name: 'Crows', src: 'http://www.freesound.org/data/previews/353/353432_392324-lq.mp3' },
        { name: 'Bunch of flies', src: 'http://www.freesound.org/data/previews/75/75189_129090-lq.mp3' },

        /** Monsters **/
        { name: 'Zombie Growl 1', src: 'http://www.freesound.org/data/previews/241/241748_4393722-lq.mp3' },
        { name: 'Zombie Growl 2', src: 'http://www.freesound.org/data/previews/326/326262_5479485-lq.mp3' },
        { name: 'Monster Cave', src: 'http://www.freesound.org/data/previews/188/188827_71257-lq.mp3' },
        { name: 'Monster Growls', src: 'http://www.freesound.org/data/previews/123/123090_1799601-lq.mp3' },
        { name: 'Monster growls 2', src: 'http://www.freesound.org/data/previews/165/165925_1605388-lq.mp3' },
        {
          name: 'Incomprenhensible Evil Monster',
          src: 'http://www.freesound.org/data/previews/273/273509_71257-lq.mp3'
        },

        { name: 'Epic Fantasy', src: 'http://www.freesound.org/data/previews/331/331898_3914271-lq.mp3' },
        { name: 'Epic Orchestra', src: 'http://www.freesound.org/data/previews/250/250856_4146089-lq.mp3' },
        { name: 'Relaxed tavern ambient', src: 'http://www.freesound.org/data/previews/321/321220_418555-hq.mp3' },

        /** SUSPENSE AND HORROR **/
        {
          name: 'Violin tremolo increcendo',
          src: 'http://www.freesound.org/data/previews/370/370937_5121236-lq.mp3'
        },
        { name: 'Crippy sounds and Echoes', src: 'http://www.freesound.org/data/previews/265/265418_1015240-lq.mp3' },
        { name: 'Haunting Ambience', src: 'http://www.freesound.org/data/previews/262/262352_4206277-lq.mp3' },
        { name: 'Thriller Ambience', src: 'http://www.freesound.org/data/previews/157/157133_1038806-lq.mp3' },
        { name: 'Scary music box', src: 'http://www.freesound.org/data/previews/130/130889_1648170-lq.mp3' },
        { name: 'Suspense violins', src: 'http://www.freesound.org/data/previews/391/391751_3914271-lq.mp3' },
        { name: 'Ghost echo sounds', src: 'http://www.freesound.org/data/previews/194/194748_2876313-lq.mp3' },
        { name: 'Deep Space vibration', src: 'http://www.freesound.org/data/previews/321/321723_5260872-lq.mp3' },

        /** BATTLE MUSIC **/
        { name: 'Pre battle music', src: 'http://www.freesound.org/data/previews/243/243979_2188371-lq.mp3' },
        { name: 'Battle music and drums', src: 'http://www.freesound.org/data/previews/331/331163_3914271-lq.mp3' },
        { name: 'March Action', src: 'http://www.freesound.org/data/previews/138/138681_2536305-lq.mp3' },
        {
          name: 'Dramatic Drums and Strings',
          src: 'http://www.freesound.org/data/previews/217/217575_2132540-lq.mp3'
        }
      ]
    }
  },
  computed: {
    activeSounds() {
      return this.sounds.filter(snd => snd.src)
    }
  }
}
</script>
