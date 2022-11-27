import { createStore } from 'vuex';

export default createStore({
    state: {
        productList: []
    },

    getters: {
        getProductList(store) {
            return store.productList;
        }
    },

    mutations: {
        addProducts(store, newProducts) {
            store.productList.push(
                ...newProducts.map(({id, title, description, price, store}) => {
                    return {
                        id: id,
                        title: title,
                        description: description,
                        price: price,
                        store: store
                    };
                })
            );
        }
    },

    actions: {
        async getItems(store, count) {
            store.productList = [];

            const URL = 'api/products';
            const body = {
                count: count || 10
            };
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            store.commit('addProducts', data);
        }
    }
});