<template>
  <span class="ma-badge">
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>
.ma-badge {
  @apply inline-block rounded-full border px-4 py-1 text-black font-semibold bg-white;
}
</style> 