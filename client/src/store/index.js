import { createStore } from 'vuex';
import axios from 'axios';
import cartModule from './modules/cart/index';
import userModule from './modules/user/index';

const api = axios.create({
    baseURL: 'api/'
});

export default createStore({
    modules: {
        cart: cartModule,
        user: userModule
    },

    state: {
        productList: [],
        categories: [],
        detailedViewProduct: null
    },

    mutations: {
        addProducts({productList}, newProducts) {
            productList.push(
                ...newProducts.map(({id, title, description, price, count_available, store, picture}) => {
                    return {
                        id: id,
                        title: title,
                        description: description,
                        price: price,
                        countAvailable: count_available,
                        store: store,
                        picture: picture
                    };
                })
            );
        },

        setCategories(store, newCategories) {
            store.categories = newCategories;
        },

        openDetailedView(store, product) {
            store.detailedViewProduct = product;
            window.scrollTo(0, 0);
        }
    },

    actions: {
        async loadProducts(store, count) {
            store.productList = [];

            const action = 'products';
            const params = {
                count: count || 10
            };

            let data;
            try {
                const response = await api.get(action, {
                    params: params
                });
                data = response.data;
            } finally {
                if (data && data.products) {
                    store.commit('addProducts', data.products);
                }
            }
        },

        async loadCategories({commit}) {
            const action = 'categories';
            let data;
            try {
                const response = await api.get(action);
                data = response.data;
            } finally {
                if (data && data.categories) {
                    commit('setCategories', data.categories);
                }
            }
        }
    }
});