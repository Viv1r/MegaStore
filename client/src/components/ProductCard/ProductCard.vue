<template>
    <div
        v-if="product"
        class="product_card"
        :class="{vertical: vertical, 'fit-grid': fitGrid}"
        @click="openDetailedView(product)"
    >
        <div class="picture">
            <img
                :src="product.picture || 'src/assets/pictures/no_picture.jpg'"
                :alt="product.title"
            >
        </div>
        <div class="info">
            <div class="title">{{ product.title || 'Product' }}</div>
            <div v-if="product.category" class="subtitle">{{ product.category.name }}</div>
            <div v-if="product.description" class="description">{{ product.description }}</div>
            <div class="actions_wrapper">
                <div class="price">
                    {{ '$' + Number(product.price).toFixed(2) }}
                    <div class="postfix" v-if="product.pricePostfix">{{ product.pricePostfix }}</div>
                </div>

                <div v-if="!product.countAvailable" class="out_of_stock" @click.stop>Out of stock!</div>

                <div v-else-if="cartGetCount(product.id)" class="count_selector" @click.stop>
                    <button class="btn_decrease"
                            @click="cartAddCount({id: product.id, count: -1})"
                    >-</button>
                    <input type="text"
                           @keydown.enter="cartSetCount({id: product.id, target: $event.target})"
                           @focusout="cartSetCount({id: product.id, target: $event.target})"
                           :value="cartGetCount(product.id)"
                    >
                    <button class="btn_increase"
                            @click="cartAddCount({id: product.id, count: 1})"
                    >+</button>
                </div>

                <div v-else class="btn_add_item" @click.stop="addToCart(product)">Add to cart</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
    props: {
        product: {
            type: Object,
            default: {}
        },
        vertical: {
            type: Boolean,
            default: false
        },
        fitGrid: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters('cart', ['cartGetCount']),
    },
    methods: {
        ...mapMutations('cart', ['addToCart', 'cartAddCount', 'cartSetCount']),
        ...mapMutations(['openDetailedView'])
    }
}
</script>

<style src="./ProductCard.scss" scoped/>