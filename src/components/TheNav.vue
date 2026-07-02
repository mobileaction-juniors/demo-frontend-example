<script setup>
import { ref } from 'vue';
import { MaButton, MaDrawer } from '@mobileaction/action-kit';
import { useThemeStore } from '@/stores/themeStore';

const isNavigationDrawerOpen = ref(false);

const closeNavigationDrawer = () => {
    isNavigationDrawerOpen.value = false;
};

const themeStore = useThemeStore();
</script>

<template>
    <div class="m-4 flex flex-row justify-between items-center gap-4 rounded-lg border border-gray-100 bg-white dark:!bg-slate-800 dark:!border-slate-700 px-4 py-1 shadow-sm sm:grid sm:grid-cols-[150px_1fr_150px] sm:gap-0 transition-colors">
        <div class="flex h-6 w-24 items-center justify-self-center sm:justify-self-start">
            <img
                src="/mobileaction.svg"
                alt="MobileAction logo"
                class="w-full h-full object-contain"
            />
        </div>
        <nav class="flex w-full flex-row flex-nowrap justify-center gap-2 sm:gap-4 items-center overflow-x-auto max-sm:!hidden">
            <router-link to="/" class="whitespace-nowrap rounded-md px-3 py-1.5 text-sm text-black dark:!text-white hover:bg-gray-50 dark:hover:!bg-slate-700 hover:text-blue-700 dark:hover:!text-blue-400 font-medium transition-colors">
                Home
            </router-link>
            <router-link to="/keyword-generator" class="whitespace-nowrap rounded-md px-3 py-1.5 text-sm text-black dark:!text-white hover:bg-gray-50 dark:hover:!bg-slate-700 hover:text-blue-700 dark:hover:!text-blue-400 font-medium transition-colors">
                Keyword Generator
            </router-link>
            <router-link to="/keyword-density" class="whitespace-nowrap rounded-md px-3 py-1.5 text-sm text-black dark:!text-white hover:bg-gray-50 dark:hover:!bg-slate-700 hover:text-blue-700 dark:hover:!text-blue-400 font-medium transition-colors">
                Keyword Density
            </router-link>
        </nav>
        <div class="justify-self-end flex gap-2 items-center">
            <MaButton size="small" variant="stroke" @click="themeStore.toggleTheme">
                {{ themeStore.isDarkMode ? 'Light' : 'Dark' }}
            </MaButton>
            <MaButton class="max-sm:!block sm:!hidden" size="small" icon="menu" @click="isNavigationDrawerOpen = true" />
        </div>
        <MaDrawer
            v-model:visible="isNavigationDrawerOpen"
            title="Navigation"
            placement="right"
            width="320px"
        >
            <nav class="flex flex-col gap-3">
                <router-link
                    to="/"
                    class="rounded-md px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                    @click="closeNavigationDrawer"
                >
                    Home
                </router-link>
                <router-link
                    to="/keyword-generator"
                    class="rounded-md px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                    @click="closeNavigationDrawer"
                >
                    Keyword Generator
                </router-link>
                <router-link
                    to="/keyword-density"
                    class="rounded-md px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                    @click="closeNavigationDrawer"
                >
                    Keyword Density
                </router-link>
            </nav>
        </MaDrawer>
    </div>
</template>
