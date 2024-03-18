<template>
  <div class="loader" ref="loader">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'Loader',
  props: {
    spanDimension: String
  },

  setup(props) {
    const loader: any = ref(),
          loaderChildren: any = ref()

    onMounted(() => {
      loaderChildren.value = Array.from(loader.value.children)
      loaderChildren.value.forEach((child: any) => {
        child.style.height = props.spanDimension
        child.style.width = props.spanDimension
      })
    })

    return { loader }
  }
})
</script>

<style lang="scss" scoped>
@import "../sass/app.scss";

.loader {
  @include flex(row, center, center, .4em);

  span {
    background-color: $matte-black;
    border-radius: var(--radius-round);
    animation: var(--animation-float) forwards;
    animation-timing-function: var(--ease-3);

    &:nth-child(1) {
      animation-duration: .5s;
    }

    &:nth-child(2) {
      animation-duration: .55s;
    }

    &:nth-child(3) {
      animation-duration: .6s;
    }
  }
}
</style>
