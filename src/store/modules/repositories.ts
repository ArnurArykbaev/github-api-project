import mutations from "../mutations";

const { SET_REPOSITORIES, SET_REPOSITORY } = mutations;

const repositoriesStore = {
  state: {
    repositories: {},
    repository: {}
  },
  getters: {
    repositories: ({ repositories }) => repositories,
    repository: ({ repository }) => repository,
  },
  mutations: {
    [SET_REPOSITORIES](state, newRepositories) {
      state.repositories = newRepositories;
    },
    [SET_REPOSITORY](state, newRepository) {
      state.repository = newRepository;
    },
  },
  actions: {
    setRepositories({ commit }, newRepositories) {
      commit(SET_REPOSITORIES, newRepositories);
    },
    setRepository({ commit }, newRepository) {
      commit(SET_REPOSITORY, newRepository);
    },
  },
};

export default repositoriesStore;
