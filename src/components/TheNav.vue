<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
function goHome() {
    router.push('/');
}
</script>

<template>
    <button class="ma-nav-buttons ma-nav-buttons-secondary ma-home-fixed" @click="goHome">Home</button>
</template>

<style scoped>
.ma-home-fixed {
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 1000;
}
.ma-nav-buttons {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    cursor: pointer;
    text-decoration: none;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
}

.ma-nav-buttons-secondary {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
}
</style>
