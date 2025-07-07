<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import TheHeader from '@/components/header/TheHeader.vue';

const route = useRoute();
const showHeader = computed(() => !route.meta.hideHeader);
</script>

<template>  
  <div class="ma-app-container">
    <TheHeader v-if="showHeader"/>
    <router-view class="ma-content-container"/>
  </div>
</template>

<style lang="scss" scoped>
.ma-app-container {
  @apply w-full min-h-screen bg-white flex flex-col;
  .ma-content-container {
    @apply w-full flex-1 bg-white px-6 pb-6 flex flex-col items-center justify-center;
  }
}
</style>


