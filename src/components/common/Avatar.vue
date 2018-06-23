<template>
  <v-avatar :size='avatarSize'>
    <img :src='src' :alt='alt'/>
  </v-avatar>
</template>
<script>
export default {
  props: {
    src: {
      type: String
    },
    size: {
      type: String,
      default: 'normal'
    },
    alt: {
      type: String,
      default: ''
    }
  },
  computed: {
    avatarSize() {
      switch (this.size) {
        case 'small':
          return '32'
        case 'normal':
          return '50'
      }
    }
  }
}
</script>
