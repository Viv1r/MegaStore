import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    
    state: {
        cart: [],
        productList: [],
        categories: [],
        loggedIn: false
    },

    mutations: {
        addToCart({cart}, {id, title, price, picture, count}) {
            const parsedProduct = {
                id: id,
                title: title,
                price: price,
                count: count || 1
            };

            if (Object.values(parsedProduct).some(elem => !elem)) return; // Cancel if the product contains invalid fields
            if (cart.find(elem => elem.id === parsedProduct.id)) return; // Cancel if the product is already in the cart

            parsedProduct.picture = picture;
            cart.push(parsedProduct);

            localStorage.setItem('cart', JSON.stringify(cart));
        },

        removeFromCart({cart}, id) {
            const targetIndex = cart.findIndex(elem => elem.id === id);

            if (targetIndex >= 0) {
                cart.splice(targetIndex, 1);

                localStorage.setItem('cart', JSON.stringify(cart));
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

                localStorage.setItem('cart', JSON.stringify(cart));
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

                localStorage.setItem('cart', JSON.stringify(cart));
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

        setCategories(store, newCategories) {
            store.categories = newCategories;
        }
    },

    actions: {
        async loadProducts(store, count) {
            store.productList = [];

            const URL = 'api/products';
            const params = {
                count: count || 10
            };

            let data;
            try {
                const response = await axios.get(URL, {
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
            const URL = 'api/categories';
            
            let data;
            try {
                const response = await axios.get(URL);
                data = response.data;
            } finally {
                if (data && data.categories) {
                    commit('setCategories', data.categories);
                }
            }
        },

        loadCart({commit}) {
            const data = JSON.parse(localStorage.getItem('cart'));
            
            if (data) {
                data.forEach(product => commit('addToCart', product));
            } else {
                localStorage.removeItem('cart');
            }
        }
    }
});