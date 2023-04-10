import axios from "axios";

const api = axios.create({
    baseURL: 'api/'
});

class User {
    name;
    email;
    profilePicture;
    loggedIn = false;

    auth({name, email, profilePicture}) {
        [this.name, this.email, this.profilePicture] = [name, email, profilePicture];
        this.loggedIn = true;
    };

    logout() {
        this.name = this.email = undefined;
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
        setAuthStatus(state, status) {
            state.processingAuth = !!status;
        },

        pushAuthError(state, error) {
            state.authError = error;
        },

        setProfilePicture(state, newURL) {
            if (newURL.length) {
                state.user.profilePicture = newURL;
            }
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
                        profilePicture: user.profile_picture
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
                        profilePicture: user.profilePicture
                    });
                } else if (data?.statusMessage) {
                    commit('pushAuthError', data.statusMessage);
                }
                commit('setAuthStatus', false);
            }
        },

        async updateProfilePicture({commit}, imageBase64) {
            const action = 'user/picture';
            let data;
            try {
                const response = await api.post(action, { picture: imageBase64 });
                data = response.data;
            } finally {
                if (data?.profile_picture) {
                    commit('setProfilePicture', data.profile_picture);
                    alert('Your profile picture was updated successfully!')
                }
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