<template>
  <v-expansion-panel>
    <v-expansion-panel-content color='secondary'>
      <div slot='header'>
        <v-toolbar-title>Anteriores</v-toolbar-title>
      </div>
      <v-card>
        <v-divider></v-divider>
        <v-list class='logs'>
          <template v-for='(line, index) in logs'>
            <div :key='index'>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{ line.title }}</v-list-tile-title>
                  <v-list-tile-sub-title class='text--primary'>{{ line.subtitle }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>{{ line.total }}</v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if='index < logs.length -1'></v-divider>
            </div>
          </template>
        </v-list>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>

</template>

<script>
export default {
  name: 'RollLog',
  props: {
    logs: Array
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.logs {
  max-height: 30vh;
  overflow-y: auto;
}
</style>
