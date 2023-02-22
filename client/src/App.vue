<template>
    <header>
        <div class="header__content">
            <div class="left_side">
                <div class="btn_menu">
                    <img src="./assets/svg/menu.svg" alt="menu" @click="switchSidebar()">
                </div>
            </div>
            <div class="logo">MegaStore</div>
            <div class="right_side">
                <div
                    class="btn_cart"
                    @click="switchCart()"
                >
                    <img src="./assets/svg/cart.svg" alt="cart">
                    <Transition name="grow">
                        <div v-if="cart.length > 0" class="btn_cart__counter">{{ cart.length }}</div>
                    </Transition>
                </div>
                <Transition name="dropdown">
                    <Cart v-if="cartActive"/>
                </Transition>
                <div class="btn_auth">Log in</div>
            </div>
        </div>
    </header>
    <Transition name="grow">
        <DetailedView v-if="detailedViewActive"/>
    </Transition>
    <Transition name="sidebar">
        <Sidebar v-if="sidebarActive" @close="switchSidebar()"/>
    </Transition>
    <Transition>
        <div v-if="blackoutActive" class="blackout" @click="hideOverlay()"></div>
    </Transition>
    <div class="container">
        <RouterView/>
    </div>
    <footer>MegaStore © 2022 (by viv1r)</footer>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Cart from './components/Cart/Cart.vue';
import Sidebar from './components/Sidebar/Sidebar.vue';
import DetailedView from './components/DetailedView/DetailedView.vue';

export default {
    components: {
        Cart,
        Sidebar,
        DetailedView
    },

    data() {
        return {
            cartActive: false,
            sidebarActive: false
        }
    },

    computed: {
        ...mapState(['cart', 'detailedViewProduct']),

        blackoutActive() {
            return this.cartActive || this.sidebarActive || this.detailedViewActive;
        },

        detailedViewActive() {
            return !!this.detailedViewProduct;
        }
    },

    methods: {
        ...mapMutations(['openDetailedView']),

        hideOverlay() {
            this.cartActive = this.sidebarActive = false;
            this.openDetailedView(null);
        },
        
        switchCart() {
            this.sidebarActive = false;
            this.cartActive = !this.cartActive;
        },
        
        switchSidebar() {
            this.cartActive = false;
            this.sidebarActive = !this.sidebarActive;
        }
    },

    created() {
        this.$store.dispatch('loadProducts', 5);
        this.$store.dispatch('loadCategories');
        this.$store.dispatch('loadCart');
    }
}
</script>

<style src="./App.scss" scoped/>
