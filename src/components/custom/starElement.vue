<template>
  <div class="stars">
    <div
      v-for="(star, index) in 5"
      :key="index"
      :class="{ star_rated: ratingStars.includes(index) }"
      class="star"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";

export default defineComponent({
  name: "starElement",
  props: {
    rating: {
      type: Number,
      default: 3,
    },
  },
  components: {},
  setup(props, { emit }) {
    const ratingStars = computed(() => {
      let res: number[] = [];
      for (let i = 0; i < props.rating; i++) {
        res.push(i);
      }
      return res;
    });
    return { ratingStars };
  },
});
</script>

<style lang="scss">
.stars {
  margin: 5px 0 5px 0;
  display: flex;
  justify-content: center;
  column-gap: 2px;
}

.star {
  display: inline-block;
  vertical-align: top;
  width: 20px;
  height: 20px;
  background: linear-gradient(
    to bottom,
    rgba(197, 196, 196, 1) 0%,
    rgba(180, 179, 178, 1) 100%
  );
  position: relative;
}

.star:before {
  content: "";
  position: absolute;
  top: 1px;
  left: 1px;
  bottom: 1px;
  right: 1px;
  background: linear-gradient(
    to bottom,
    rgba(221, 220, 219, 1) 0%,
    rgba(209, 208, 206, 1) 100%
  );
  z-index: 1;
}

.star,
.star:before {
  -webkit-clip-path: polygon(
    50% 0%,
    66% 27%,
    98% 35%,
    76% 57%,
    79% 91%,
    50% 78%,
    21% 91%,
    24% 57%,
    2% 35%,
    32% 27%
  );
  clip-path: polygon(
    50% 0%,
    66% 27%,
    98% 35%,
    76% 57%,
    79% 91%,
    50% 78%,
    21% 91%,
    24% 57%,
    2% 35%,
    32% 27%
  );
}

.star_rated {
  background: linear-gradient(
    to bottom,
    rgba(224, 194, 75, 1) 0%,
    rgba(207, 125, 0, 1) 100%
  );
}

.star_rated:before {
  background: linear-gradient(
    to bottom,
    rgba(243, 212, 85, 1) 0%,
    rgba(238, 164, 0, 1) 100%
  );
}
</style>
