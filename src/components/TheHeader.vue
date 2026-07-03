<script setup>
import TheMenu from './TheMenu.vue';
import { useThemeStore } from '@/stores/theme';
import sunIcon from '@/assets/sun.svg';
import moonIcon from '@/assets/moon.svg';

const theme = useThemeStore();
</script>

<template>
    <header class="flex items-center justify-between p-4">
        <TheMenu/>
        <button
            type="button"
            aria-label="Toggle theme"
            class="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200/80 bg-white/80 text-gray-700 shadow-lg backdrop-blur-md transition hover:bg-gray-100 active:scale-95"
            @click="theme.toggle"
        >
            <img :src="theme.isDark ? sunIcon : moonIcon" class="w-5 h-5" alt="">
        </button>
    </header>
</template>
