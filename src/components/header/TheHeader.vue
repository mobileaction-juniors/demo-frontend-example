<script setup>
    import TheNav from '@/components/header/TheNav.vue';
</script>

<template>
    <header class="header-container">
        <TheNav/>
    </header>
</template>

<style lang="css" scoped>
.header-container {
    @apply w-full min-h-16 flex justify-center items-center bg-white;
}
</style>
