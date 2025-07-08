<script setup>
import { useRouter, useRoute } from 'vue-router';
import { MaButton } from '@mobileaction/action-kit';

const router = useRouter();
const route = useRoute();

function goHome() {
    router.push('/');
}
function goKeywordGenerator() {
    router.push('/keyword-generator');
}
</script>

<template>
    <nav class="ma-navbar">
        <MaButton
            @click="goHome"
            size="medium"
            :variant="route.path === '/' ? 'primary' : 'stroke'"
            class="ma-nav-button"
        >
            Home
        </MaButton>
        <MaButton
            @click="goKeywordGenerator"
            size="medium"
            :variant="route.path === '/keyword-generator' ? 'primary' : 'stroke'"
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
    left: 0;
    width: 100%;
    background: #7fc0b7;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem 2rem;
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    .ma-nav-button {
        margin-right: 1rem;
    }
}
</style>
