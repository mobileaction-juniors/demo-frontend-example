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
  <div class="ma-keywords-section">
    <h3>{{ title }}</h3>
    <div v-if="keywords.length > 0" class="ma-keyword-tags">
      <MaBadge v-for="word in keywords" :key="word" size="medium" variant="green">{{ word }}</MaBadge>
    </div>
  </div>
</template>


<style>
.ma-keywords-section {
  margin: 10px;
  padding: 10px;
}

.ma-keyword-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
</style>