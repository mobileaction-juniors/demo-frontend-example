<script setup>
import { ref, computed } from 'vue';
import { MaButton, MaDrawer, MaSwitch } from '@mobileaction/action-kit';
import { useThemeStore } from '@/stores/themeStore';

const isNavigationDrawerOpen = ref(false);

const closeNavigationDrawer = () => {
    isNavigationDrawerOpen.value = false;
};

const themeStore = useThemeStore();

const themeOptions = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' }
];

const currentTheme = computed({
    get: () => themeStore.isDarkMode ? 'dark' : 'light',
    set: (val) => {
        if ((val === 'dark') !== themeStore.isDarkMode) {
            themeStore.toggleTheme();
        }
    }
});
</script>

<template>
    <div class="m-4 flex flex-row justify-between items-center gap-4 rounded-lg border border-gray-100 bg-white px-4 py-1 shadow-sm sm:grid sm:grid-cols-[150px_1fr_150px] sm:gap-0 transition-colors">
        <div class="flex h-6 w-24 items-center justify-self-center sm:justify-self-start">
            <img
                src="/mobileaction.svg"
                alt="MobileAction logo"
                class="w-full h-full object-contain"
            />
        </div>
        <nav class="flex w-full flex-row flex-nowrap justify-center gap-2 sm:gap-4 items-center overflow-x-auto max-sm:!hidden">
            <router-link to="/" class="whitespace-nowrap rounded-md px-3 py-1.5 text-sm text-black hover:bg-gray-50 hover:text-blue-700 font-medium transition-colors">
                Home
            </router-link>
            <router-link to="/keyword-generator" class="whitespace-nowrap rounded-md px-3 py-1.5 text-sm text-black hover:bg-gray-50 hover:text-blue-700 font-medium transition-colors">
                Keyword Generator
            </router-link>
            <router-link to="/keyword-density" class="whitespace-nowrap rounded-md px-3 py-1.5 text-sm text-black hover:bg-gray-50 hover:text-blue-700 font-medium transition-colors">
                Keyword Density
            </router-link>
        </nav>
        <div class="justify-self-end flex gap-2 items-center">
            <MaSwitch 
                v-model:active="currentTheme"
                :options="themeOptions"
            />
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
