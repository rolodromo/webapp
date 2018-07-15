<template>
  <a class='logo text-xs-center' href='/' title='Rolodromo.com'>
    <img :class='classSize' src='/img/icons/icon-512x512.png' alt='Rolodromo.com' />
  </a>
</template>
<script>
export default {
  name: 'logo',
  props: {
    size: {
      type: String,
      default: 'normal'
    }
  },
  computed: {
    classSize() {
      return `size-${this.size.trim().toLowerCase()}`
    }
  }
}
</script>
<style scoped>
.size-small {
  margin-top: 5px;
  max-width: 30px;
  max-height: 30px;
}

.size-normal {
  max-width: 90px;
  max-height: 90px;
}

.size-big {
  max-width: 192px;
  max-height: 192px;
}
</style>
