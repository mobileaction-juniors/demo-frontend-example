<template>
  <div class="layout">
    <VHeader />
    <main class="main-content">
      <router-view />
    </main>
    <VFooter />
  </div>
</template>

<script setup lang="ts">
import VHeader from "@/components/organisms/VHeader.vue";
import VFooter from "@/components/organisms/VFooter.vue";
</script>

<style>
@reference "tailwindcss";

.layout {
  @apply min-h-screen flex flex-col;
}

.main-content {
  @apply flex-1;
}
</style>
