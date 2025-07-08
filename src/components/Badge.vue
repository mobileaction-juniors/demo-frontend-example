<script setup>
defineProps({
  text: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <span class="ma-badge">
    <slot>{{ text }}</slot>
  </span>
</template>

<style lang="scss" scoped>
  .ma-badge {
    @apply inline-block rounded-full border px-4 py-1 text-black font-semibold bg-white;
  }
</style> 