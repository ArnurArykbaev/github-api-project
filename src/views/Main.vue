<template>
  <div class="main">
    <div class="main-header">
      <div class="main-header__set">
        <div>
          <h3>Input main user here</h3>
          <div class="search__user">
            <div class="image">
              <img
                v-if="state.user?.avatarUrl"
                :src="state.user?.avatarUrl"
                alt=""
              />
              <img
                v-else
                src="../assets/343-3435180_default-user-profile-image-png-not-available-transparent.png"
                alt=""
              />
            </div>
            <div class="main-header__set__input">
              <div class="search__user">
                <inputElement
                  v-model="state.userName"
                  input-type="text"
                  input-width="170px"
                  :myBorderRadius="'25px'"
                  @keyup.enter="setUser"
                />
                <buttonElement
                  :button-title="'Enter'"
                  :width="'100px'"
                  :height="'50px'"
                  borderRadius="10px"
                  @click="setUser"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3>Input search repository here</h3>
          <div>
            <div class="main-header__set__input">
              <div class="search__repo">
                <inputElement
                  v-model="state.searchRepository"
                  input-type="text"
                  input-width="170px"
                  :myBorderRadius="'25px'"
                  @keyup.enter="setRepositories"
                />
                <buttonElement
                  :button-title="'Enter'"
                  :width="'100px'"
                  :height="'50px'"
                  borderRadius="10px"
                  @click="setRepositories"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <repositoriesBoard />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { GET_USER } from "../queries/getters/getUser";
import { GET_REPO_BY_SEARCH } from "../queries/getters/getSearch";
import { useQuery } from "@vue/apollo-composable";
import { useStore } from "vuex";
import repositoriesBoard from "../components/repositoriesBoard.vue";
import inputElement from "../components/custom/inputElement.vue";
import buttonElement from "../components/custom/buttonElement.vue";
import { SeachType } from "../types/searchType";

export default defineComponent({
  name: "Main",
  components: { repositoriesBoard, inputElement, buttonElement },
  setup(props, { emit }) {
    const store = useStore();
    const state = reactive({
      userName: "ArnurArykbaev",
      searchRepository: "",
      token: "",
      user: computed(() => store.getters.user),
    });

    const setUser = () => {
      const { onResult } = useQuery(GET_USER, {
        login: state.userName,
      });

      onResult((queryResult) => {
        store.dispatch("setUser", queryResult.data?.user);
        store.dispatch(
          "setRepositories",
          queryResult.data?.user?.repositories?.nodes
        );
      });
    };

    const setRepositories = () => {
      const { onResult } = useQuery(GET_REPO_BY_SEARCH, {
        first: 100,
        query: state.searchRepository,
        type: "REPOSITORY" as SeachType,
      });

      onResult((queryResult) => {
        if (queryResult.data?.search) {
          console.log("query", queryResult);
          console.log(queryResult.data);
          store.dispatch("setRepositories", queryResult.data?.search?.nodes);
        }
      });
    };

    return {
      state,
      setUser,
      setRepositories,
    };
  },
});
</script>

<style lang="scss" scoped>
.main {
  &-header {
    &__set {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .image {
        margin-right: 20px;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          box-shadow: -4px -4px 10px #ffffff,
            4px 4px 10px rgba(31, 36, 38, 0.07), -15px -15px 36px #ffffff,
            15px 15px 36px rgba(39, 40, 48, 0.06);
        }
      }

      &__input {
        display: flex;
        align-items: center;
        flex-direction: row;

        input {
          height: 30px;
          margin-right: 10px;
        }
      }
    }
  }
}
.search__repo,
.search__user {
  display: flex;
  flex-direction: row;
}

.search__repo {
  margin-top: 1.2rem;
}
</style>
