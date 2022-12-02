<template>
    <template v-for="product in products">
        <div
            class="product_card"
            @click="openProduct(product)"
        >
            <div class="product_card__picture">
                <img
                    :src="product.picture ? `api/${product.picture}` : 'src/assets/pictures/no_picture.jpg'"
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
import { mapState, mapMutations } from 'vuex';

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
        ...mapState(['productList']),

        products() {
            const list = this.productList
                .slice(this.startIndex,this.endIndex - this.startIndex + 1);
            return this.reversed
                ? list.reverse()
                : list;
        }
    },
    methods: {
        ...mapMutations(['addToCart']),

        openProduct(product) {
            console.log(`Get ${product.title} details.`);
        }
    }
}
</script>

<style src="./ProductList.scss" scoped/>