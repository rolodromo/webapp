<template>
  <v-btn  dark fab color='red' class='generate' @click.native='generate()'>
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
.generate {
  /*bottom: 1.5em;*/
  top: 1.3em;
  position: absolute;
  right: 0.2em;
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
