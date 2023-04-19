import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView/HomeView.vue';
import Catalog from '@/views/Catalog/Catalog.vue';
import Checkout from '@/views/Checkout/Checkout.vue';
import PurchasesHistory from "@/views/PurchasesHistory/PurchasesHistory.vue";

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior() {
        return { top: 0 }
    },
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
        {
            path: '/catalog',
            name: 'catalog',
            component: Catalog
        },
        {
            path: '/purchases',
            name: 'purchasesHistory',
            component: PurchasesHistory
        }
    ]
});
