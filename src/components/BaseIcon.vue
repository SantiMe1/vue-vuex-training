<template>
  <div class="icon-wrapper">
    <div v-html="svg"></div>
    <slot></slot>
  </div>
</template>

<script>
import feather from 'feather-icons'
export default {
  name: 'Icon',
  props: {
    name: String,
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    }
  },
  computed: {
    svg() {
      return feather.icons[this.name].toSvg({
        class: 'icon',
        width: this.width,
        height: this.height
      })
    }
  }
}
</script>

<style scoped lang="scss">
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;

  svg.icon {
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    margin-right: 6px;
  }
}
</style>
