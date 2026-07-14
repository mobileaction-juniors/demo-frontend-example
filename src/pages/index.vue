<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goToKeywordGenerator() {
  router.push({ name: "KeywordGenerator" });
}
</script>
<template>
    <div style="display:flex; flex-direction: column; align-items: center;" >
        <h1>Welcome to Onboarding Progress </h1>
        <p>You can see the your first task details via link. Please continue that steps while coding. </p>
        <a href="https://mobileaction.atlassian.net/l/cp/7fw8MroM" target="_blank"> Implement First Front-End Task </a>
        <button style="background-color: #1bcf6c; color: white; 
            border: none; padding: 10px 20px; 
            margin-top: 20px; font-size: 16px;
            cursor: pointer;" 
            @click="goToKeywordGenerator">Keyword Generator
        </button>
    </div>
</template>