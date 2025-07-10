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
        <div class="ma-navbar-container">
            <MaButton
                @click="goHome"
                size="large"
                :variant="route.path == '/' ? 'filled' : 'ghost'"
                :color="route.path == '/' ? 'dark' : 'primary'"
                icon="menu"
                class="ma-nav-button"
            >
                Home
            </MaButton>
            <MaButton
                @click="goKeywordGenerator"
                size="large"
                :variant="route.path == '/keyword-generator' ? 'filled' : 'ghost'"
                :color="route.path == '/keyword-generator' ? 'dark' : 'primary'"
                icon="list"
                class="ma-nav-button"
            >
                Keyword Generator
            </MaButton>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
.ma-navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.75rem 1.5rem;
    z-index: 50;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.ma-navbar-container {
    width: 100%;
    max-width: 1280px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.25rem;
}

.ma-nav-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
</style>
