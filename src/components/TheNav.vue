<script setup>
import { useRouter, useRoute } from 'vue-router';
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
        <button
            class="ma-nav-buttons"
            :class="{ active: route.path === '/' }"
            @click="goHome"
        >
            Home
        </button>
        <button
            class="ma-nav-buttons"
            :class="{ active: route.path === '/keyword-generator' }"
            @click="goKeywordGenerator"
        >
            Keyword Generator
        </button>
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

    .ma-nav-buttons {
        display: inline-flex;
        align-items: center;
        font-weight: 500;
        text-align: center;
        white-space: nowrap;
        user-select: none;
        border: 1px solid rgba(255, 255, 255, 0.3);
        padding: 0.75rem 1.5rem;
        font-size: 0.95rem;
        border-radius: 0.5rem;
        cursor: pointer;
        color: white;
        background: rgba(255, 255, 255, 0.15);
        margin-right: 1rem;
        transition: all 0.2s ease;

        &:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-1px);
        }

        &.active {
            background: rgba(255, 255, 255, 0.3);
            color: white;
        }
    }
}
</style>
