<template>
  <input
    class="inputElement"
    :placeholder="modelValue"
    :value="modelValue"
    @input="$emit('update:modelValue', $event?.target?.value)"
    :type="inputType"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "inputComponent",
  data() {
    return {};
  },
  props: {
    modelValue: String,
    inputType: String,
    inputWidth: {
      type: [Number, String],
      default: "100%",
    },
    myBorderRadius: {
      type: [Number, String],
      default: "20px",
    },
  },
  methods: {},
  computed: {},
});
</script>

<style lang="scss" scoped>
.inputElement {
  max-width: v-bind(inputWidth);
  font-size: 14px;
  flex-grow: 1;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 20px;
  padding-right: 35px;
  background: #f3f6f8;
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 4px 4px 8px rgba(66, 83, 107, 0.09), inset 0px -4px 8px #ffffff,
    inset 1px 3px 8px rgba(66, 83, 107, 0.22);
  border-radius: v-bind(myBorderRadius);
  font-family: "Poppins", Helvetica, Arial, sans-serif;

  &:hover {
    text-decoration: none;
    color: #707585 !important;
    box-shadow: inset 4px 4px 5px rgba(0, 0, 0, 0.07),
      inset -4px -4px 13px #ffffff, inset 6px 6px 20px rgba(0, 0, 0, 0.06);
  }
  &:focus {
    outline: none;
  }
}
::placeholder {
  color: #0000;
  opacity: 2; /* Firefox */
}
</style>
