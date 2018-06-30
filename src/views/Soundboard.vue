<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap justify-space-between>
      <v-flex xs12 md6 lg4 v-for='(sound, i) in activeSounds' :key='i'>
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
        { name: 'Inception boom', src: '//www.freesound.org/data/previews/104/104675_634166-lq.mp3' },
        { name: 'Steps', src: '//www.freesound.org/data/previews/336/336598_5121236-lq.mp3' },
        { name: 'Double Whoosh', src: '//www.freesound.org/data/previews/60/60028_71257-lq.mp3' },
        { name: 'Double Whoosh 2', src: '//www.freesound.org/data/previews/60/60018_71257-lq.mp3' },
        { name: 'Disharmony', src: '//www.freesound.org/data/previews/156/156543_1038806-lq.mp3' },
        { name: 'More Fear', src: '//www.freesound.org/data/previews/156/156542_1038806-lq.mp3' },
        { name: 'Fear.. Not', src: '//www.freesound.org/data/previews/156/156536_1038806-lq.mp3' },

        /** Animals **/
        { name: 'Bees', src: '//www.freesound.org/data/previews/73/73370_634166-lq.mp3' },
        { name: 'Crowing rooster', src: '//www.freesound.org/data/previews/384/384188_5121236-lq.mp3' },
        { name: 'Crows', src: '//www.freesound.org/data/previews/353/353432_392324-lq.mp3' },
        { name: 'Bunch of flies', src: '//www.freesound.org/data/previews/75/75189_129090-lq.mp3' },

        /** Monsters **/
        { name: 'Zombie Growl 1', src: '//www.freesound.org/data/previews/241/241748_4393722-lq.mp3' },
        { name: 'Zombie Growl 2', src: '//www.freesound.org/data/previews/326/326262_5479485-lq.mp3' },
        { name: 'Monster Cave', src: '//www.freesound.org/data/previews/188/188827_71257-lq.mp3' },
        { name: 'Monster Growls', src: '//www.freesound.org/data/previews/123/123090_1799601-lq.mp3' },
        { name: 'Monster growls 2', src: '//www.freesound.org/data/previews/165/165925_1605388-lq.mp3' },
        {
          name: 'Incomprenhensible Evil Monster',
          src: '//www.freesound.org/data/previews/273/273509_71257-lq.mp3'
        },

        { name: 'Epic Fantasy', src: '//www.freesound.org/data/previews/331/331898_3914271-lq.mp3' },
        { name: 'Epic Orchestra', src: '//www.freesound.org/data/previews/250/250856_4146089-lq.mp3' },
        { name: 'Relaxed tavern ambient', src: '//www.freesound.org/data/previews/321/321220_418555-hq.mp3' },

        /** SUSPENSE AND HORROR **/
        { name: 'Violin tremolo increcendo', src: '//www.freesound.org/data/previews/370/370937_5121236-lq.mp3' },
        { name: 'Crippy sounds and Echoes', src: '//www.freesound.org/data/previews/265/265418_1015240-lq.mp3' },
        { name: 'Haunting Ambience', src: '//www.freesound.org/data/previews/262/262352_4206277-lq.mp3' },
        { name: 'Thriller Ambience', src: '//www.freesound.org/data/previews/157/157133_1038806-lq.mp3' },
        { name: 'Scary music box', src: '//www.freesound.org/data/previews/130/130889_1648170-lq.mp3' },
        { name: 'Suspense violins', src: '//www.freesound.org/data/previews/391/391751_3914271-lq.mp3' },
        { name: 'Ghost echo sounds', src: '//www.freesound.org/data/previews/194/194748_2876313-lq.mp3' },
        { name: 'Deep Space vibration', src: '//www.freesound.org/data/previews/321/321723_5260872-lq.mp3' },

        /** BATTLE MUSIC **/
        { name: 'Pre battle music', src: '//www.freesound.org/data/previews/243/243979_2188371-lq.mp3' },
        { name: 'Battle music and drums', src: '//www.freesound.org/data/previews/331/331163_3914271-lq.mp3' },
        { name: 'March Action', src: '//www.freesound.org/data/previews/138/138681_2536305-lq.mp3' },
        { name: 'Dramatic Drums and Strings', src: '//www.freesound.org/data/previews/217/217575_2132540-lq.mp3' },

        /** TIBETAN CHANT **/
        { name: 'Chant', src: '//www.freesound.org/data/previews/15/15488_45941-lq.mp3' },
        { name: 'Tibetan Ball', src: '//www.freesound.org/data/previews/346/346328_1474204-lq.mp3' },

        /** SOUNDS LOOPS **/
        { name: 'Angry Mob', src: '//www.freesound.org/data/previews/316/316640_4557960-lq.mp3' },
        { name: 'People talking', src: '//www.freesound.org/data/previews/207/207994_1038806-lq.mp3' },
        { name: 'Ohm', src: '//www.freesound.org/data/previews/106/106561_1818884-lq.mp3' },

        { name: 'Rain2', src: '//www.freesound.org/data/previews/275/275598_2971247-lq.mp3' },
        { name: 'Rain3', src: '//www.freesound.org/data/previews/275/275597_2971247-lq.mp3' },
        { name: 'Small Waterfall', src: '//www.freesound.org/data/previews/365/365921_5121236-lq.mp3' },
        { name: 'Fast Waterfall', src: '//www.freesound.org/data/previews/76/76691_634166-lq.mp3' },
        { name: 'Night Crickets', src: '//www.freesound.org/data/previews/53/53380_407362-lq.mp3' },
        { name: 'Jungle - Day', src: '//www.freesound.org/data/previews/253/253291_2409224-lq.mp3' },
        { name: 'Hopeful Ambience', src: '//www.freesound.org/data/previews/198/198934_2440401-lq.mp3' },
        {
          name: 'Cinematic Atmospheric Element',
          src: '//www.freesound.org/data/previews/350/350891_1256155-lq.mp3'
        },
        { name: 'Descending Double Bass', src: '//www.freesound.org/data/previews/156/156538_1038806-lq.mp3' }
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
