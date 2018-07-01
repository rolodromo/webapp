<template>
  <div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import { parseCredentials } from '@/modules/auth/auth0'

export default {
  name: 'Callback',
  computed: {
    ...mapGetters({
      returnUrl: 'auth/returnUrl'
    })
  },
  mounted() {
    this.$nextTick(async () => {
      const credentials = await parseCredentials()
      console.log('Auth0 token:', credentials)
      console.log('Credentials from URL', credentials)
      await this.saveCredentials(credentials)
      this.redirect()
    })
  },
  methods: {
    ...mapActions({
      saveCredentials: 'auth/saveCredentials'
    }),
    redirect() {
      console.log('Login complete. Redirecting...', this.returnUrl)
      this.$router.replace(this.returnUrl)
    }
  }
}
</script>
