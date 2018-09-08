<template>
  <a @click.prevent='triggerFavorite'>
    <v-icon v-if='isFavorite'
            :color='color'
            @mouseover='hover=true'
            @mouseout='hover=false'
    >{{ icon }}</v-icon>
    <v-icon v-else
            :color='color'
            @mouseover='hover=true'
            @mouseout='hover=false'
    >{{ icon }}</v-icon>
  </a>
</template>

<script>
export default {
  name: 'FavoriteIcon',
  props: {
    generator: Object,
    userId: String
  },
  data() {
    return {
      hover: null,
      color: '',
      icon: ''
    }
  },
  computed: {
    isFavorite() {
      return this.userId && this.generator.likes && this.generator.likes.includes(this.userId)
    }
  },
  watch: {
    hover(newVal) {
      if (this.isFavorite) {
        this.color = newVal ? 'yellow' : 'red'
        this.icon = 'favorite'
      } else {
        this.color = newVal ? 'yellow' : 'grey'
        this.icon = newVal ? 'favorite' : 'favorite_border'
      }
    }
  },
  created() {
    this.hover = false
  },
  methods: {
    triggerFavorite() {
      if (this.isFavorite) {
        this.$emit('removeFavorite', this.generator.id, this.userId)
      } else {
        this.$emit('addFavorite', this.generator.id, this.userId)
      }
    }
  }
}
</script>

<style scoped>
</style>
