<template>

<div class="main_page">
    <div class="header_main">- Featured products -</div>
    <div class="product_list_inline">
        <template v-for="product in getProductList">
            <div class="product">
                <img
                    :src="`api/assets/items/${product.id}/0.jpg`"
                    :alt="product.title"
                >
                <h1>{{ product.title || 'No title' }}</h1>
                <p>{{ product.description || '' }}</p>
                <div class="action_buttons">
                    <div class="btn_details">More details</div>
                    <div class="btn_add_item">Add to cart</div>
                </div>
            </div>
        </template>
    </div>
</div>

</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['getProductList'])
    }
}
</script>

<style>
    .product_list_inline {
        width: 100%;
        height: 300px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 64px;
    }

    .product {
        min-width: 220px;
        display: flex;
        flex-direction: column;
        padding: 8px;
        border: 1px solid #cccccc;
    }

    .product img {
        max-width: 60%;
        max-height: 70%;
        height: auto;
        margin: 0 auto;
    }

    .action_buttons {
        width: 100%;
        margin-top: auto;
        display: flex;
        gap: 12px;
    }

    .btn_add_item,
    .btn_details {
        width: fit-content;
        border-radius: 8px;
        padding: 2px 24px;
        cursor: pointer;
        user-select: none;
    }

    .btn_details {
        background-color: #5bbeff;
    }

    .btn_add_item {
        background-color: #ffa600;
    }
</style>