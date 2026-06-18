<script setup>
import { useRouter } from 'vue-router';


const router = useRouter()

const goToKeywordPage = () => {
    router.push('/keyword-generator');
}
</script>
<template>
    <div style="text-align: center">
        <h1>Welcome to Onboarding Progress </h1>
        <p>You can see the your first task details via link. Please continue that steps while coding. </p>
        <a href="https://mobileaction.atlassian.net/l/cp/7fw8MroM" target="_blank" class="ma-routing" style="text-decoration: none;"> Implement First Front-End Task </a>
        <button @click="goToKeywordPage" class="ma-routing">Keyword Generator</button>
    </div>
</template>

<style scoped>
.ma-routing{
    margin: 10px 10px;
    padding: 8px 24px;
    border: none;
    border-radius: 6px;
    background: #1a1a1a;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
}
</style>