<script setup>
import { MaBadge } from "@mobileaction/action-kit";

defineProps({
  title: {
    type: String,
    required: true,
  },
  keywords: {
    type: Array,
    default: () => [],
    required: true,
  },
});
</script>
<template>
  <div class="p-4 m-8">
    <h3>{{ title }}</h3>
    <div v-if="keywords.length > 0" class="flex flex-wrap gap-8">
      <MaBadge v-for="word in keywords" :key="word" size="medium" variant="green">{{ word }}</MaBadge>
    </div>
  </div>
</template>