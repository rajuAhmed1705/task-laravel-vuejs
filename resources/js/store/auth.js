import axios from "axios";

export default {
    namespaced: true,
    state: {
        token: null,
        user: null
    },
    getters: {
        authenticated(state) {
            return state.user && state.token;
        },
        user(state) {
            return state.user;
        }
    },
    mutations: {
        SET_TOKEN(state, { access_token }) {
            state.token = access_token;
        },
        SET_USER(state, { user }) {
            state.user = user;
        },
        DELETE_USER(state) {
            state.user = null;
        },
        DELETE_TOKEN(state) {
            state.token = null;
        }
    },
    actions: {
        async signIn({ commit }, credentials) {
            try {
                let response = await axios.post("/login", credentials);
                commit("SET_TOKEN", response.data);
                commit("SET_USER", response.data);
            } catch (error) {
                commit("SET_TOKEN", null);
                commit("SET_USER", null);
            }
        },
        async signUp({ commit }, credentials) {
            try {
                let response = await axios.post("/register", credentials);
                commit("SET_TOKEN", response.data);
                commit("SET_USER", response.data);
            } catch (error) {
                commit("SET_TOKEN", null);
                commit("SET_USER", null);
            }
        },
        signOut({ commit }) {
            return axios.get("/logout").then(() => {
                commit("DELETE_TOKEN");
                commit("DELETE_USER");
            });
        }
    }
};
