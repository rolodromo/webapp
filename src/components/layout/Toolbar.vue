<template>
  <v-toolbar
    color='primary white--text'
    dark
    clipped-left
    dense
    fixed
    app
    scroll-off-screen
    :scroll-threshold='48'
    scroll-toolbar-off-screen
    ref='topToolbar'
    class=' ml-0'
  >
    <logo size='small'/>
    <v-toolbar-title class='ml-0 px-2'>
      <span class='title shadow'>Rolodromo.com</span>

    </v-toolbar-title>

    <v-spacer></v-spacer>
    <div style='max-width: 50px'><spinner></spinner></div>
    <v-toolbar-side-icon class='my-0 ml-0 pl-0' @click.stop='$emit("menu:click")'></v-toolbar-side-icon>

    <!-- TODO: Add a nice extended toolbar -->
    <!--      <v-layout slot='extension' align-center>
            <v-layout row>

              <v-text-field
                @click:append='() => {}'
                placeholder='Search...'
                single-line
                append-icon='search'
                color='white'
                hide-details
              ></v-text-field>
            </v-layout>
          </v-layout>-->
  </v-toolbar>
</template>
<script>
import Spinner from '../common/Spinner'

export default {
  name: 'RolToolbar',
  components: {
    Spinner
  }
}
</script>
