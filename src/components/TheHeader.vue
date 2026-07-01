<script setup>
import TheMenu from './TheMenu.vue';
import { useThemeStore } from '@/stores/theme';

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
            <svg v-if="theme.isDark" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="4"/>
                <path stroke-linecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
        </button>
    </header>
</template>
