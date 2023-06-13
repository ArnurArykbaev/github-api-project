<template>
  <div class="container-column__inner">
    <div class="repository-card">
      <div class="repository-card__header">
        <h3>{{ repository?.name }}</h3>
      </div>
      <div class="repository-card__stars">
        {{ getStars }}
        <starElement :rating="repository?.stargazerCount" />
      </div>
      <div class="repository-card__commit">
        <p class="last-commit">
          last commit: {{ getDate(repository?.updatedAt) }}
        </p>
      </div>
      <div class="repository-card__link">
        <a :href="repository?.url" target="_blank">
          <img src="../assets/github.png" alt="" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { GET_USER } from "../queries/getters/getUser";
import { useQuery } from "@vue/apollo-composable";
import { useStore } from "vuex";

import starElement from "./custom/starElement.vue";

type Repository = {
  name: string;
  stargazerCount: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  sshUrl: string;
  url: string;
};

export default defineComponent({
  name: "RepositoriesBoardCard",
  components: { starElement },
  props: {
    repository: {
      type: Object as () => Repository,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const state = reactive({
      rating: 3,
    });

    const repositories = computed(() => store.getters.repositories);
    return {
      state,
      repositories,
    };
  },
  methods: {
    getDate(time) {
      const date = new Date(time).toString();
      const dateArray = date.split(" ");
      const resultDate = `${dateArray[1]} ${dateArray[2]} ${dateArray[3]}`;
      return resultDate;
    },
  },
  computed: {
    getStars() {
      const stars = this.repository.stargazerCount;
      if (stars < 1000) return stars;
      if (stars < 1000000) return `${(stars / 1000).toFixed(1)} K`;
      if (stars < 1000000000) return `${(stars / 1000000).toFixed(1)} M`;
      return stars;
    },
  },
});
</script>

<style lang="scss" scoped>
.repository-card {
  cursor: pointer;
  height: 200px;
  background: #f3f6f8;
  box-shadow: -4px -4px 10px #ffffff, 4px 4px 10px rgba(31, 36, 38, 0.07),
    -15px -15px 36px #ffffff, 15px 15px 36px rgba(39, 40, 48, 0.06);
  border-radius: 30px;
  padding: 2rem;

  &__header {
    max-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 1rem;

    &:hover {
      overflow: visible;
      background-color: #fff;
    }

    h3 {
      background-color: #f3f6f8;
    }
  }

  &__commit {
    font-size: 12px;
  }

  &__link {
    cursor: pointer;
    img {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
