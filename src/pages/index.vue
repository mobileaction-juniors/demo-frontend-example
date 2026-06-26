<script setup>
import { MaButton } from '@mobileaction/action-kit';
import { useRouter } from 'vue-router';

const router = useRouter();

const openTaskLink = () => {
    window.open('https://mobileaction.atlassian.net/l/cp/7fw8MroM', '_blank');
};
</script>
<template>
    <div class="flex flex-col items-center justify-center pt-12 space-y-6 max-w-2xl mx-auto text-center font-sans">
        <h1 class="text-3xl font-bold text-slate-800 m-0">Welcome to Onboarding Progress</h1>
        <p class="text-gray-500 text-lg">You can see the your first task details via link. Please continue that steps while coding.</p>
        
        <div class="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <MaButton @click="openTaskLink">
                Implement First Front-End Task
            </MaButton>
            
            <MaButton type="primary" @click="router.push('/keyword-generator')">
                Open Keyword Generator
            </MaButton>
        </div>
    </div>
</template>
