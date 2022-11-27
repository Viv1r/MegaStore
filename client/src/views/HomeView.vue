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
                <h2 v-if="product.store">Seller: {{ product.store.title }}</h2>
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

<style lang="scss">
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
        img {
            max-width: 60%;
            max-height: 70%;
            height: auto;
            margin: 0 auto;
        }
        h1 {
            font-size: 30px;
        }
        h2 {
            font-size: 12px;
        }
        p {
            font-size: 16px;
        }
        .action_buttons {
            margin-top: 16px;
        }
    }

    .action_buttons {
        width: 100%;
        margin-top: auto;
        display: flex;
        gap: 12px;
    }

    .btn_details,
    .btn_add_item {
        width: fit-content;
        border-radius: 8px;
        padding: 2px 24px;
        cursor: pointer;
        user-select: none;
    }

    .btn {
        &_details {
            background-color: #54d4ff;
        }
        &_add_item {
            background-color: #ffa600;
        }
    }
</style>