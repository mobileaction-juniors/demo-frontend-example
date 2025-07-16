<script setup>
import { useRouter, useRoute } from 'vue-router';
import { MaButton } from '@mobileaction/action-kit';
import { computed } from 'vue';

const PAGES = {
    HOME: '/',
    KEYWORD_GENERATOR: '/keyword-generator',
};

const router = useRouter();
const route = useRoute();

function goHome() {
    router.push(PAGES.HOME);
}
function goKeywordGenerator() {
    router.push(PAGES.KEYWORD_GENERATOR);
}

const useNavButtonVariant = (pagePath) => {
    return computed(() => route.path == pagePath ? 'filled' : 'ghost');
};

const useNavButtonColor = (pagePath) => {
    return computed(() => route.path == pagePath ? 'dark' : 'primary');
};

const homeVariant = useNavButtonVariant(PAGES.HOME);
const homeColor = useNavButtonColor(PAGES.HOME);
const keywordGeneratorVariant = useNavButtonVariant(PAGES.KEYWORD_GENERATOR);
const keywordGeneratorColor = useNavButtonColor(PAGES.KEYWORD_GENERATOR);
</script>

<template>
    <nav class="ma-navbar">
        <MaButton
            @click="goHome"
            size="medium"
            :variant="homeVariant"
            :color="homeColor"
            icon="menu"
        >
            Home
        </MaButton>
        <MaButton
            @click="goKeywordGenerator"
            size="medium"
            :variant="keywordGeneratorVariant"
            :color="keywordGeneratorColor"
            icon="list"
        >
            Keyword Generator
        </MaButton>
    </nav>
</template>

<style lang="scss" scoped>
.ma-navbar {
    @apply sticky top-0 w-full bg-white border-b border-gray-200 flex justify-start items-center px-6 py-3 gap-1 z-50 shadow-sm;
}

</style>
