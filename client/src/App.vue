<template>
    <header>
        <div class="header__content">
            <div class="left_side">
                <div class="btn_menu">
                    <img src="./assets/svg/menu.svg" alt="menu">
                </div>
            </div>
            <div class="logo">MegaStore</div>
            <div class="right_side">
                <div
                    class="btn_cart"
                    @click="cartActive = !cartActive"
                >
                    <img src="./assets/svg/cart.svg" alt="cart">
                    <div v-if="cart.length > 0" class="btn_cart__counter">{{ cart.length }}</div>
                </div>
                <Cart v-if="cartActive"/>
                <div class="btn_auth">Log in</div>
            </div>
        </div>
    </header>
    <div v-if="cartActive" class="blackout" @click="cartActive = false"></div>
    <div class="container">
        <RouterView/>
    </div>
    <footer>MegaStore © 2022 (by viv1r)</footer>
</template>

<script>
import { mapState } from 'vuex';
import Cart from './components/Cart/Cart.vue';

export default {
    components: {
        Cart
    },
    data() {
        return {
            cartActive: false
        }
    },
    computed: {
        ...mapState(['cart'])
    },
    created() {
        this.$store.dispatch('loadProducts', 5);
    }
}
</script>

<style lang="scss" scoped>
    @font-face {
        font-family: 'Kufam';
        src: url(assets/fonts/Kufam-Regular.ttf);
    }

    @font-face {
        font-family: 'Kulim Park';
        src: url(assets/fonts/KulimPark-Regular.ttf);
    }

    $max-width: 1200px;

    header {
        width: 100%;
        height: 64px;
        background-color: white;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    }

    .header__content {
        margin: 0 auto;
        height: 100%;
        max-width: $max-width;
        margin: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        line-height: 1.5;
    }

    .logo {
        position: absolute;
        margin: 0;
        bottom: 2px;
        font-family: 'Kufam';
        font-style: normal;
        font-weight: 400;
        font-size: 36px;
        user-select: none;
        cursor: pointer;
    }

    .btn_menu,
    .btn_cart {
        width: 36px;
        height: 36px;
        padding: 1px;
        margin-left: 16px;
        cursor: pointer;
    }

    .btn_menu img {
        width: 100%;
        height: auto;
    }

    .btn_cart {
        img {
            width: 90%;
            height: auto;
        }

        &__counter {
            width: 19px;
            height: 19px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            right: 0px;
            bottom: 0px;
            border-radius: 50%;
            background: #236af2;
            color: white;
            font-size: 11px;
            font-weight: bold;
        }
    }

    .left_side {
        margin-right: auto;
    }

    .right_side {
        width: fit-content;
        height: fit-content;
        margin: 0 16px 0 auto;
        display: flex;
        gap: 24px;
    }

    .btn_auth {
        font-size: 20px;
        cursor: pointer;
        user-select: none;
        &:hover {
            text-decoration: underline;
        }
    }

    .container {
        margin: 0 auto;
        width: auto;
        max-width: $max-width;
    }

    footer {
        margin-top: 48px;
        width: 100%;
        height: 128px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #5A5A5A;
        color: white;
        font-family: 'Kulim Park';
    }

    .blackout {
        position: absolute;
        width: 100%;
        height: calc(100% - 64px);
        background-color: rgba(0, 0, 0, .5);
        z-index: 9;
    }
</style>
