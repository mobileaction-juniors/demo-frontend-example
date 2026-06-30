<script setup>
import { useRouter } from 'vue-router';
import { MaButton } from '@mobileaction/action-kit';

const router = useRouter();
const TASK_URL = 'https://mobileaction.atlassian.net/l/cp/7fw8MroM';

const goTo = (path) => router.push(path);
</script>

<template>
    <div class="px-6 py-16 sm:py-24 text-center">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Welcome to Onboarding Progress </h1>
        <p class="text-gray-600 my-6 max-w-xl mx-auto">You can see the your first task details via link. Please continue that steps while coding. </p>
        <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            <MaButton variant="filled" color="dark" :href="TASK_URL" target="_blank">Implement First Front-End Task</MaButton>
            <MaButton variant="stroke" color="dark" @click="goTo('/keyword-generator')">Keyword Generator</MaButton>
            <MaButton variant="stroke" color="dark" @click="goTo('/keyword-density')">Keyword Density</MaButton>
        </div>
    </div>
</template>
