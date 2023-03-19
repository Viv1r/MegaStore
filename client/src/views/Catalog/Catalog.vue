<template>
    <div class="catalog_page">
        <div class="main_title">Catalog</div>
        <div class="container">
            <div class="search_block">
                <div class="title">Filters</div>
                <div class="filter_wrapper">
                    <label>Keywords</label>
                    <input type="text">
                </div>
                <div class="filter_wrapper">
                    <label>Manufacturer</label>
                    <div class="checkbox_wrapper">
                        <input type="checkbox" id="val1">
                        <label for="val1">Value 1</label>
                    </div>
                    <div class="checkbox_wrapper">
                        <input type="checkbox" id="val2">
                        <label for="val2">Value 2</label>
                    </div>
                </div>
            </div>
            <div class="products_wrapper">
                <ProductCard v-for="product in catalog" :product="product" :vertical="true"></ProductCard>
            </div>
        </div>
    </div>
</template>

<script>
import ProductCard from "../../components/ProductCard/ProductCard.vue";
import { mapState } from "vuex";
import axios from "axios";

export default {
    components: { ProductCard },
    data() {
        return {
            catalog: []
        }
    },
    methods: {
        async getCatalog() {
            const URL = 'api/products/catalog';
            const response = await axios.get(URL);
            const data = response.data;
            if (data && data.products) {
                for (const product of data.products) {
                    product.countAvailable = product.count_available;
                    delete product.count_available;
                }
                this.catalog = data.products;
            }
        }
    },
    mounted() {
        this.getCatalog();
    }
}
</script>

<style src="./Catalog.scss" scoped/>