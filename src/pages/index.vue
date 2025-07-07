<script setup>

import { MaButton } from '@mobileaction/action-kit';

const handleClick = () => {
    window.location.href = "https://mobileaction.atlassian.net/wiki/spaces/Engineerin/pages/1456243369/Implement+Your+First+Task+-+FrontEnd";
}

</script>

<template>  
    <div class="ma-home-container">
        <h1>Welcome to Onboarding Progress </h1>
        <p>You can see the your first task details via link. Please continue that steps while coding. </p>
        <MaButton @click="handleClick">See Details</MaButton>
    </div>
</template>

<style lang="scss" scoped>
.ma-home-container {
    @apply w-full h-screen bg-white flex flex-col items-center justify-center gap-4;
}

</style>