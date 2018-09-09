<template>
  <v-card flat class='pb-1' :to='link'>
    <clip-btn
      :element='element'
      :type='element.type'
    />
    <v-layout column fill-height align-content-start>
      <v-flex d-flex class=' py-0 px-2' style='flex-grow: 0;'>
        <v-card-title class='title secondary white--text'>{{ element.name }}</v-card-title>
      </v-flex>

      <v-flex v-if='isSound' d-flex align-content-start style='flex-grow: 1;' class='py-0 px-2'>
        <v-card-text style='min-height: 8em;'>
          {{ element.tags.join(', ') }}
        </v-card-text>
      </v-flex>

      <v-flex v-if='isGenerator' d-flex align-content-start style='flex-grow: 1;' class='py-0 px-2'>
        <v-card-text style='min-height: 8em;'>
          {{ element.desc }}
        </v-card-text>
      </v-flex>

    </v-layout>
  </v-card>
</template>

<script>
import ClipBtn from '@/components/common/ClipBtn'

export default {
  name: 'ClipItem',
  components: { ClipBtn },
  props: {
    element: Object
  },
  computed: {
    link() {
      return this.element.link || {}
    },
    isGenerator() {
      return this.element.type === 'generator'
    },
    isSound() {
      return this.element.type === 'sound'
    }
  }
}
</script>
