<template>
  <Nav />
  <router-view/>
  <Footer />
</template>

<script lang="ts"> 
import { defineComponent } from 'vue';
import Nav from './components/Nav.vue';
import Footer from './components/Footer.vue';

export default defineComponent({
  name: 'App',
  components: {
    Nav,
    Footer
  }
})
</script>

<style lang="scss">
@import "./sass/app.scss"
</style>
