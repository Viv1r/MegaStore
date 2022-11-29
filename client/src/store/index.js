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
                ...newProducts.map(({id, title, description, price, store, picture}) => {
                    return {
                        id: id,
                        title: title,
                        description: description,
                        price: price,
                        store: store,
                        picture: picture
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
            
            if (data && data.products) {
                store.commit('addProducts', data.products);
            }
        }
    }
});