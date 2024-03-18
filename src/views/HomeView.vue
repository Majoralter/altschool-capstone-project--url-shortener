<template>
  <main>
    <section class="hero__section">
      <h1>Ditch the lengthy links. <br><span>Generate clicks.</span></h1>

      <p>Simplify your links and create QR codes effortlessly. Whether you need to share <br>URLs or create QR codes for
        easy scanning, we've got you covered.</p>

      <ul class="hero__section-cta">
        <li><router-link to="/" class="sign-up__cta">Get started for free</router-link></li>
        <li><router-link to="/" class="test__cta">Try on guest account</router-link></li>
      </ul>
    </section>

    <section class="features__section">
      
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: {
  },

  setup() {
  }
});
</script>


<style lang="scss" scoped>
@import "../sass/app.scss";

main {
  @include flex(column, center, center, 0);

  .hero__section {
    height: 80dvh;
    @include flex(column, center, center, 2em);
    text-align: center;

    h1 {
      font-size: var(--font-size-fluid-3);
      color: $black;
      line-height: 1.25;

      span {
        font-style: italic;
        color: $green;
      }
    }

    p {
      color: $dark-gray;
      font-size: var(--font-size-3);
    }

    &-cta {
      @include flex(row, center, center, 1em);

      li {
        a {
          font-size: var(--font-size-3);
          color: $black;
          padding: 8px 24px;
          border-radius: var(--radius-2);
          background-color: $gray;
        }

        .sign-up__cta {
          background-color: $black;
          color: $white;
        }
      }
    }
  }
}

@media (max-width: 560px) {
  main {
    .hero__section {
      p {
        br {
          display: none;
        }
      }

      &-cta{
        flex-direction: column;
        width: 90%;

        li{
          width: 100%;
          text-align: center;
          a{
            display: inline-block;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>