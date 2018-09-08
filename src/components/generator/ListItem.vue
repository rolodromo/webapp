<template>
  <v-card flat :to='generator.link' class='pb-1'>
    <v-layout column fill-height align-content-start>

      <v-flex d-flex class=' py-0 px-2' style='flex-grow: 0;'>
        <v-card-title class='secondary'>
          <div class='title force-color'>{{ generator.name }}</div>
        </v-card-title>
      </v-flex>

      <v-flex d-flex align-content-start style='flex-grow: 1;' class='py-0 px-2'>
        <v-card-text style='min-height: 8em;'>
          {{ generator.desc }}
        </v-card-text>
      </v-flex>

      <v-flex style='flex-grow: 0;' class='py-0 px-2 text--secondary text--darken-3'>
        <v-divider></v-divider>
        <v-card-actions class='ma-0 pa-2 '>
          <favorite-icon class='mr-1'
                         :user-id='userId'
                         :generator='generator'
                         @addFavorite='addFavorite'
                         @removeFavorite='removeFavorite'
          ></favorite-icon>
          <span>{{ generator.createdAt | moment('from', 'now') }}</span>
          <v-spacer></v-spacer>
          <avatar size='small' :src='generator.author.picture' :alt='generator.author.name'/>
        </v-card-actions>

      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import FavoriteIcon from './FavoriteIcon.vue'

export default {
  components: {
    FavoriteIcon
  },
  props: {
    generator: Object
  },
  computed: {
    ...mapGetters({
      userId: 'auth/userId'
    })
  },
  methods: {
    ...mapActions({
      markFav: 'generators/addLike',
      unmarkFav: 'generators/removeLike'
    }),
    addFavorite(id, userId) {
      this.markFav({ id, userId })
    },
    removeFavorite(id, userId) {
      this.unmarkFav({ id, userId })
    }
  }
}
</script>
<style scoped>
.force-color {
  color: #fff;
}
</style>
