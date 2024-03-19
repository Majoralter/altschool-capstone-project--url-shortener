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
      <div class="url--field" v-if="currentActiveTab === 0 && isShortLinkCreated">
        <h2>
          Here's that link! <span>{{ shortURL }}</span>
        </h2>
        <button @click="copyToClipboard(shortURL)">copy</button>
      </div>

      <form v-if="currentActiveTab === 0" class="form--one" @submit.prevent="shortenLink(URLRef)">
        <div class="fields">
          <h1>Shorten URL</h1>
          <div class="field">
            <label for="url">URL</label>
            <input type="text" id="url" v-model="URLRef" required>
          </div>

          <button>
            <Loader span-dimension="20px" v-if="isLoading" />
            <span v-else>Shorten</span>
          </button>
        </div>
      </form>

      <form v-if="currentActiveTab === 1" class="form--one" @submit.prevent="generateQRCode(URLRef)">
        <div class="fields">
          <h1>Generate QR Code</h1>
          <div class="field">
            <label for="url">URL</label>
            <input type="text" id="url" v-model="URLRef" required>
          </div>

          <button>
            <Loader span-dimension="20px" v-if="isLoading" />
            <span v-else>Generate</span>
          </button>
        </div>
      </form>

      <table v-if="currentActiveTab === 2">
        <tr>
          <th>
            URL
          </th>
          <th>
            Short URL
          </th>
          <th>
            Actions
          </th>
        </tr>
        <tr v-for="item in userLinks">
          <td>{{ item.link }}</td>
          <td>{{ item.shortLink }}</td>
          <td>
            <button @click="copyToClipboard(item.shortLink)">Copy</button>
            <button @click="deleteLink(item.id)">Delete</button>
          </td>
        </tr>
      </table>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
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
      'Your links'
    ]),
      currentActiveTab: Ref<number> = ref(0),
      isSidebarActive: Ref<boolean> = ref(true),
      isLoading: Ref<boolean> = ref(false),
      isShortLinkCreated: Ref<boolean> = ref(false),
      URLRef: Ref<string> = ref(""),
      shortURL: Ref<string> = ref(""),
      userLinks: any = ref([]),
      { v4: uuidv4 } = require('uuid')

    const openCloseSidebar = (): void => {
      isSidebarActive.value = !isSidebarActive.value
    }

    const setCurrentActiveTab = (i: number): void => {
      currentActiveTab.value = i
    }

    const generateQRCode = async (urlString: string) => {

      const url = `https://qr-code-by-api-ninjas.p.rapidapi.com/v1/qrcode?data=${urlString}&format=png`
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': `${process.env.VUE_APP_RAPID_API_KEY}`,
          'X-RapidAPI-Host': 'qr-code-by-api-ninjas.p.rapidapi.com'
        }
      }

      await fetch(url, options)
      .then((res) => res.text())
      .then((data) => console.log(data))
      .catch((error) => console.log(error.message))
    }

    const shortenLink = async (urlString: string) => {
      if (userLinks.value.some((item: any) => item.link === urlString)) {
        alert('This link already exists!')
        return
      }

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
          isShortLinkCreated.value = true
          shortURL.value = data.result_url

          userLinks.value.push({
            id: uuidv4(),
            link: urlString,
            shortLink: shortURL
          })
          localStorage.setItem("userLinks", JSON.stringify(userLinks.value))
        })
        .catch(error => console.log(error.message))
    }

    const copyToClipboard = (text: string): void => {
      navigator.clipboard.writeText(text)
      alert('link copied to clipboard')

      setTimeout(() => {
        isShortLinkCreated.value = false
      }, 100)
    }

    const deleteLink = (id: string) => {
      userLinks.value = userLinks.value.filter((link: any) => link.id !== id)

      localStorage.setItem("userLinks", JSON.stringify(userLinks.value))
    }


    onMounted(() => {
      let storedUserLinks = localStorage.getItem("userLinks")

      if (storedUserLinks) {
        userLinks.value = JSON.parse(storedUserLinks)
      }
    })

    return {
      sidebarItems,
      currentActiveTab,
      isSidebarActive,
      isLoading,
      isShortLinkCreated,
      setCurrentActiveTab,
      openCloseSidebar,
      shortenLink,
      copyToClipboard,
      deleteLink,
      generateQRCode,
      URLRef,
      shortURL,
      userLinks
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
    @include flex(column, center, flex-start, 1em);

    .url--field {
      background-color: $white;
      box-shadow: var(--shadow-1);
      padding: .5em 1em;
      @include flex(column, center, center, .4em);
      width: 40%;

      button {
        width: 100%;
        padding-block: 8px;
        border: none;
        border-radius: var(--radius-1);
        background-color: $matte-black;
        color: $white;
        font-size: var(--font-size-2);
        cursor: pointer;

        &:hover {
          background-color: $black;
        }
      }

      h2 {
        font-size: var(--font-size-2);

        span {
          display: inline-block;
          color: $dark-gray;
          font-style: italic;
          border-radius: var(--radius-1);
        }
      }
    }

    form,
    table {
      width: 100%;
    }

    table {

      td,
      th {
        border: 1px solid $gray;
        text-align: left;
        padding: 8px;
        border-radius: var(--radius-1);
      }

      td {
        background-color: $gray;
        color: $black;
        font-size: var(--font-size-2);

        button {
          margin-right: .4em;
          padding: .4em;
          border-radius: var(--radius-2);
          cursor: pointer;

          &:nth-child(2) {
            background-color: orangered;
            color: $white;
          }
        }
      }

      th {
        background-color: $black;
        color: $white;
        box-shadow: var(--shadow-1);
        font-size: var(--font-size-3);
      }
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

@media (max-width: 768px) {
  main {
    flex-direction: column;
    height: fit-content;

    .sidebar {
      width: 100%;

      &--content {
        width: 100%;
      }
    }

    .content {
      width: 100%;
      padding: 0;
      justify-content: flex-start;
      align-items: flex-start;
      overflow-x: scroll;

      table {
        td {
          button {
            &:first-of-type {
              margin-bottom: .4em;
            }
          }
        }
      }

      .url--field {
        width: 100%;
      }

      .form--one {
        width: 100%;


        .fields {
          width: 100%;
        }
      }
    }
  }
}
</style>

