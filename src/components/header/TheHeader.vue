<script setup>
    import TheNav from '@/components/header/TheNav.vue';
</script>

<template>
    <header class="ma-header-container">
        <TheNav/>
    </header>
</template>

<style lang="css" scoped>
.ma-header-container {
    @apply w-full min-h-16 flex justify-center items-center bg-white sticky top-0 z-10;
    @apply max-md:px-4;
}
</style>
