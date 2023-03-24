import axios from "axios";

const api = axios.create({
    baseURL: 'api/'
});

class User {
    name;
    email;
    profilePicture;
    token;
    loggedIn = false;

    auth({name, email, token, profilePicture}) {
        [this.name, this.email, this.token, this.profilePicture] = [name, email, token, profilePicture];
        this.loggedIn = true;
    };

    logout() {
        this.name = this.email = this.token = undefined;
        this.loggedIn = false;
    };
}

export default {
    namespaced: true,

    state: {
        user: new User(),
        processingAuth: false,
        authError: null
    },

    mutations: {
        setAuthStatus(store, status) {
            store.processingAuth = !!status;
        },

        pushAuthError(store, error) {
            store.authError = error;
        }
    },

    actions: {
        async loadUser({state}) {
            const action = 'token-auth';
            let data;
            try {
                const response = await api.post(action);
                data = response.data;
            } finally {
                if (data?.user) {
                    const user = data.user;
                    state.user?.auth({
                        name: user.name,
                        email: user.email,
                        token: user.auth_token,
                        profilePicture: user.profilePicture
                    });
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
                if (data?.user) {
                    const user = data.user;
                    state.user?.auth({
                        name: user.name,
                        email: user.email,
                        token: user.auth_token,
                        profilePicture: user.profilePicture
                    });
                } else if (data?.statusMessage) {
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
                if (data?.user) {
                    const user = data.user;
                    state.user?.auth({
                        name: user.name,
                        email: user.email,
                        token: user.auth_token,
                        profilePicture: user.profilePicture
                    });
                } else if (data?.statusMessage) {
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
        }
    }
}