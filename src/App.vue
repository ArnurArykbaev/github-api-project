<script setup>
import Main from "./views/Main.vue";
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
@font-face {
  font-family: "Poppins";
  src: local("Poppins"), url(./fonts/Poppins-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "Poppins-medium";
  src: local("Poppins-medium"),
    url(./fonts/Poppins-Medium.ttf) format("truetype");
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
