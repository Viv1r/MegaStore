<template>
    <header>
        <div class="btn_menu">
            <img src="./assets/svg/menu.svg" alt="menu">
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
    </header>

    <RouterView />
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
    header {
        width: 100%;
        height: 64px;
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: white;
        box-shadow: 0 0 5px rgba(0, 0, 0, .25);
        line-height: 1.5;
        margin-bottom: 16px;
    }

    .btn_menu,
    .btn_cart {
        width: 32px;
        height: 32px;
        padding: 1px;
        margin-left: 16px;
        cursor: pointer;
        img {
            width: 100%;
            height: auto;
        }
    }

    .btn_menu {
        border: 1px solid black;
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
    }
</style>
