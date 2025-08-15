<script setup lang="ts">
import VHeader from "@/components/molecules/VHeader.vue";
import VFooter from "@/components/molecules/VFooter.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <VHeader/>
    <main class="flex-1">
      <slot />
    </main>
    <VFooter/>
  </div>
</template>