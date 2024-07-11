<script setup>
import { useRouter } from 'vue-router';
import { MaButton } from "@mobileaction/action-kit"

const router = useRouter();

const handleGeneratorButton = () => {
    router.push('/keyword-generator');
}

const handleDensityButton = () => {
    router.push('/keyword-density');
}
</script>

<template>
    <div style="text-align: center">
        <h1>Welcome to Onboarding Progress </h1>
        <p>You can see the your first task details via link. Please continue that steps while coding. </p>
        <a href="https://mobileaction.atlassian.net/l/cp/7fw8MroM" target="_blank"> Implement First Front-End Task </a>
        <br><br><br><br>
        <ma-button type="primary" variant="danger" size="middle" @click="handleGeneratorButton">Try Keyword Generator!</ma-button>
        <br><br>
        <ma-button type="primary" variant="danger" size="middle" @click="handleDensityButton">Try Keyword Density!</ma-button>
    </div>
</template>