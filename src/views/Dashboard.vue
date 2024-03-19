<template>
  <main>
    <div class="sidebar">
      <MenuButton />

      <div class="sidebar--content">
        <button v-for="item in sidebarItems" :key="item">
          {{ item }}
        </button>
      </div>
    </div>

    <div class="content">
      
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { Ref } from 'vue';
import MenuButton from '@/components/MenuButton.vue';

export default defineComponent({
  name: 'Dashboard',

  components: {
    MenuButton
  },

  setup() {
    const sidebarItems: Ref<string[]> = ref([
      'Create new url',
      'New QR code',
      'Your links',
      'Analytics'
    ])

    return { sidebarItems }
  }
})
</script>

<style lang="scss" scoped>
@import "../sass/app.scss";

main {
  height: 75dvh;
  min-height: 75dvh;
  @include flex(row, flex-start, center, 2em);

  .sidebar {
    height: fit-content;
    @include flex(column, flex-start, flex-start, 2em);
    background-color: $white;
    box-shadow: var(--shadow-2);
    padding: 1em .75em;
    border-radius: var(--radius-2);
    

    &--content{
      @include flex(column, center, center, 1em);

      button{
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

