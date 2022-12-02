<template>

<div class="cart">
    <div class="cart__content">
        <template v-if="cart.length">
            <div
                v-for="product in cart"
                class="cart__product"
                :key="product.id"
            >
                <div class="cart__product__title">
                    {{ product.title }}
                </div>
                <div class="cart__product__price">
                    {{ '$' + Number(product.price).toFixed(2) }}
                </div>
            </div>
        </template>
        <template v-else>
            <div class="message">Your cart is empty!</div>
        </template>
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
        ...mapMutations(['addToCart']),

        Number(num) {
            return Number(num);
        }
    }
}
</script>

<style src="./Cart.scss" scoped/>