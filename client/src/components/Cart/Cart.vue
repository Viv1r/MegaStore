<template>

<div class="cart">
    <div class="cart__content">
        <template v-if="cart.length">
            <div
                v-for="product in cart"
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
    <div v-if="cart.length" class="checkout_wrapper">
        Total: ${{ cart.reduce((accum, product) => accum + product.price * product.count, 0).toFixed(2) }}
        <div class="btn_checkout">Checkout</div>
    </div>
</div>

</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState(['cart'])
    },
    methods: {
        ...mapMutations(['addToCart', 'removeFromCart']),

        Number(num) {
            return Number(num);
        }
    }
}
</script>

<style src="./Cart.scss" scoped/>