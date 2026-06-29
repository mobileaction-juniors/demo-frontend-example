<script setup>
import { ref } from 'vue';
import { MaButton, MaDrawer, MaImage2 } from '@mobileaction/action-kit';

const isNavigationDrawerOpen = ref(false);

const closeNavigationDrawer = () => {
    isNavigationDrawerOpen.value = false;
};
</script>

<template>
    <div class="m-4 grid grid-cols-1 items-center gap-4 rounded-lg border border-gray-100 bg-white px-4 py-1 shadow-sm sm:grid-cols-[150px_1fr_150px] sm:gap-0">
        <div class="flex justify-center sm:justify-start">
            <div class="flex items-center h-6 w-24">
                <MaImage2
                    src="/ma.png"
                    alt="MobileAction logo"
                    width="100%"
                    height="100%"
                    fit="contain"
                />
            </div>
        </div>
        <div class="flex justify-center overflow-x-auto">
            <nav class="flex w-full flex-row flex-nowrap justify-center gap-2 sm:gap-4 items-center">
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
        </div>
        <div class="flex items-center justify-center sm:justify-end">
            <MaButton size="small" @click="isNavigationDrawerOpen = true">
                Menu
            </MaButton>
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
