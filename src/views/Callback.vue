<template>
  <div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

import { parseCredentials } from '@/modules/auth/auth0'

export default {
  name: 'Callback',
  computed: {
    ...mapState({
      auth: 'auth/user'
    })
  },
  mounted() {
    this.$nextTick(async () => {
      const credentials = await parseCredentials()
      console.log('Auth0 token:', credentials)
      console.log('Credentials from URL', credentials)
      await this.saveCredentials(credentials)
      console.log('Login complete. Redirecting...')
      this.redirect()
    })
  },
  methods: {
    ...mapActions({
      saveCredentials: 'auth/saveCredentials'
    }),
    redirect() {
      this.$router.push('/')
    }
  }
}
</script>
