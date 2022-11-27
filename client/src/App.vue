<template>
    <header>
        <div class="header__content">
            <div class="left_side">
                <div class="btn_menu">
                    <img src="./assets/svg/menu.svg" alt="menu">
                </div>
            </div>
            <div class="logo">
                MegaStore
            </div>
            <div class="right_side">
                <div class="btn_cart">
                    <img src="./assets/svg/cart.svg" alt="cart">
                </div>
                <div class="btn_auth">
                    Log in
                </div>
            </div>
        </div>
    </header>
    <div class="container">
        <RouterView />
    </div>
    <footer>
        MegaStore © 2022 (by viv1r)
    </footer>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import { mapActions } from 'vuex';

export default {
    data() {
        return {

        }
    },
    created() {
        this.getItems();
    },
    methods: {
        ...mapActions(['getItems'])
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
    
    .btn_cart img {
        width: 90%;
        height: auto;
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
        width: 100%;
        height: 128px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #5A5A5A;
        color: white;
        font-family: 'Kulim Park';
    }
</style>
