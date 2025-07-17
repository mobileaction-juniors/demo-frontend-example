<script setup>
import { useRouter, useRoute } from 'vue-router';
import { MaButton } from '@mobileaction/action-kit';
import { computed } from 'vue';

const PAGES = {
    HOME: '/',
    KEYWORD_GENERATOR: '/keyword-generator',
    KEYWORD_DENSITY: '/keyword-density',
};

const router = useRouter();
const route = useRoute();

function goHome() {
    router.push(PAGES.HOME);
}
function goKeywordGenerator() {
    router.push(PAGES.KEYWORD_GENERATOR);
}
function goKeywordDensity() {
    router.push(PAGES.KEYWORD_DENSITY);
}

const useNavButtonStyle = (pagePath) => {
    return computed(() => ({
        variant: route.path === pagePath ? 'filled' : 'ghost',
        color: route.path === pagePath ? 'dark' : 'primary'
    }));
};

const homeStyle = useNavButtonStyle(PAGES.HOME);
const keywordGeneratorStyle = useNavButtonStyle(PAGES.KEYWORD_GENERATOR);
const keywordDensityStyle = useNavButtonStyle(PAGES.KEYWORD_DENSITY);
</script>

<template>
    <nav class="ma-navbar">
        <MaButton
            @click="goHome"
            size="medium"
            :variant="homeStyle.variant"
            :color="homeStyle.color"
            icon="menu"
        >
            Home
        </MaButton>
        <MaButton
            @click="goKeywordGenerator"
            size="medium"
            :variant="keywordGeneratorStyle.variant"
            :color="keywordGeneratorStyle.color"
            icon="list"
        >
            Keyword Generator
        </MaButton>
        <MaButton
            @click="goKeywordDensity"
            size="medium"
            :variant="keywordDensityStyle.variant"
            :color="keywordDensityStyle.color"
            icon="chart-bar"
        >
            Keyword Density
        </MaButton>
    </nav>
</template>

<style lang="scss" scoped>
.ma-navbar {
    @apply sticky top-0 w-full bg-white border-b border-gray-200 flex flex-wrap justify-start items-center px-2 py-2 gap-1 z-50 shadow-sm sm:px-6 sm:py-3 sm:gap-2 md:flex-nowrap;
}

</style>
