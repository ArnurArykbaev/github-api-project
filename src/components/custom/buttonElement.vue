<template>
  <div>
    <button class="buttonElement" :disabled="disabled">
      {{ buttonTitle }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "buttonElement",
  data() {
    return {};
  },
  props: {
    buttonTitle: {
      type: String,
    },
    width: {
      type: [Number, String],
      default: 130,
    },
    height: {
      type: [String, Number],
      default: 36,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    borderRadius: {
      type: String,
      default: "15px",
    },
    textTranform: {
      type: String,
      default: "uppercase",
    },
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.buttonElement {
  padding: 8px;
  margin-top: 14px;
  margin: auto 0;
  display: inline-block;
  text-align: center;
  background: #f3f6f8;
  box-shadow: 4px 4px 7px rgba(0, 0, 0, 0.07), -4px -4px 13px #ffffff,
    6px 6px 36px #0000000f;
  border-radius: v-bind(borderRadius);
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 21px;
  text-decoration: none;
  color: #707585;
  text-transform: v-bind(textTranform);
  width: v-bind(width);
  height: v-bind(height);

  &:hover {
    text-decoration: none;
    color: #707585 !important;
  }
  &:active {
    text-decoration: none;
    color: #707585 !important;
    box-shadow: inset 4px 4px 5px rgba(0, 0, 0, 0.07),
      inset -4px -4px 13px #ffffff, inset 6px 6px 20px rgba(0, 0, 0, 0.06);
  }
  &:focus {
    color: #3e3e3e !important;
  }
  &:disabled {
    color: #707585 !important;
    background-color: #f3f6f8 !important;
  }
}
.v-btn--size-default {
  min-width: 36px;
}
</style>
