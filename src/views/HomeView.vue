<template>
  <main>
    <section class="hero__section">
      <h1>Ditch the lengthy links. <br><span>Generate clicks.</span></h1>

      <p>Simplify your links and create QR codes effortlessly. Whether you need to share <br>URLs or create QR codes for
        easy scanning, we've got you covered.</p>

      <ul class="hero__section-cta">
        <li><router-link to="/authenticate/sign-up" class="sign-up__cta">Get started for free</router-link></li>
        <li><router-link to="/" class="test__cta">Try on guest account</router-link></li>
      </ul>
    </section>

    <section class="features__section" id="features">
      <h2>Enjoy the best features with a Scissor account</h2>
      <div class="features">
        <div class="feature" v-for="item in featureItems" :key="item.title">
          <img :src="require(`../assets/${item.iconSrc}`)" alt="">
          <h3>{{ item.title }}</h3>
          <p>{{ item.body }}</p>
        </div>
      </div>
    </section>

    <section class="faq__section" id="faqs">
      <h2>Frequently Asked Questions</h2>

      <div class="faqs">
        <div class="faq" v-for="(item, index) in faqItems" :key="item.id">
          <span :class="{ active: index === activeIndex }" @click="setActiveIndex(item.id)">{{ item.q }}</span>
          <Loader spanDimension="20px" v-if="index === activeIndex && showLoader" />
          <span v-else-if="index === activeIndex && !showLoader">{{ item.a }}</span>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { Ref } from 'vue';
import { faqs } from '@/composables/faq';
import Loader from '@/components/Loader.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    Loader
  },

  setup() {
    const featureItems = ref([
      {
        iconSrc: 'flowbite_link-solid.png',
        title: 'Url shortening',
        body: 'Shorten URLs instantly. Share long links effortlessly.'
      },
      {
        iconSrc: 'gridicons_customize.png',
        title: 'Custom URLs',
        body: 'Personalize your links. Create custom URLs tailored to your brand.'
      },
      {
        iconSrc: 'ri_qr-code-line.png',
        title: 'QR code generator',
        body: 'Generate QR codes instantly. Simplify sharing with QR technology.'
      },
      {
        iconSrc: 'mdi_analytics.png',
        title: 'Analytics',
        body: 'Track link performance. Gain insights with powerful analytics.'
      }
    ]),
      faqItems = ref(faqs),
      activeIndex: Ref<Number> = ref(0),
      showLoader: Ref<Boolean> = ref(false)

    const setActiveIndex = (id: number): void => {
      showLoader.value = true
      activeIndex.value = id

      setTimeout(() => {
        showLoader.value = false
      }, 700)
    }

    return { featureItems, faqItems, activeIndex, showLoader, setActiveIndex }
  }
});
</script>


<style lang="scss" scoped>
@import "../sass/app.scss";

main {
  @include flex(column, center, center, 0);
  margin-bottom: var(--size-5);

  .hero__section {
    height: 90dvh;
    @include flex(column, center, center, 2em);
    text-align: center;

    h1 {
      font-size: clamp(2.5rem, 5vw, 8rem);
      ;
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

  .features__section,
  .faq__section {
    margin-bottom: var(--size-8);
  }

  .features__section {
    @include flex(column, center, center, 2em);
    text-align: center;

    h2 {
      color: $black;
      font-size: var(--font-size-5);
    }

    .features {
      @include flex(row, center, center, 1em);
      flex-wrap: wrap;


      .feature {
        background-color: $white;
        padding: 1em;
        width: calc(20% - 2em);
        box-shadow: var(--shadow-1);
        @include flex(column, flex-start, flex-start, .5em);
        text-align: left;
        border-radius: var(--radius-2);

        h3 {
          font-size: var(--font-size-3);
          color: $black;
        }

        p {
          font-size: var(--font-size-2);
          color: $dark-gray;
        }

        &:hover {
          background-color: $gray;
        }
      }
    }
  }

  .faq__section {
    @include flex(column, center, center, 2em);
    width: 100%;
    height: 80dvh;

    h2 {
      color: $black;
      font-size: var(--font-size-5);
    }

    .faqs {
      @include flex(column, center, flex-start, 1em);
      width: 60%;

      .faq {
        width: 100%;
        @include flex(column, flex-start, flex-start, .5em);
        transition: all .3s var(--ease-3);

        span {
          font-size: var(--font-size-3);

          &:nth-child(1) {
            color: $matte-black;
            cursor: pointer;

            &.active {
              padding: .4em;
              background-color: $green;
              border-radius: var(--radius-1) var(--radius-3) var(--radius-3) var(--radius-3);
            }
          }

          &:nth-child(2) {
            color: $white;
            background-color: $black;
            padding: .4em;
            border-radius: var(--radius-3) var(--radius-1) var(--radius-3) var(--radius-3);
          }
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

      &-cta {
        flex-direction: column;
        width: 90%;

        li {
          width: 100%;
          text-align: center;

          a {
            display: inline-block;
            width: 100%;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  main {
    .features__section {
      .features {
        width: 100%;

        .feature {
          width: calc(100% - 2em);
        }
      }
    }

    .faq__section{
      .faqs{
        width: 90%;
      }
    }
  }
}
</style>