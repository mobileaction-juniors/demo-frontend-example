<script setup>
import { ref } from 'vue';
import { MaButton, MaDrawer, MaImage2 } from '@mobileaction/action-kit';

const isNavigationDrawerOpen = ref(false);

const closeNavigationDrawer = () => {
    isNavigationDrawerOpen.value = false;
};
</script>

<template>
    <div class="relative m-4 rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-sm">
        <div class="mb-3 h-14 w-52 sm:absolute sm:left-4 sm:top-1/2 sm:mb-0 sm:-translate-y-1/2">
            <MaImage2
                src="/ma.png"
                alt="MobileAction logo"
                width="100%"
                height="100%"
                fit="contain"
            />
        </div>
        <div class="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center lg:px-52">
            <span class="text-gray-800 text-xl font-bold tracking-wide sm:text-xl">MA Frontend Demo</span>
            <nav class="flex w-full flex-row flex-nowrap justify-center gap-4 overflow-x-auto sm:gap-6">
                <router-link to="/" class="whitespace-nowrap text-blue-500 hover:text-blue-700 font-medium transition-colors">
                    -Home-
                </router-link>
                <router-link to="/keyword-generator" class="whitespace-nowrap text-blue-500 hover:text-blue-700 font-medium transition-colors">
                    -Keyword Generator-
                </router-link>
                <router-link to="/keyword-density" class="whitespace-nowrap text-blue-500 hover:text-blue-700 font-medium transition-colors">
                    -Keyword Density-
                </router-link>
            </nav>
        </div>
        <div class="mt-4 flex justify-center sm:absolute sm:right-4 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2">
            <MaButton @click="isNavigationDrawerOpen = true">
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
