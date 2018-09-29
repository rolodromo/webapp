<template>
  <a class='logo text-xs-center' href='/' title='Rolodromo.com'>
    <img :class='classSize' src='/images/icons/icon-512x512.png' alt='Rolodromo.com' />
  </a>
</template>
<script>
export default {
  name: 'Logo',
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
/** TO USE WITH CSS LOGO **/
/*.square {
  color: #f9d27c;
  font-size: 9.15em;
  height: 4.1em;
  font-weight: bold;
  padding: 0;
  text-align: center;
  line-height: 0.94em;
  border-radius: 0.15em;
  margin-top: 0.96em;
}
.square-border {
  color: #f9d27c;
  border: 10px solid #f9d27c;
  display: inline-block;
  padding: 0;
  border-radius: 1em;
  line-height: 0.5em;
  height: 9.6em;
  margin-top: 1em;
  padding-left: 0.2em;
  padding-right: 0.2em;
}*/

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
