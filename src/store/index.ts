import { createStore } from "vuex";
import token from "./modules/token";
import user from "./modules/user";
import repositories from "./modules/repositories";

export default createStore({
  modules: {
    token,
    user,
    repositories,
  },
});
