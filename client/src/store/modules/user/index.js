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

        setName(state, newName) {
            if (newName) {
                state.user.name = newName;
            }
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
            let result;
            try {
                const response = await api.post(action, { picture: imageBase64 });
                result = response.data;
            } finally {
                if (result?.profile_picture) {
                    commit('setProfilePicture', result.profile_picture);
                    alert('Your profile picture was updated successfully!');
                }
            }
        },

        async updateUserData({commit}, newData) {
            const action = 'user/update';
            let result;
            try {
                const response = await api.post(action, newData);
                result = response.data;
            } finally {
                if (result?.statusCode === 'ok') {
                    commit('setName', newData.name);
                    alert('Your data was updated successfully!');
                } else if (result?.statusMessage) {
                    alert(result.statusMessage);
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