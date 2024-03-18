<template>
  <div class="menu" @click="$emit('clickEvent')">
    <span></span>
    <span></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from "vue"
export default defineComponent({
  name: 'MenuButton'
})
</script>

<style lang="scss">
@import "../sass/app.scss";

.menu {
  @include flex(column, center, center, .5em);
  height: 16px;
  width: 28px;
  cursor: pointer;

  &.disable{
    display: none;
  }

  &.active {
     span{
      width: 80%;
      
        &:nth-child(1) {
          transform: translate(4px, 5px) rotate(45deg);
          width: 80%;
        }
      
        &:nth-child(2) {
          transform: translate(3px, -5px) rotate(-45deg);
        }
     }
    }

  span {
    display: block;
    height: 2px;
    background-color: $black;
    width: 100%;
    border-radius: var(--radius-2);
    transition: all .3s var(--ease-3);
  }
}
</style>
