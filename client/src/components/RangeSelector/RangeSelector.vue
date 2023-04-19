<template>

<div class="range_selector">
  <input
    type="number"
    placeholder="Min."
    v-model="modelValue.min"
    ref="min"
  >
  -
  <input
    type="number"
    placeholder="Max."
    v-model="modelValue.max"
    ref="max"
  >
</div>

</template>

<script>
export default {
  props: {
    modelValue: {
      type: Object,
      default: { min: undefined, max: undefined }
    }
  }
}
</script>

<style src="./RangeSelector.scss" scoped/>