<template>

<div class="main_page">
    <div class="container_featured">
        <div class="header_main">Featured products</div>
        <div class="product_list_inline">
            <template v-for="product in getProductList">
                <div class="product_card">
                    <img
                        class="product_card__image"
                        :src="`api/assets/items/${product.id}/0.jpg`"
                        :alt="product.title"
                    >
                    <div class="product_card__info">
                        <div class="product_card__title">{{ product.title || 'Product' }}</div>
                        <div class="actions_wrapper">
                            <div class="product_card__price">
                                {{ '$' + Number(product.price).toFixed(2) }}
                            </div>
                            <div class="btn_add_item">Add to cart</div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div class="btn_more">
            More products
        </div>
    </div>
</div>

</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['getProductList'])
    },
    methods: {
        Number(num) {
            return Number(num);
        }
    }
}
</script>

<style lang="scss">
    .main_page {
        width: 100%;
        height: fit-content;
        min-height: 92vh;
    }

    .container_featured {
        width: 100%;
        height: 466px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .header_main {
        font-size: 30px;
        width: 100%;
        text-align: center;
        font-family: 'Kufam';
        margin: 37px auto 30px auto;
        user-select: none;
    }

    .product_list_inline {
        width: 100%;
        height: 300px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 64px;
    }

    .product_card {
        width: 185px;
        height: 271px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;
        background-color: #FFFFFF;
        box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.25);
        border-radius: 15px;
        img {
            max-width: 60%;
            max-height: 70%;
            height: auto;
            margin: 0 auto;
        }
        &__info {
            width: 100%;
            margin-top: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
        }
        &__title {
            font-family: 'Kulim Park';
            font-size: 26px;
        }
        &__price {
            font-family: 'Kulim Park';
            font-style: normal;
            font-weight: 400;
            font-size: 19px;
            line-height: 23px;
            display: flex;
            align-items: center;
            text-align: center;
            color: #000000;
            user-select: none;
        }
    }

    .actions_wrapper {
        width: fit-content;
        margin: 0 auto;
        display: flex;
        gap: 12px;
    }

    .btn_add_item {
        width: 76px;
        height: 23px;
        padding: 2px 0;
        cursor: pointer;
        user-select: none;
        border: 1px solid rgba(0, 133, 255, 0.75);
        border-radius: 5px;
        font-family: 'Kulim Park';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        color: #0085FF;
        overflow: hidden;
        white-space: nowrap;
        transition: all .25s ease-out;
        &:hover {
            color: white;
            background-color: #0085FF;
        }
    }

    .btn_more {
        width: 170px;
        height: 37px;
        border: 1.5px solid rgba(0, 59, 209, 0.75);
        border-radius: 10px;
        font-family: 'Kulim Park';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        display: flex;
        justify-content: center;
        align-items: center;

        color: #003BD1;
    }
</style>