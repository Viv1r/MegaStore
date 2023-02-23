import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView/HomeView.vue';
import Checkout from '@/views/Checkout/Checkout.vue';

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: Checkout
        },
    ]
});
