import { createStore } from 'vuex';
import axios from 'axios';

const api = axios.create({
    baseURL: 'api/'
});

class User {
    name;
    email;
    profilePicture;
    loggedIn = false;

    auth(name, email) {
        this.name = name;
        this.email = email;
        this.loggedIn = true;
    };

    logout() {
        this.name = this.email = undefined;
        this.loggedIn = false;
    };
}

export default createStore({
    state: {
        cart: [],
        productList: [],
        categories: [],
        detailedViewProduct: null,
        user: new User(),
        processingAuth: false,
        authError: null
    },

    getters: {
        cartGetCount: state => id => {
            const target = state.cart.find(product => product.id === id);
            if (target) {
                return target.count;
            }
            return 0;
        },

        cartSize(state) {
            return state.cart.reduce((prev, product) => prev + product.count, 0);
        },

        cartTotal(state) {
            return state.cart.reduce((accum, product) => accum + product.price * product.count, 0);
        }
    },

    mutations: {
        addToCart({cart}, {id, title, price, picture, count, countAvailable, store}) {
            const parsedProduct = {
                id: id,
                title: title,
                price: price,
                count: count || 1,
                countAvailable: countAvailable,
                store: store
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
                
                if (targetProduct.count > targetProduct.countAvailable) {
                    targetProduct.count = targetProduct.countAvailable;
                }
                if (targetProduct.count <= 0) {
                    cart.splice(targetIndex, 1);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        },

        cartSetCount({cart}, {id, target}) {
            const targetIndex = cart.findIndex(elem => elem.id === id);
            const targetProduct = cart[targetIndex];
            const targetCount = parseInt(target.value) || 0;

            if (targetProduct) {
                if (targetCount > targetProduct.countAvailable) {
                    targetProduct.count = target.value = targetProduct.countAvailable;
                } else {
                    targetProduct.count = target.value = targetCount;
                }

                if (targetProduct.count <= 0) {
                    cart.splice(targetIndex, 1);
                }

                localStorage.setItem('cart', JSON.stringify(cart));
            }
        },

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
        },

        setAuthStatus(store, status) {
            store.processingAuth = !!status;
        },

        pushAuthError(store, error) {
            store.authError = error;
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
        },

        async loadUser({state}) {
            const action = 'token-auth';
            let data;
            try {
                const response = await api.post(action);
                data = response.data;
            } finally {
                if (data && data.user) {
                    const user = data.user;
                    state.user.auth(user.name, user.email);
                }
            }
        },

        async register({state, commit}, authData) {
            commit('setAuthStatus', true);
            commit('pushAuthError', null);

            const action = 'register';
            let data;
            try {
                const response = await api.post(action, authData);
                data = response.data;
            } finally {
                if (data && data.user) {
                    const user = data.user;
                    state.user.auth(user.name, user.email);
                } else if (data && data.statusMessage) {
                    commit('pushAuthError', data.statusMessage);
                }
                commit('setAuthStatus', false);
            }
        },

        async login({state, commit}, authData) {
            commit('setAuthStatus', true);
            commit('pushAuthError', null);

            const action = 'login';
            let data;
            try {
                const response = await api.post(action, authData);
                data = response.data;
            } finally {
                if (data && data.user) {
                    const user = data.user;
                    state.user.auth(user.name, user.email);
                } else if (data && data.statusMessage) {
                    commit('pushAuthError', data.statusMessage);
                }
                commit('setAuthStatus', false);
            }
        },

        logout({state}) {
            const action = 'logout';
            try {
                api.post(action);
            } finally {
                state.user.logout();
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