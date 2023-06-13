<template>
  <a :href="currentRepository?.url" target="_blank">
    <div class="repository">
      <h1>{{ currentRepository.name }}</h1>
      <div class="repository__stars">
        <p>{{ getStars }}</p>
        <starElement :rating="currentRepository?.stargazerCount" />
        <p>
          last commit:
          <span>{{ getDate(currentRepository?.updatedAt).toUpperCase() }}</span>
        </p>
      </div>

      <div class="repository__user">
        <div class="image">
          <img
            v-if="currentRepository?.owner?.avatarUrl"
            :src="currentRepository?.owner?.avatarUrl"
            alt=""
          />
          <img
            v-else
            src="../assets/343-3435180_default-user-profile-image-png-not-available-transparent.png"
            alt=""
          />
        </div>
        <a :href="currentRepository?.owner?.url" target="_blank">
          <div class="login">
            <h2>{{ currentRepository?.owner?.login }}</h2>
            <p>{{ currentRepository?.owner?.url }}</p>
          </div>
        </a>
      </div>

      <div class="repository__language">
        <div
          v-for="language in currentRepository?.languages?.nodes"
          :key="language"
          class="language-badge"
          :style="{ borderColor: language?.color }"
        >
          {{ language?.name }}
        </div>
      </div>

      <div class="repository__description">
        {{ currentRepository?.description }}
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onMounted } from "vue";
import { GET_USER } from "../queries/getters/getUser";
import { useQuery } from "@vue/apollo-composable";
import { useStore } from "vuex";
import { GET_REPO_BY_NAME } from "../queries/getters/getRepoByName";
import { useRoute, useRouter } from "vue-router";
import starElement from "../components/custom/starElement.vue";

export default defineComponent({
  name: "RepositoryPage",
  components: { starElement },
  setup(props, { emit }) {
    const route = useRoute();
    const router = useRouter();

    const store = useStore();
    const state = reactive({});

    const name = route.params.name;
    const owner = route.params.owner;

    onMounted(() => {
      setRepository();
    });

    const setRepository = () => {
      const { onResult } = useQuery(GET_REPO_BY_NAME, {
        name,
        owner,
      });

      onResult((queryResult) => {
        if (queryResult.data?.repository) {
          console.log(queryResult.data?.repository);
          store.dispatch("setRepository", queryResult.data?.repository);
          console.log("A", store.getters.repository);
        }
      });
    };

    const currentRepository = computed(() => store.getters.repository);

    const getDate = (time) => {
      const date = new Date(time).toString();
      const dateArray = date.split(" ");
      const resultDate = `${dateArray[1]} ${dateArray[2]} ${dateArray[3]}`;
      return resultDate;
    };

    return {
      state,
      setRepository,
      currentRepository,
      getDate,
    };
  },
  computed: {
    repo() {
      return this.$store.getters.repository;
    },
    getStars() {
      const stars = this.repo.stargazerCount;
      console.log("GET", this.repo);
      if (stars < 1000) return stars;
      if (stars < 1000000) return `${(stars / 1000).toFixed(1)} K`;
      if (stars < 1000000000) return `${(stars / 1000000).toFixed(1)} M`;
      return stars;
    },
  },
});
</script>

<style lang="scss">
a {
  color: #000;

  &:hover {
    color: #000;
  }
}

.repository {
  min-height: 100%;
  background: #f3f6f8;
  box-shadow: -4px -4px 10px #ffffff, 4px 4px 10px rgba(31, 36, 38, 0.07),
    -15px -15px 36px #ffffff, 15px 15px 36px rgba(39, 40, 48, 0.06);
  border-radius: 30px;
  padding: 2rem 18rem;

  &__stars {
    margin-top: 2rem;
    font-size: 20px;

    p {
      margin: 0;
    }
  }

  &__user {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 3rem;

    .image {
      margin-right: 20px;
      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        box-shadow: -4px -4px 10px #ffffff, 4px 4px 10px rgba(31, 72, 38, 0.07),
          -15px -15px 36px #ffffff, 15px 15px 36px rgba(39, 40, 48, 0.06);
      }
    }

    .login {
      margin-left: 1rem;
      display: flex;
      flex-direction: column;
      cursor: pointer;

      p {
        margin: 0;
      }
    }
  }

  &__language {
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;

    .language-badge {
      margin: 10px;
      border: 5px solid;
      border-radius: 30px;
      padding: 8px 16px;
      font-size: 18px;
    }
  }

  &__description {
    margin-top: 2rem;
  }
}

.repository:hover {
  box-shadow: -8px -8px 20px #ffffff, 8px 8px 20px rgba(41, 46, 48, 0.1),
    -30px -30px 72px #ffffff, 30px 30px 72px rgba(45, 46, 56, 0.1);
}
</style>
