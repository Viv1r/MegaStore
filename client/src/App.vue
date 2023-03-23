<template>
    <header>
        <div class="header__content">
            <div class="left_side">
                <div class="btn_menu">
                    <img src="./assets/svg/menu.svg" alt="menu" @click="switchSidebar()">
                </div>
            </div>
            <div class="logo" @click="navigate('/')">
                MegaStore
            </div>
            <div class="right_side">
                <div
                    class="btn_cart"
                    @click="switchCart()"
                >
                    <img src="./assets/svg/cart.svg" alt="cart">
                    <Transition name="grow">
                        <div v-if="cart.length > 0" class="btn_cart__counter">{{ cartSize }}</div>
                    </Transition>
                </div>

                <Transition name="dropdown">
                    <Cart v-if="cartActive"
                        @checkout="navigate('/checkout')"
                    />
                </Transition>

                <Transition name="dropdown">
                    <UserCard v-if="userCardActive"/>
                </Transition>

                <div v-if="user.loggedIn" class="btn_profile" @click="switchUserCard()">Welcome, {{ user.name }}!</div>
                <div v-else class="btn_auth" @click="switchAuthWindow()">Log in</div>
            </div>
        </div>
    </header>
    <Transition name="grow">
        <DetailedView v-if="detailedViewActive"/>
    </Transition>
    <Transition name="dropdown">
        <AuthWindow v-if="authWindowActive" @close="hideOverlay()"/>
    </Transition>
    <Transition name="sidebar">
        <Sidebar v-if="sidebarActive" @close="hideOverlay()"/>
    </Transition>
    <Transition>
        <div v-if="blackoutActive" class="blackout" @click="hideOverlay()"></div>
    </Transition>
    <div class="container">
        <RouterView @auth="switchAuthWindow()"/>
    </div>
    <footer>MegaStore © 2022 (by viv1r)</footer>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import Cart from './components/Cart/Cart.vue';
import Sidebar from './components/Sidebar/Sidebar.vue';
import DetailedView from './components/DetailedView/DetailedView.vue';
import AuthWindow from './components/AuthWindow/AuthWindow.vue';
import UserCard from './components/UserCard/UserCard.vue';

export default {
    components: {
        Cart,
        Sidebar,
        DetailedView,
        AuthWindow,
        UserCard
    },

    data() {
        return {
            cartActive: false,
            sidebarActive: false,
            authWindowActive: false,
            userCardActive: false
        }
    },

    computed: {
        ...mapState({
            cart: state => state.cart.products,
            user: state => state.user.user
        }),
        ...mapState(['detailedViewProduct']),
        ...mapGetters('cart', ['cartSize']),

        blackoutActive() {
            return this.cartActive || this.sidebarActive || this.authWindowActive || this.userCardActive || this.detailedViewActive;
        },

        detailedViewActive() {
            return !!this.detailedViewProduct;
        }
    },

    watch: {
        'user.loggedIn'() {
            this.hideOverlay();
        }
    },

    methods: {
        ...mapMutations(['openDetailedView']),

        hideOverlay() {
            this.cartActive = this.sidebarActive = this.authWindowActive = this.userCardActive = false;
            this.openDetailedView(null);
        },
        
        switchCart() {
            this.sidebarActive = this.authWindowActive = this.userCardActive = false;
            this.cartActive = !this.cartActive;
        },
        
        switchSidebar() {
            this.cartActive = this.authWindowActive = this.userCardActive = false;
            this.sidebarActive = !this.sidebarActive;
        },
        
        switchAuthWindow() {
            this.cartActive = this.sidebarActive = this.userCardActive = false;
            this.authWindowActive = !this.authWindowActive;
        },

        switchUserCard() {
            this.cartActive = this.sidebarActive = this.authWindowActive = false;
            this.userCardActive = !this.userCardActive;
        },

        navigate(route) {
            this.$router.push(route);
            this.hideOverlay();
        }
    },

    created() {
        this.$store.dispatch('loadProducts', 20);
        this.$store.dispatch('loadCategories');
        this.$store.dispatch('cart/loadCart');
        this.$store.dispatch('user/loadUser');
    }
}
</script>

<style src="./App.scss" scoped/>
