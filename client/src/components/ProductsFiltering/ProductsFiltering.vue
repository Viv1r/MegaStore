<template>
    <div class="title">Filters</div>
    <FiltersForm
        :filters="filters"
        @submit="applyForm($event)"
    />
</template>

<script>
import FiltersForm from "../FiltersForm/FiltersForm.vue";
import { mapState } from "vuex";

export default {
    components: {
        FiltersForm
    },
    computed: {
        ...mapState(['categories'])
    },
    watch: {
        categories(newVal) {
            this.loadCategories(newVal);
        }
    },
    data() {
        return {
            filters: [
                {
                    tag: 'category',
                    name: 'Category',
                    type: 'select-one',
                    options: []
                },
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
                    type: 'range'
                }
            ]
        }
    },
    methods: {
        applyForm(form) {
            this.$emit('update', form);
        },
        loadCategories(newCategories) {
            this.filters.find(item => item.tag === 'category')
                .options = newCategories;
        }
    },
    mounted() {
        this.loadCategories(this.categories);
    },
    emits: ['update']
}
</script>

<style src="./ProductsFiltering.scss" scoped/>