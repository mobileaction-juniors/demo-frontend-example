<script setup lang="ts">
import { MaButton } from '@mobileaction/action-kit';

const openTaskLink = () => {
    window.open('https://mobileaction.atlassian.net/l/cp/7fw8MroM', '_blank');
};
</script>

<template>
    <div class="homepage-container">
        <div class="content-center">
            <h1 class="main-title">Welcome to Onboarding Progress</h1>
            <p class="description">
                You can see your first task details via the link below. 
                Please continue with these steps while coding.
            </p>
            <div class="button-section">
                <MaButton 
                    type="primary" 
                    @click="openTaskLink"
                    size="large"
                >
                    Implement First Front-End Task
                </MaButton>
            </div>
        </div>
    </div>
</template>

<style scoped>
@reference "tailwindcss";

.homepage-container {
    @apply p-8 max-w-4xl mx-auto pt-16;
}

.content-center {
    @apply text-center space-y-8;
}

.main-title {
    @apply text-4xl font-bold text-gray-800 mb-6;
}

.description {
    @apply text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto;
}

.button-section {
    @apply mt-12;
}
</style>