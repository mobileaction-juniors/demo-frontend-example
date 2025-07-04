<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
function goHome() {
    router.push('/');
}
</script>

<template>
    <button class="ma-home-fixed" @click="goHome">Home</button>
</template>

<style lang="scss" scoped>
.ma-home-fixed {
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 1000;
}
</style>
