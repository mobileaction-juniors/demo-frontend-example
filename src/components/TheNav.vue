<template>
  <div class="ma-navbar">
      <router-link to="/keyword-generator" class="ma-router-item">
        <a-button class="ma-router-link" ghost>Keyword Generator</a-button>
      </router-link>
      <router-link to="/keyword-density" class="ma-router-item">
        <a-button class="ma-router-link" ghost>Keyword Density</a-button>
      </router-link>
  </div>
</template>
<script setup>
  import { Button as AButton } from "ant-design-vue";
</script>

<style>
.ma-router-item {
  @apply pl-4 pt-4 pb-4 text-base;
}

.ma-router-link {
  @apply text-white w-40 rounded-md;
}

.ma-navbar {
  @apply w-full mb-10 mt-0 bg-cyan-800 flex flex-row;
}
</style>