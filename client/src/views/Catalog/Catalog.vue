<template>

<div class="catalog_page">
    <div class="main_title">Catalog</div>
    <Transition>
        <div class="container">
            <div class="filters_block">
                <ProductsFiltering
                  @update="applyFilters($event)"
                />
            </div>
            <div class="products_block">
                <div class="views_wrapper">

                  <div
                    class="view grid-view"
                    @click="listStyle = 'grid'"
                    :class="{selected: listStyle === 'grid'}"
                  >
                    <img src="src/assets/svg/view-grid.svg" alt="grid">
                  </div>

                  <div
                    class="view list-view"
                    @click="listStyle = 'list'"
                    :class="{selected: listStyle === 'list'}"
                  >
                    <img src="src/assets/svg/view-list.svg" alt="list">
                  </div>

                </div>
                <TransitionGroup name="grow">
                  <div class="products_wrapper" v-if="catalog.length">
                    <TransitionGroup name="grow">
                      <ProductCard
                        v-for="product in catalog"
                        :product="product"
                        :vertical="true"
                        :key="product.id"
                      />
                    </TransitionGroup>
                  </div>
                  <div v-else-if="loading" class="loading_indicator">Loading...</div>
                  <div v-else class="message">Nothing found!</div>
                </TransitionGroup>
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
    </Transition>
</div>

</template>

<script>
import ProductCard from "../../components/ProductCard/ProductCard.vue";
import ProductsFiltering from "../../components/ProductsFiltering/ProductsFiltering.vue";
import { mapState } from "vuex";
import axios from "axios";

export default {
    components: {
        ProductCard,
        ProductsFiltering
    },
    data() {
        return {
            catalog: [],
            filters: null,
            listStyle: 'list',
            offset: 0,
            canShowMore: true,
            loading: false
        }
    },
    methods: {
        async getCatalog() {
            this.loading = true;

            const URL = 'api/products/catalog';
            const response = await axios.post(URL, this.filters, {
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
        },

        applyFilters(filters) {
          this.filters = filters;
          this.offset = 0;
          this.canShowMore = true;
          this.catalog = [];
          this.getCatalog();
        },
    },

    mounted() {
        window.scrollTo(0, 0);
        this.getCatalog();
    }
}
</script>

<style src="./Catalog.scss" scoped/>