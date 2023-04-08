<template>

<div class="filters_form">
  <div class="filters_list" @keydown.enter="submitForm()">
    <div
      v-for="filter of filters"
      class="filter_wrapper"
    >
      <label>{{ filter.name || filter.tag }}</label>
      <RangeSelector
        v-if="filter.type === 'range'"
        v-model="form[filter.tag]"
      />
      <input v-else type="text" v-model="form[filter.tag]">
    </div>
  </div>
  <button class="btn_apply" @click="submitForm()">Apply filters</button>
</div>

</template>

<script>
import RangeSelector from "../RangeSelector/RangeSelector.vue";

export default {
  components: {
    RangeSelector
  },
  data() {
    return {
      form: {}
    }
  },
  props: {
    filters: {
      type: Array,
      default: []
    }
  },
  methods: {
    initForm() {
      for (const filter of this.filters) {
        switch(filter.type) {
          case 'range':
            this.form[filter.tag] = { min: 0, max: undefined };
            break;
          default:
            this.form[filter.tag] = '';
        }
      }
    },
    submitForm() {
      this.$emit('submit', this.form);
    }
  },
  created() {
    this.initForm();
  },
  emits: ['submit']
}
</script>

<style src="./FiltersForm.scss" scoped/>