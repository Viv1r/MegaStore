import { createStore } from 'vuex';

export default createStore({
    state: {
        productList: [],
        cart: []
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
        },

        addToCart(store, {id, title, price, picture}) {
            const parsedProduct = {
                id: id,
                title: title,
                price: price,
                picture: picture
            };

            if (Object.values(parsedProduct).some(elem => !elem)) {
                return;
            }

            if (store.cart.find(elem => elem.id === parsedProduct.id)) {
                return;
            }

            store.cart.push(parsedProduct);
        }
    },

    actions: {
        async loadProducts(store, count) {
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