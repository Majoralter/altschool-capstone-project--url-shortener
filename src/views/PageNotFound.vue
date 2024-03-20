<template>
<main>
  <img :src="require('../assets/NotFound.jpeg')" alt="">

  <h1>Looks like this page doesn't exist</h1>

  <router-link to="/">Yeah I'm sure. Go back home.</router-link>
</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageNotFound',
})
</script>

<style lang="scss" scoped>
  @import "../sass/app.scss";

  main{
    @include flex(column, center, center, 1em);
    min-height: 75dvh;
    padding: 1em;
    text-align: center;

    img{
      height: 20em;
      width: auto;
      max-width: 100%;
      object-fit: cover;
    }

    h1{
      font-size: var(--font-size-fluid-3);
      color: $black;
    }

    a{
      font-size: var(--font-size-2);
      color: $dark-gray;
    }
  }
</style>

