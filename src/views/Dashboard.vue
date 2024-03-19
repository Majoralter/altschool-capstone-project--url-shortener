<template>
  <main>
    <div class="sidebar">
      <MenuButton @click-event="openCloseSidebar" :class="{ active: isSidebarActive }" />

      <div class="sidebar--content" v-if="isSidebarActive">
        <button v-for="(item, index) in sidebarItems" :key="item" @click="setCurrentActiveTab(index)">
          {{ item }}
        </button>
      </div>
    </div>

    <div class="content">
      <div class="url--field" v-if="currentActiveTab === 0">
          <h2>
            Here's that link! <span>{{ shortURL }}</span>
          </h2>
          <button>copy</button>
        </div>

      <form v-if="currentActiveTab === 0" class="form--one" @submit.prevent="shortenLink(URLRef)">
        <div class="fields">
          <h1>Shorten URL</h1>
          <div class="field">
            <label for="url">URL</label>
            <input type="text" id="url" v-model="URLRef">
          </div>

          <button :disabled="!shortURL">
            <Loader span-dimension="20px" v-if="isLoading" />
            <span v-else>Shorten</span>
          </button>
        </div>
      </form>

      <form v-if="currentActiveTab === 1">
        Hello code
      </form>

      <table v-if="currentActiveTab === 2">
        Hello table!
      </table>

      <table v-if="currentActiveTab === 3">
        Hello second Table!
      </table>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { Ref } from 'vue';
import MenuButton from '@/components/MenuButton.vue';
import Loader from '@/components/Loader.vue';

export default defineComponent({
  name: 'Dashboard',

  components: {
    MenuButton,
    Loader
  },

  setup() {
    const sidebarItems: Ref<string[]> = ref([
      'Create new url',
      'New QR code',
      'Your links',
      'Analytics'
    ]),
      currentActiveTab: Ref<number> = ref(0),
      isSidebarActive: Ref<boolean> = ref(true),
      isLoading: Ref<boolean> = ref(false),
      URLRef: Ref<string> = ref(""),
      shortURL: Ref<string> = ref("")

    const openCloseSidebar = (): void => {
      isSidebarActive.value = !isSidebarActive.value
    }

    const setCurrentActiveTab = (i: number): void => {
      currentActiveTab.value = i
    }

    const shortenLink = async (urlString: string) => {
      isLoading.value = true
      const url: string = 'https://url-shortener-service.p.rapidapi.com/shorten',
        options = {
          method: 'POST',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': `${process.env.VUE_APP_RAPID_API_KEY}`,
            'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
          },
          body: new URLSearchParams({
            url: urlString
          })
        }

      await fetch(url, options)
        .then(res => res.json())
        .then((data) => {
          isLoading.value = false
          shortURL.value = data.result_url
        })
        .catch(error => console.log(error.message))
    }

    return {
      sidebarItems,
      currentActiveTab,
      isSidebarActive,
      isLoading,
      setCurrentActiveTab,
      openCloseSidebar,
      shortenLink,
      URLRef,
      shortURL
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../sass/app.scss";

main {
  height: 75dvh;
  min-height: 75dvh;
  @include flex(row, flex-start, flex-start, 2em);
  transition: all .3s var(--ease-3);
  padding-inline: var(--size-fluid-4);

  .content {
    width: 85%;
    height: 100%;
    padding-inline: 1em;
    @include flex(column, center, center, 1em);

    .url--field{
      background-color: $white;
      box-shadow: var(--shadow-1);
      padding: .5em 1em;
      @include flex(column, center, center, .4em);

      button{
        width: 100%;
        padding-block: 8px;
        border: none;
        border-radius: var(--radius-1);
        background-color: $matte-black;
        color: $white;
      }

      h2{
        font-size: var(--font-size-3);

        span{
          display: inline-block;
          padding: .4em;
          background-color: $green;
          color: $matte-black;
          font-style: italic;
          border-radius: var(--radius-1);
        }
      }
    }

    form,
    table {
      width: 100%;
    }

    .form--one {
      @include flex(column, center, center, 0);

      .fields {
        @include flex(column, center, center, 1em);
        width: 40%;
        box-shadow: var(--shadow-2);
        background-color: $white;
        padding: 1em;

        button {
          width: 100%;
          border: none;
          color: $black;
          background-color: $green;
          cursor: pointer;
          padding-block: 8px;
          font-size: var(--font-size-3);
          border-radius: var(--radius-2)
        }

        .field {
          @include flex(column, flex-start, flex-start, .4em);
          width: 100%;

          label,
          input {
            width: 100%;
            font-size: var(--font-size-2);
            color: $black;
          }

          input {
            padding: 8px;
            border-radius: var(--radius-2);
            border: solid var(--border-size-1) $dark-gray;
          }
        }
      }
    }
  }

  .sidebar {
    height: fit-content;
    @include flex(column, flex-start, flex-start, 2em);
    background-color: $white;
    box-shadow: var(--shadow-2);
    padding: 1em .75em;
    border-radius: var(--radius-2);


    &--content {
      @include flex(column, center, center, 1em);

      button {
        width: 100%;
        padding: 8px 12px;
        cursor: pointer;
        background-color: $matte-black;
        color: $white;
        border: none;
        border-radius: var(--radius-1);
        font-size: var(--font-size-2);
      }
    }
  }
}
</style>

