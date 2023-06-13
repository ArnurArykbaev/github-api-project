import { createApp, h } from "vue";
import "./style.scss";
import App from "./App.vue";

//vuex
import store from "./store";

//vue-apollo-4
import { apolloClient } from "./plugins/apolloClient";
import { provideApolloClient } from "@vue/apollo-composable";

//vue-router-4
import { setupRouter } from "./router";
const router = setupRouter();

const app = createApp({
  setup() {
    provideApolloClient(apolloClient);
  },
  render: () => h(App),
}).use();

app.config.globalProperties.$store = store;

app.use(store).use(router).mount("#app");
