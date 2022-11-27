<template>
    <template v-for="product in products">
        <div
            class="product_card"
            @click="openProduct(product)"
        >
            <div class="product_card__image">
                <img
                    :src="`api/assets/items/${product.id}/0.jpg`"
                    :alt="product.title"
                >
            </div>
            <div class="product_card__info">
                <div class="product_card__title">{{ product.title || 'Product' }}</div>
                <div class="actions_wrapper">
                    <div class="product_card__price">
                        {{ '$' + Number(product.price).toFixed(2) }}
                    </div>
                    <div
                        class="btn_add_item"
                        @click.stop="addToCart(product)"
                    >
                        Add to cart
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>

<script>
import {mapGetters} from "vuex";

export default {
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
        ...mapGetters(['getProductList']),
        products() {
            const list = this.getProductList
                .slice(this.startIndex,this.endIndex - this.startIndex + 1);
            return this.reversed
                ? list.reverse()
                : list;
        }
    },
    methods: {
        openProduct(product) {
            console.log(`Get ${product.title} details.`);
        },

        addToCart(product) {
            console.log(`Added ${product.title} to cart.`);
        }
    }
}
</script>

<style src="./ProductList.scss" scoped/>