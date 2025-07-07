<script setup>
import { MaAnimation, MaButton } from '@mobileaction/action-kit';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToHome = () => {
    router.push('/');
}
</script>

<template>
    <div class="not-found-container">
        <MaAnimation name="404-page" :width="400" :height="200"/>
        <p class="not-found-text">Page not found</p>
        <MaButton @click="goToHome">Go to Home</MaButton>
    </div>
</template>

<style lang="scss" scoped>
.not-found-container {
    @apply w-full h-full flex flex-col items-center justify-center gap-4;
    .not-found-text {
        @apply text-lg;       
    }
}
</style>