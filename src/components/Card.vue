<template>
  <div class="ma-card">
    <div class="ma-card-header-container">
        <div class="ma-inner-title">{{ title }}</div>
        <div class="ma-inner-description">{{ description }}</div>
    </div>
    <slot />
  </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    }
})
</script>
<style scoped>
.ma-card {
  @apply w-full h-full bg-white p-6 rounded-xl border border-gray-200 shadow-sm gap-4 flex flex-col;
}
.ma-card-header-container {
    @apply flex flex-col gap-2;
}
.ma-inner-title {
    @apply text-2xl font-bold;
}
.ma-inner-description {
    @apply text-base text-gray-500;
}
</style>
