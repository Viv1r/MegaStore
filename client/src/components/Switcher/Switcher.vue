<template>
  <div class="switcher" :class="{active: active}" @click="turn()">
    <div class="switcher__thumb"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false
    }
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    turn() {
      this.active = !this.active;
      this.$emit('update:modelValue', this.active);
    }
  }
}
</script>

<style lang="scss" scoped>
  .switcher {
    width: 36px;
    height: 22px;
    border-radius: 11px;
    background-color: #acacac;
    box-shadow: inset 0 0 5px rgba($color: #000000, $alpha: .5);
    transition: all .15s ease-in-out;
    cursor: pointer;
    user-select: none;

    &__thumb {
      position: absolute;
      width: 22px;
      height: 22px;
      border: 1px solid #7f7f7f;
      border-radius: 50%;
      background-color: #ffffff;
      transition: all .15s ease-in-out;
    }

    &.active {
      background-color: lime;

      .switcher__thumb {
        transform: translateX(14px);
      }
    }
  }
</style>