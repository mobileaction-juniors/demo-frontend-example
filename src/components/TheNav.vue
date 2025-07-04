<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
function goHome() {
    router.push('/');
}
</script>

<template>
    <button class="ma-btn ma-btn-secondary" style="position:fixed;top:1rem;left:1rem;z-index:1000;" @click="goHome">Home</button>
</template>
