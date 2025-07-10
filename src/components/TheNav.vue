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
            class="ma-nav-button"
        >
            Home
        </MaButton>
        <MaButton
            @click="goKeywordGenerator"
            size="medium"
            :variant="keywordGeneratorVariant"
            :color="keywordGeneratorColor"
            icon="list"
            class="ma-nav-button"
        >
            Keyword Generator
        </MaButton>
    </nav>
</template>

<style lang="scss" scoped>
.ma-navbar {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 1200px;
    background-color: white;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0.75rem 1.5rem;
    gap: 0.25rem;
    z-index: 50;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

</style>
