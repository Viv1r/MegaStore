<template>

<div class="checkout_page">
    <div class="main_title">Checkout</div>
    <div class="container">
        <div class="product_list">
            <template v-if="products.length">
                <div
                    v-for="product in products"
                    class="product"
                    :key="product.id"
                    @click="openDetailedView(product)"
                >
                    <div class="picture">
                        <img
                            :src="product.picture ? product.picture : '../../assets/pictures/no_picture.jpg'"
                            :alt="product.title"
                        >
                    </div>
                    <div class="left_side">
                        <div class="title">{{ product.title }}</div>
                        <div class="seller">Seller: {{ product.store.title }}</div>
                    </div>
                    <div class="right_side">
                        <div class="price_wrapper">
                            <div class="price_calc" @click.stop="editProduct(product)">
                                <template v-if="product.id === editableProductId">
                                    <input type="number" :ref="`edit_${product.id}`"
                                        @keydown.enter="setCount(product.id, $event.target)"
                                        @focusout="setCount(product.id, $event.target)"
                                        :value="cartGetCount(product.id)"
                                    >
                                </template>
                                <template v-else>
                                    {{ product.price }}
                                    <span style="font-size: 10px">✕</span>
                                    {{ product.count }}
                                </template>
                            </div>
                            <div class="price_total">${{ (Number(product.price) * product.count).toFixed(2) }}</div>
                        </div>
                        <div class="btn_remove" @click.stop="removeFromCart(product.id)">✖</div>
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
    data() {
        return {
            editableProductId: null
        }
    },

    computed: {
        ...mapState('cart', ['products']),
        ...mapGetters('cart', ['cartTotal', 'cartGetCount'])
    },

    methods: {
        ...mapMutations('cart', ['removeFromCart', 'cartSetCount']),
        ...mapMutations(['openDetailedView']),

        editProduct(product) {
            this.editableProductId = product.id;
        },

        setCount(id, target) {
            this.cartSetCount({id: id, target: target}); 
            this.editableProductId = null;
        }
    },

    updated() {
        const targetArr = this.$refs[`edit_${this.editableProductId}`];
        if (targetArr && targetArr[0]) {
            targetArr[0].focus();
        }
    }
}
</script>

<style src="./Checkout.scss" scoped/>