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

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
