<script setup>
import { MaImage2 } from '@mobileaction/action-kit';
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
        <div class="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center sm:px-40">
            <span class="text-gray-800 text-xl font-bold tracking-wide sm:text-3xl">MA Frontend Demo</span>
            <nav class="flex flex-row flex-wrap justify-center gap-4 sm:gap-8">
                <router-link to="/" class="text-blue-500 hover:text-blue-700 font-medium transition-colors">
                    -Home-
                </router-link>
                <router-link to="/keyword-generator" class="text-blue-500 hover:text-blue-700 font-medium transition-colors">
                    -Keyword Generator-
                </router-link>
                <router-link to="/keyword-density" class="text-blue-500 hover:text-blue-700 font-medium transition-colors">
                    -Keyword Density-
                </router-link>
            </nav>
        </div>
    </div>
</template>
