<template>
  <div class="repositories">
    <template v-if="repositories">
      <div
        class="container-column"
        v-for="repository in paginatedRepositories"
        :key="repository"
      >
        <repositoriesBoardCard
          @click="showRepositoryPage(repository)"
          :repository="repository"
        />
      </div>
    </template>
  </div>
  <template v-if="repositories">
    <Paginator
      :totalItems="repositories.length"
      :itemsPerPage="state.itemsPerPage"
      :currentPage="state.currentPage"
      @changePage="changePage"
    />
  </template>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { GET_USER } from "../queries/getters/getUser";
import { useQuery } from "@vue/apollo-composable";
import { useStore } from "vuex";

import Paginator from "./Paginator.vue";
import repositoriesBoardCard from "./repositoriesBoardCard.vue";
import starElement from "./custom/starElement.vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "Main",
  components: { starElement, repositoriesBoardCard, Paginator },
  setup(props, { emit }) {
    const router = useRouter();
    const route = useRoute();

    const store = useStore();
    const state = reactive({
      rating: 3,
      currentPage: 1,
      itemsPerPage: 9,
    });

    const repositories = computed(() => store.getters.repositories);

    const paginatedRepositories = computed(() => {
      const startIndex = (state.currentPage - 1) * state.itemsPerPage;
      const endIndex = startIndex + state.itemsPerPage;
      const allRepositories = repositories.value;

      if (Array.isArray(allRepositories)) {
        return allRepositories.slice(startIndex, endIndex);
      }

      // Handle the case when `repo` is not an array (e.g., handle error or return a default value)
      return [];
    });

    const changePage = (page) => {
      state.currentPage = page;
    };

    const showRepositoryPage = (repository) => {
      console.log("show", repository, repository.owner.login);

      router.push({
        name: "repository",
        params: { owner: repository.owner.login, name: repository.name },
      });
    };

    return {
      state,
      repositories,
      paginatedRepositories,
      changePage,
      showRepositoryPage,
    };
  },
  methods: {},
  computed: {},
});
</script>

<style lang="scss" scoped>
.repositories {
  display: flex;
  flex-wrap: wrap;
  row-gap: 2rem;
  margin-top: 5rem;
  justify-content: start;
  align-content: flex-start;
  min-height: 860px;
}

.container-column {
  width: 33.3%;
  @media (max-width: 960px) {
    width: 50%;
  }
  @media (max-width: 650px) {
    width: 100%;
  }

  &__inner {
    padding: 0 15px;
  }
}
</style>
