<template>
  <nav>
    <router-link to="/" class="logo">
      Scissor
    </router-link>

    <ul class="nav__links--desktop">
      <li><a href="#features">Features</a></li>
      <li><a href="#faqs">FAQs</a></li>
    </ul>

    <ul class="nav__cta--desktop">
      <li><router-link to="/" class="login__link--desktop">Login</router-link></li>
      <li><router-link to="/" class="sign-up__link--desktop">Sign up for free</router-link></li>
    </ul>

    <MenuButton @click-event="openCloseMobileNav" :class="{ active: active, 'disable': windowWidth > 560 }" />

    <div class="nav__items--mobile" :class="{ active: active }">
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#faqs">FAQs</a></li>
        <li><router-link to="/">Login</router-link></li>
        <li><router-link to="/">Sign up</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, onBeforeMount } from 'vue';
import MenuButton from "../components/MenuButton.vue"
export default defineComponent({
  name: 'Nav',

  components: {
    MenuButton
  },

  setup() {
    const active = ref(false),
      windowWidth = ref(0)

    const openCloseMobileNav = (): void => {
      active.value = !active.value
    }

    onBeforeMount(() => {
      windowWidth.value = window.innerWidth
    })

    onMounted(() => {
      window.addEventListener("resize", () => {
        windowWidth.value = window.innerWidth
      })
    })

    onBeforeUnmount(() => {
      window.removeEventListener("resize", () => { })
    })

    return { openCloseMobileNav, active, windowWidth }
  }
})
</script>

<style lang="scss" scoped>
@import '../sass/app.scss';

nav {
  @include flex(row, center, space-between, 0);
  padding: var(--size-fluid-2) var(--size-fluid-4);
  position: relative;

  .logo {
    font-size: var(--font-size-5);
    color: $black;
  }

  ul {
    @include flex(row, center, center, 1em);
  }

  .nav__links--desktop {
    li {
      a {
        color: $black;
        font-weight: 500;
        font-size: var(--font-size-3);

        &:hover {
          &::after {
            width: 100%;
          }
        }

        &::after {
          content: "";
          display: block;
          height: 2px;
          background-color: $black;
          width: 0;
          transition: all .3s var(--ease-3);
          border-radius: var(--radius-2);
        }
      }
    }
  }

  .nav__cta--desktop {
    li {
      a {
        font-size: var(--font-size-3);
      }

      .login__link--desktop {
        color: $black;
        transition: all .3s var(--ease-3);

        &:hover {
          color: $green;
        }
      }

      .sign-up__link--desktop {
        color: $black;
        background-color: $green;
        border: solid var(--border-size-1) $light-green;
        padding: 8px 24px;
        border-radius: var(--radius-2);
      }
    }
  }

  .nav__items--mobile {
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translate(-50%, -200%);
    background-color: $white;
    box-shadow: var(--shadow-2);
    border-radius: var(--radius-2);
    width: 90%;
    transition: all .5s var(--ease-3);
    opacity: 0;

    &.active{
      transform: translate(-50%, 0);
      opacity: 1;
    }

    ul {
      width: 100%;
      @include flex(column, center, center, 1em);
      padding-block: var(--size-4);

      li {
        width: 100%;
        text-align: center;

        a {
          display: inline-block;
          width: 90%;
          padding-block: 8px;
          font-size: var(--font-size-3);
          color: $black;
        }
      }

      li:last-of-type {
        a {
          background-color: $green;
          border-radius: var(--radius-2);
        }
      }
    }
  }
}

@media (max-width: 560px) {
  nav {

    .nav__cta--desktop,
    .nav__links--desktop {
      display: none;
    }
  }
}
</style>
