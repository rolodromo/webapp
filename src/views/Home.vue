<template>
    <div class='home'>
        <img src='../assets/icon-512x512.png'>
        <HelloWorld msg='Bienvenido a Rolodromo.com'/>
    </div>
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
