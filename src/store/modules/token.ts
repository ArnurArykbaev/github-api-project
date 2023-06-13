import mutations from "../mutations";

const { SET_TOKEN } = mutations;

const tokenStore = {
  state: {
    token: "",
  },
  getters: {
    token: ({ token }) => token,
  },
  mutations: {
    [SET_TOKEN](state, newToken) {
      state.token = newToken;
    },
  },
  actions: {
    setToken({ commit }, newToken) {
      commit(SET_TOKEN, newToken);
    },
  },
};

export default tokenStore;
