<template>
  <div class='display-1 font-weight-bold'>{{ msg }}</div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String
  }
}
</script>
