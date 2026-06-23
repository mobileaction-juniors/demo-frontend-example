<script setup>
import { useRouter } from 'vue-router';


const router = useRouter()

const goToKeywordPage = () => {
    router.push('/keyword-generator');
}
</script>
<template>
    <div class="text-center">
        <h1>Welcome to Onboarding Progress </h1>
        <p>You can see the your first task details via link. Please continue that steps while coding. </p>
        <a href="https://mobileaction.atlassian.net/l/cp/7fw8MroM" target="_blank" class="m-3 py-2 px-6 rounded bg-[#1a1a1a] text-white text-base cursor-pointer no-underline"> Implement First Front-End Task </a>
        <button @click="goToKeywordPage" class="m-3 py-2 px-6 rounded bg-[#1a1a1a] text-white text-base cursor-pointer no-underline">Keyword Generator</button>
    </div>
</template>
