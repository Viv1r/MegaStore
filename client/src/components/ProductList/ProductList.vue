<template>
    <ProductCard v-for="product in products" :product="product"/>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import ProductCard from "../ProductCard/ProductCard.vue";

export default {
    components: { ProductCard },
    props: {
        startIndex: {
            type: Number,
            default: 0
        },
        endIndex: {
            type: Number,
            default: 0
        },
        reversed: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState(['productList']),

        products() {
            const list = this.productList
                .slice(this.startIndex, this.endIndex - this.startIndex + 1);
            return this.reversed
                ? list.reverse()
                : list;
        }
    }
}
</script>

<style src="./ProductList.scss" scoped/>