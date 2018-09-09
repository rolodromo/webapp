<template>
  <v-layout justify-center>
    <v-wait>
      <orbit-spinner
        slot='waiting'
        :animation-duration='1500'
        :size='controlSize'
        :color='color'
      />
    </v-wait>
  </v-layout>
</template>

<script>
import { OrbitSpinner } from 'epic-spinners'
import { toNumber } from 'lodash'
export default {
  name: 'Spinner',
  props: {
    dark: Boolean,
    size: {
      type: [String, Number]
    }
  },
  components: {
    OrbitSpinner
  },
  computed: {
    controlSize() {
      return toNumber(this.size) || 25
    },
    color() {
      return this.dark ? this.$vuetify.theme.primary : this.$vuetify.theme.amber
    }
  }
}
</script>
