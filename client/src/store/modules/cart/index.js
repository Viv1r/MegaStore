import mutations from "./mutations";
import axios from "axios";
import user from "../user";

const api = axios.create({
    baseURL: 'api/'
});

export default {
    namespaced: true,

    state() {
        return {
            products: []
        }
    },

    mutations,

    getters: {
        cartGetCount: state => id => {
            const target = state.products.find(product => product.id === id);
            if (target) {
                return target.count;
            }
            return 0;
        },

        cartSize(state) {
            return state.products.reduce((prev, product) => prev + product.count, 0);
        },

        cartTotal(state) {
            return state.products.reduce((accum, product) => accum + product.price * product.count, 0);
        }
    },

    actions: {
        loadCart({commit}) {
            const data = JSON.parse(localStorage.getItem('cart'));

            if (data) {
                data.forEach(product => commit('addToCart', product));
            } else {
                localStorage.removeItem('cart');
            }
        },

        async checkout({state, commit}) {
            if (!user.state.user.loggedIn) return alert('Please log in!');

            const action = 'purchase';
            const body = {
                products: state.products.map(({id, title, count}) => {
                    return { id: id, title: title, count: count };
                })
            };

            let data;
            try {
                const response = await api.post(action, body);
                data = response.data;
            } finally {
                if (data.statusCode === 'ok') {
                    alert(`Thanks for your purchase! Total paid: $${data.purchase.sum}`);
                    state.products = [];
                    commit('clearCart');
                } else if (data.statusMessage) {
                    alert(data.statusMessage);
                }
            }
        }
    }
};