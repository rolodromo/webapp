<template>
  <v-container fluid fill-height grid-list-xl>
    <v-slide-x-transition>
      <v-layout row wrap align-center justify-center justify-content-center>
        <v-flex xs12>
          <v-card flat class='transparent text-xs-center py-0'>
            <logo size='big' class='mt-3 mb-3'/>
            <rol-header msg='Bienvenido a Rolodromo.com'/>
          </v-card>
        </v-flex>

        <v-flex xs12 md4 class='pa-3'>
          <featured-card
            :to='{ name: "generators" }'
            gi-icon='gi-tied-scroll'
            image-url='/img/featured/generators.jpg'
            title='Generadores'
          />
        </v-flex>

        <v-flex xs12 md4 class='pa-3'>
          <featured-card
            :to='{ name: "soundboard" }'
            gi-icon='gi-sound-waves'
            image-url='/img/featured/sounds.jpg'
            title='Sonidos'
          />
        </v-flex>

        <v-flex xs12 md4 class='pa-3'>
          <featured-card
            :to='{ name: "dice" }'
            gi-icon='gi-rolling-dices'
            image-url='/img/featured/dice.jpg'
            title='Dados'
          />
        </v-flex>


        <v-flex xs12 md4 class='pa-3'>
          <featured-card
            :to='{ name: "storycubes" }'
            gi-icon='gi-rolling-dices'
            image-url='/img/featured/storycubes.jpg'
            title='Storycubes'
          />
        </v-flex>

      </v-layout>
    </v-slide-x-transition>
  </v-container>
</template>

<script>
import RolHeader from '@/components/layout/Header.vue'
import FeaturedCard from '@/components/layout/FeaturedCard.vue'

export default {
  name: 'Home',
  metaInfo: {
    title: 'Home'
  },
  components: {
    RolHeader,
    FeaturedCard
  },
  methods: {}
}
</script>
