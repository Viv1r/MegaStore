<template>
    <div class="catalog_page">
        <div class="main_title">Catalog</div>
        <Transition>
            <div v-if="catalog.length" class="container">
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
                <div class="products_block">
                    <div class="products_wrapper">
                        <TransitionGroup name="grow">
                            <ProductCard
                                v-for="product in catalog"
                                :product="product"
                                :vertical="true"
                                :key="product.id"
                            />
                        </TransitionGroup>
                    </div>
                    <button
                        v-if="catalog.length && canShowMore"
                        class="btn_more"
                        :disabled="loading"
                        @click="getCatalog()"
                    >
                        {{ loading ? 'Loading...' : 'Show more' }}
                    </button>
                </div>
            </div>
            <div v-else class="loading_indicator">Loading...</div>
        </Transition>
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
            catalog: [],
            offset: 0,
            canShowMore: true,
            loading: false
        }
    },
    methods: {
        async getCatalog() {
            this.loading = true;

            const URL = 'api/products/catalog';
            const response = await axios.get(URL, {
                params: { offset: this.offset }
            });
            const data = response.data;
            if (!data) return;

            if (data.products) {
                for (const product of data.products) {
                    product.countAvailable = product.count_available;
                    delete product.count_available;
                    product.pricePostfix = product.price_postfix;
                    delete product.price_postfix;
                }

                this.offset += data.products.length;
                this.catalog.push(...data.products);
            }

            if (data.end) {
                this.canShowMore = false;
            }

            this.loading = false;
        }
    },
    mounted() {
        window.scrollTo(0, 0);
        this.getCatalog();
    }
}
</script>

<style src="./Catalog.scss" scoped/>