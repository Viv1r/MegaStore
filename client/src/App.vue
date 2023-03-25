<template>
    <header>
        <div class="header__content">
            <div class="left_side">
                <div class="btn_menu">
                    <img src="./assets/svg/menu.svg" alt="menu" @click="switchModule('sidebar')">
                </div>
            </div>
            <div class="logo" @click="navigate('/')">
                MegaStore
            </div>
            <div class="right_side">
                <div
                    class="btn_cart"
                    @click="switchModule('cart')"
                >
                    <img src="./assets/svg/cart.svg" alt="cart">
                    <Transition name="grow">
                        <div v-if="cart.length > 0" class="btn_cart__counter">{{ cartSize }}</div>
                    </Transition>
                </div>

                <Transition name="dropdown">
                    <Cart v-if="modules.cart.active"
                        @checkout="navigate('/checkout')"
                    />
                </Transition>

                <Transition name="dropdown">
                    <UserCard v-if="modules.userCard.active"/>
                </Transition>

                <div v-if="user.loggedIn" class="btn_profile" @click="switchModule('userCard')">Welcome, {{ user.name }}!</div>
                <div v-else class="btn_auth" @click="switchModule('authWindow')">Log in</div>
            </div>
        </div>
    </header>
    <Transition name="grow">
        <DetailedView v-if="detailedViewActive"/>
    </Transition>
    <Transition name="dropdown">
        <AuthWindow v-if="modules.authWindow.active" @close="hideOverlay()"/>
    </Transition>
    <Transition name="sidebar">
        <Sidebar v-if="modules.sidebar.active" @close="hideOverlay()"/>
    </Transition>
    <Transition>
        <div v-if="blackoutActive" class="blackout" @click="hideOverlay()"></div>
    </Transition>
    <div class="container">
        <RouterView @auth="switchModule('authWindow')"/>
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
            modules: {
              cart: { active: false },
              sidebar: { active: false },
              authWindow: { active: false },
              userCard: { active: false }
            }
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
            return Object.values(this.modules).some(elem => elem.active) || this.detailedViewActive;
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
            Object.keys(this.modules).forEach(key => this.modules[key].active = false);
            this.openDetailedView(null);
        },

        switchModule(name) {
            this.modules[name].active = !this.modules[name].active;
            Object.keys(this.modules).forEach(key => {
                if (key !== name) this.modules[key].active = false;
            });
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
