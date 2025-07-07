<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import TheHeader from '@/components/header/TheHeader.vue';

const route = useRoute();
const showHeader = computed(() => !route.meta.hideHeader);
</script>

<template>
  <div class="app-container">
    <TheHeader v-if="showHeader"/>
    <div class="content-container">        
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  @apply w-full h-screen bg-white flex flex-col;
  .content-container {
    @apply w-full flex-1 bg-white px-6 py-0 pb-6 flex flex-col items-center justify-center;
  }
}
</style>


