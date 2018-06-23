<template>
  <v-snackbar
    :timeout='toast.timeout'
    :top='toast.top'
    :bottom='toast.bottom'
    :color='color'
    :multi-line='true'
    :vertical='false'
    v-model='snackbar'
  >
    {{toast.message}}
    <v-spacer></v-spacer>
    <v-btn flat dark @click.native='close'>
      <v-icon>clear</v-icon>
    </v-btn>
  </v-snackbar>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      timer: null,
      snackbar: false
    }
  },
  computed: {
    color() {
      switch (this.toast.type) {
        case 'success':
        case 'error':
          return this.toast.type

        default:
          return 'info'
      }
    },
    ...mapState('toast', {
      toast: 'data'
    })
  },
  watch: {
    toast: function(val) {
      if (val.show) {
        this.snackbar = true
      }

      if (!val.show) return

      this.timer = setTimeout(this.close, val.timeout + 100)
    }
  },
  methods: {
    ...mapMutations('toast', ['hide']),
    close() {
      this.snackbar = false
      clearTimeout(this.timer)
      this.hide()
    }
  }
}
</script>
