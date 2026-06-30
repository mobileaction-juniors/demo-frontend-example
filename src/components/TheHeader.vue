<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import TheNav from './TheNav.vue';

const mediaQuery = window.matchMedia('(min-width: 768px)');
const isDesktop = ref(mediaQuery.matches);
const syncIsDesktop = () => {
    isDesktop.value = mediaQuery.matches;
};

onMounted(() => mediaQuery.addEventListener('change', syncIsDesktop));
onBeforeUnmount(() => mediaQuery.removeEventListener('change', syncIsDesktop));
</script>

<template>
    <header class="flex p-4" :class="isDesktop ? 'justify-center' : 'justify-start'">
        <TheNav :is-desktop="isDesktop"/>
    </header>
</template>
