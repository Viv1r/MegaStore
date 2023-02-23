<template>

<div class="checkout_page">
    <div class="main_title">Checkout</div>
    <div class="container">
        <div class="product_list">
            <template v-if="cart.length">
                <div
                    v-for="product in cart"
                    class="product"
                    :key="product.id"
                >
                    <div class="picture">
                        <img
                            :src="product.picture ? product.picture : 'src/assets/pictures/no_picture.jpg'"
                            :alt="product.title"
                        >
                    </div>
                    <div class="left_side">
                        <div class="title">{{ product.title }}</div>
                        <div class="count">Count: {{ product.count }}</div>
                    </div>
                    <div class="right_side">
                        <div class="price">
                            ${{ (Number(product.price) * product.count).toFixed(2) }}
                        </div>
                        <div class="btn_remove" @click="removeFromCart(product.id)">✖</div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="message">Your cart is empty!</div>
            </template>
        </div>
        <div class="checkout_counter">
            <div class="header">
                <div class="title">Total:</div> ${{ cartTotal.toFixed(2) }}
            </div>
            <div class="btn_proceed">Proceed</div>
        </div>
    </div>
</div>

</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState(['cart']),
        ...mapGetters(['cartTotal'])
    },
    methods: {
        ...mapMutations(['removeFromCart'])
    }
}
</script>

<style src="./Checkout.scss" scoped/>