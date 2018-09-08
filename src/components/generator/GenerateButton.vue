<template>
  <v-btn dark fab color='red' :class='generateClass' @click.native='generate()'>
    <transition name='spin'>
      <icon v-if='counter > 0' name='sync-alt' scale='1.75'></icon>
    </transition>
  </v-btn>
</template>
<script>
export default {
  data() {
    return {
      counter: 1
    }
  },
  computed: {
    generateClass() {
      return this.$vuetify.breakpoint.smAndDown ? 'generate-sm' : 'generate-big'
    }
  },
  methods: {
    generate() {
      this.$emit('generate')
      this.counter = 0
      this.$nextTick(() => {
        this.counter = 1
      })
    }
  }
}
</script>
<style scoped>
.generate-sm {
  top: 6.5em;
  position: absolute;
  right: 0em;
  z-index: 3;
}

.generate-big {
  top: 6.5em;
  position: absolute;
  right: 2.5em;
  z-index: 3;
}

.spin-enter-active {
  animation: spin 0.3s;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
