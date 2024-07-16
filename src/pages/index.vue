<script setup>

import { MaButton } from "@mobileaction/action-kit"


</script>
<template>
    <div style="text-align: center">
        <h1>Welcome to Onboarding Progress </h1>
        <p>You can see the your first task details via link. Please continue that steps while coding. </p>
        <a href="https://mobileaction.atlassian.net/l/cp/7fw8MroM" target="_blank"> Implement First Front-End Task </a>
        <div class="flex flex-col place-content-center m-40">
            <MaButton class="m-5" @click="$router.push('keyword-generator')">Click to go to Keyword Generator page</MaButton>
            <MaButton @click="$router.push('keyword-density')">Click to go to Keyword Count/Density page</MaButton>
        </div>
    </div>
</template>