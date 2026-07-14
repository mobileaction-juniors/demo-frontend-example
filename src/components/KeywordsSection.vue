<script setup>
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
    <p v-if="keywords.length > 0">{{ keywords.join(", ") }}</p>
  </div>
</template>
