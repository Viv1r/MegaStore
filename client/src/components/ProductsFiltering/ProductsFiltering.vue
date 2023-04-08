<template>
    <div class="title">Filters</div>
    <FiltersForm
      :filters="filters"
      @submit="applyForm($event)"
    />
</template>

<script>
import FiltersForm from "../FiltersForm/FiltersForm.vue";

export default {
  components: {
    FiltersForm
  },
  data() {
    return {
      filters: [
        {
          tag: 'title',
          name: 'Title'
        },
        {
          tag: 'description',
          name: 'Description'
        },
        {
          tag: 'price',
          name: 'Price',
          type: 'range',
          max: 1000
        }
      ]
    }
  },
  methods: {
    applyForm(form) {
      this.$emit('update', form);
    }
  },
  emits: ['update']
}
</script>

<style src="./ProductsFiltering.scss" scoped/>