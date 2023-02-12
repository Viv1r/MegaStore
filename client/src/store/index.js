import { createStore } from 'vuex';

export default createStore({
    
    state: {
        cart: [],
        productList: []
    },

    mutations: {
        addToCart({cart}, {id, title, price, picture}) {
            const parsedProduct = {
                id: id,
                title: title,
                price: price,
                count: 1
            };

            if (Object.values(parsedProduct).some(elem => !elem)) return;
            if (cart.find(elem => elem.id === parsedProduct.id)) return;

            parsedProduct.picture = picture;
            cart.push(parsedProduct);
        },

        removeFromCart({cart}, id) {
            const targetIndex = cart.findIndex(elem => elem.id === id);
            if (targetIndex >= 0) {
                cart.splice(targetIndex, 1);
            }
        },

        cartAddCount({cart}, {id, count}) {
            const targetIndex = cart.findIndex(elem => elem.id === id);
            const targetProduct = cart[targetIndex];
            if (targetProduct) {
                targetProduct.count += Number(count);
                if (targetProduct.count <= 0) {
                    cart.splice(targetIndex, 1);
                }
            }
        },

        cartSetCount({cart}, {id, count}) {
            const targetIndex = cart.findIndex(elem => elem.id === id);
            const targetProduct = cart[targetIndex];
            if (targetProduct) {
                targetProduct.count = parseInt(count) || 0;
                if (targetProduct.count <= 0) {
                    cart.splice(targetIndex, 1);
                }
            }
        },

        addProducts({productList}, newProducts) {
            productList.push(
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
    },

    actions: {
        async loadProducts({productList, commit}, count) {
            productList = [];

            const URL = 'api/products';
            const params = {
                count: count || 10
            };

            const response = await fetch(URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: JSON.stringify(params)
            });
            const data = await response.json();
            
            if (data && data.products) {
                commit('addProducts', data.products);
            }
        }
    }
});