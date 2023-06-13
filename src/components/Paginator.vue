<template>
  <div v-if="totalPages !== 0" class="paginator">
    <button
      class="page-button"
      :disabled="currentPage === 1"
      @click="previousPage"
    >
      Previous
    </button>
    <button
      class="page-button"
      :class="{ active__page: page === currentPage ? true : false }"
      v-for="page in pages"
      :key="page"
      :disabled="page > totalPages"
      @click="changePage(page)"
    >
      {{ page }}
    </button>
    <button
      class="page-button"
      :disabled="currentPage === totalPages"
      @click="nextPage"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  name: "Paginator",
  props: {
    totalItems: {
      type: Number,
      default: 0,
    },
    itemsPerPage: {
      type: Number,
      default: 9,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {};
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    pages() {
      if (this.currentPage <= 3) {
        return [1, 2, 3, 4, 5];
      }
      if (this.currentPage <= 5 && this.totalPages <= 5) {
        return [1, 2, 3, 4, 5];
      }

      if (this.totalPages >= this.currentPage + 2) {
        return [
          this.currentPage - 2,
          this.currentPage - 1,
          this.currentPage,
          this.currentPage + 1,
          this.currentPage + 2,
        ];
      } else if (this.totalPages >= this.currentPage + 1) {
        return [
          this.currentPage - 3,
          this.currentPage - 2,
          this.currentPage - 1,
          this.currentPage,
          this.currentPage + 1,
        ];
      } else {
        return [
          this.currentPage - 4,
          this.currentPage - 3,
          this.currentPage - 2,
          this.currentPage - 1,
          this.currentPage,
        ];
      }
    },
  },
  methods: {
    previousPage() {
      if (this.currentPage > 1) {
        const prev = this.currentPage - 1;
        this.changePage(prev);
      }
    },
    changePage(page) {
      this.$emit("changePage", page);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        const next = this.currentPage + 1;
        this.changePage(next);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.paginator {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}

button {
  margin: 0 5px;
}

.active__page {
  color: #000 !important;
  background: #f3f6f8;
  box-shadow: -4px -4px 10px #ffffff, 4px 4px 10px rgba(31, 36, 38, 0.07),
    -15px -15px 36px #ffffff, 15px 15px 36px rgba(39, 40, 48, 0.06);
}
.page-button {
  color: #5f5a5a;
  background-color: transparent;
  border: none;

  &:hover {
    border: none;
    background: #f3f6f8;
    box-shadow: -4px -4px 10px #ffffff, 4px 4px 10px rgba(31, 36, 38, 0.07),
      -15px -15px 36px #ffffff, 15px 15px 36px rgba(39, 40, 48, 0.06);
  }
  &:disabled {
    color: #c0c0c0;
    border: none;
    background: #f3f6f8;
    box-shadow: none;
    cursor: auto;
  }
}
</style>
