<template>
  <v-container fluid class='dados' grid-list-md>

    <v-btn fab fixed bottom left dark color='red' class='hidden-md-and-up' @click.native.stop='newRollDialog = true'>
      <v-icon dark>add</v-icon>
    </v-btn>

    <v-layout row wrap justify-space-between>

      <v-flex xs12 style='position: relative;' text-xs-left pb-3>
        <v-layout row fluid align-baseline>
          <v-btn fab dark color='red' class='hidden-sm-and-down' @click.native.stop='newRollDialog = true'>
            <v-icon dark>add</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn flat outline icon @click='sound = !sound'>
            <v-icon>{{ sound ? 'record_voice_over' : 'voice_over_off' }}</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>

      <!-- Rolls -->
      <v-flex sm6 xs12 md3 v-for='row in rolls' :key='`${row.name}-${row.roll}`'>
        <roll :name='row.name' :roll='row.roll' @roll='log' @remove='removeRoll'></roll>
      </v-flex>

      <v-flex xs12 class='logs'>
        <roll-log :logs='logs'></roll-log>
      </v-flex>

    </v-layout>

    <add-roll :open='newRollDialog' @close='newRollDialog=false' @save='addRoll'></add-roll>

  </v-container>
</template>

<script>
import Roll from '@/components/dice/RollCard.vue'
import NewRollDialog from '@/components/dice/NewRollDialog'
import RollLog from '@/components/dice/RollLog'
import { isEqual, remove } from 'lodash'

export default {
  name: 'dice',
  metaInfo: {
    title: 'Dados'
  },
  components: {
    Roll,
    'add-roll': NewRollDialog,
    'roll-log': RollLog
  },
  data() {
    return {
      sound: false,
      speaker: null,
      newRollDialog: false,
      logs: [],
      rolls: [
        { name: 'Salvacion ventaja', roll: 'mejores 1 de 2d20' },
        { name: 'Bola de fuego', roll: '3d6' },
        { name: 'Daño Espada', roll: '2d10' }
      ]
    }
  },
  methods: {
    speak(txt) {
      // cheaper than https://igorbezsmertnyi.github.io/speech-demo/synthesis
      const msg = new window.SpeechSynthesisUtterance()
      // TODO: move to config
      msg.lang = 'es-ES'
      msg.text = txt
      msg.volume = 1
      msg.rate = 1.5
      msg.pitch = 0.8
      if (speechSynthesis.speaking) speechSynthesis.cancel()

      speechSynthesis.speak(msg)
    },
    log(roll) {
      if (this.sound) {
        this.speak(`${roll.data.total}`)
      }
      this.logs.unshift({
        title: roll.name,
        subtitle: roll.data.rolls.join(', '),
        total: roll.data.total
      })
    },
    removeRoll(index) {
      this.rolls = remove(this.rolls, row => !isEqual(index, row))
    },
    addRoll(data) {
      this.rolls.push(data)
      this.newRollDialog = false
    }
  }
}
</script>
<style scoped>
.dados {
  min-height: 80vh;
}
</style>
