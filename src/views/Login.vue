<template>
  <div></div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  created() {
    this.startLogin()
  },
  methods: {
    ...mapActions('auth', ['startLogin'])
  }
}
</script>
