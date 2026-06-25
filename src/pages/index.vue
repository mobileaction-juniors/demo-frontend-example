<script setup>
import { useRouter } from 'vue-router';
import { MaButton } from '@mobileaction/action-kit';

const router = useRouter();
const TASK_URL = 'https://mobileaction.atlassian.net/l/cp/7fw8MroM';

const goToKeywordPage = () => {
    router.push('/keyword-generator');
}
</script>

<template>
    <div class="px-6 py-24 text-center">
        <h1 class="text-3xl font-bold">Welcome to Onboarding Progress </h1>
        <p class="text-gray-600 my-6">You can see the your first task details via link. Please continue that steps while coding. </p>
        <div class="inline-flex gap-5">
            <MaButton variant="filled" color="dark" :href="TASK_URL" target="_blank">Implement First Front-End Task</MaButton>
            <MaButton variant="stroke" color="dark" @click="goToKeywordPage">Keyword Generator</MaButton>
        </div>
    </div>
</template>
