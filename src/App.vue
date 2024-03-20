<template>
  <Nav />
  <router-view/>
  <Footer />
</template>

<script lang="ts"> 
import { defineComponent, onMounted, ref } from 'vue';
import Nav from './components/Nav.vue';
import Footer from './components/Footer.vue';
import { useGetCurrentUser } from './composables/useGetCurrentUser';

export default defineComponent({
  name: 'App',
  components: {
    Nav,
    Footer
  },
})
</script>

<style lang="scss">
@import "./sass/app.scss"
</style>
