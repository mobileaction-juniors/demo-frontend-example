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
    /* @apply inline-block rounded-full border px-4 py-1 text-black font-semibold bg-white; */
    display: inline-block;
    border-radius: 9999px;
    border: 1px solid #e5e7eb;
    padding: 4px 16px;
    color: #000;
    font-weight: 600;
    background-color: #fff;
  }
</style> 