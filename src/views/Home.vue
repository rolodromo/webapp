<template>
  <v-container fluid>
    <v-slide-y-transition mode='out-in'>
      <v-layout column align-center>
        <img src='../assets/icon-512x512.png' class='mb-5'>
        <HelloWorld msg='Bienvenido a Rolodromo.com'/>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
