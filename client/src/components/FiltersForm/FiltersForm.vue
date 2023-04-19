<template>

<div class="filters_form">
    <div class="filters_list" @keydown.enter="submitForm()">
        <div
            v-for="filter of filters"
            class="filter_wrapper"
        >
          <label>{{ filter.name || filter.tag }}</label>

          <template v-if="filter.type === 'range'">
              <RangeSelector v-model="form[filter.tag]"/>
          </template>

          <template v-else-if="filter.type === 'select-one'">
              <DropdownList :options="filter.options" v-model="form[filter.tag]"/>
          </template>

          <input v-else type="text" v-model="form[filter.tag]">
        </div>
    </div>
    <button class="btn_apply" @click="submitForm()">Apply filters</button>
</div>

</template>

<script>
import RangeSelector from "../RangeSelector/RangeSelector.vue";
import DropdownList from "../DropdownList/DropdownList.vue";

export default {
    components: {
        RangeSelector,
        DropdownList
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
        submitForm() {
            this.$emit('submit', this.form);
        }
    },
    emits: ['submit']
}
</script>

<style src="./FiltersForm.scss" scoped/>