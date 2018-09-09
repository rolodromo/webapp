<template>
  <div style='text-align: center;'>
    <div class='display-1 font-weight-bold'>{{ msg }}</div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String
  }
}
</script>
