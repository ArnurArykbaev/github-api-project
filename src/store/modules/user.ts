import mutations from "../mutations";

const { SET_USER } = mutations;

const userStore = {
  state: {
    user: {},
  },
  getters: {
    user: ({ user }) => user,
  },
  mutations: {
    [SET_USER](state, newUser) {
      state.user = newUser;
    },
  },
  actions: {
    setUser({ commit }, newUser) {
      commit(SET_USER, newUser);
    },
  },
};

export default userStore;
