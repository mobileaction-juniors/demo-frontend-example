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

<template>
  <div class="ma-card">
    <div class="ma-card-header-container">
        <div class="ma-inner-title">{{ title }}</div>
        <div class="ma-inner-description">{{ description }}</div>
    </div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
    .ma-card {
        /* @apply w-full h-full bg-white p-6 rounded-xl border border-gray-200 shadow-sm gap-4 flex flex-col; */
        width: 100%;
        height: 100%;
        background-color: #fff;
        padding: 24px;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
        gap: 16px;
        display: flex;
        flex-direction: column;
        .ma-card-header-container {
            /* @apply flex flex-col gap-2; */
            display: flex;
            flex-direction: column;
            gap: 8px;

            .ma-inner-title {
                /* @apply text-2xl font-bold; */
                font-size: 24px;
                font-weight: 600;
            }
            .ma-inner-description {
                /* @apply text-base text-gray-500; */
                font-size: 16px;
                color: #6b7280;
            }
        }
    }
</style>
