<template>

<div class="cart">
    <div class="cart__content">
        <template v-if="products.length">
            <div
                v-for="product in products"
                class="cart__product"
                :key="product.id"
            >
                <div class="cart__product__btn_remove" @click="removeFromCart(product.id)">✖</div>
                <div class="cart__product__title">
                    {{ product.title }} ({{ product.count }})
                </div>
                <div class="cart__product__price">
                    ${{ (Number(product.price) * product.count).toFixed(2) }}
                </div>
            </div>
        </template>
        <template v-else>
            <div class="message">Your cart is empty!</div>
        </template>
    </div>
    <div v-if="products.length" class="checkout_wrapper">
        Total: ${{ cartTotal.toFixed(2) }}
        <div class="btn_checkout" @click="$emit('checkout')">
            Checkout
        </div>
    </div>
</div>

</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState('cart', ['products']),
        ...mapGetters('cart', ['cartTotal'])
    },

    methods: {
        ...mapMutations('cart', ['addToCart', 'removeFromCart']),

        Number(num) {
            return Number(num);
        }
    },

    emits: ['checkout']
}
</script>

<style src="./Cart.scss" scoped/>