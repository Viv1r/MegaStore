// @ts-ignore
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
                ...newProducts.map(({id, title, description, price}) => {
                    return {
                        id: id,
                        title: title,
                        description: description,
                        price: price
                    };
                })
            );
        }
    },
    actions: {
        async getItems(store) {
            const URL = 'api/items.json';
            const response = await fetch(URL);
            const data = await response.json();
            store.commit('addProducts', data);
        }
    }
})