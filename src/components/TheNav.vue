<template>
    <div class="flex flex-col items-center m-4 space-y-1">
        <span class="text-gray-800 text-xl font-bold tracking-wide">MA Frontend Demo</span>
        <div class="flex flex-row justify-center gap-8 w-full">
            <router-link to="/" class="text-blue-500 hover:text-blue-700 font-medium transition-colors">
                -Home-
            </router-link>
            <router-link to="/keyword-generator" class="text-blue-500 hover:text-blue-700 font-medium transition-colors">
                -Keyword Generator-
            </router-link>
            <router-link to="/keyword-density" class="text-blue-500 hover:text-blue-700 font-medium transition-colors">
                -Keyword Density-
            </router-link>
        </div>
    </div>
</template>
