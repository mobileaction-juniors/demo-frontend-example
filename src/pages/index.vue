<script setup>
import {MaCard, MaLinkButton, MaIcon } from '@mobileaction/action-kit';
</script>

<template>
    <div class="ma-home-container">
        <MaCard class="ma-tool-card">
            <template #default>
                <div class="ma-tool-content">
                    <MaIcon name="table-list" size="xl" class="ma-tool-icon" />
                    <h3 class="ma-tool-title">Keyword Generator</h3>
                    <p class="ma-tool-desc">Generate n-gram keywords from text</p>
                    <MaLinkButton 
                        href="/keyword-generator"
                        size="medium"
                        variant="primary"
                        icon="arrow-right"
                        class="ma-tool-button"
                    >
                        Open Tool
                    </MaLinkButton>
                </div>
            </template>
        </MaCard>
        
        <MaCard class="ma-tool-card">
            <template #default>
                <div class="ma-tool-content">
                    <MaIcon name="chart-bar" size="xl" class="ma-tool-icon" />
                    <h3 class="ma-tool-title">Keyword Density</h3>
                    <p class="ma-tool-desc">Analyze keyword density in your content</p>
                    <MaLinkButton 
                        href="/keyword-density"
                        size="medium"
                        variant="primary"
                        icon="arrow-right"
                        class="ma-tool-button"
                    >
                        Open Tool
                    </MaLinkButton>
                </div>
            </template>
        </MaCard>
    </div>
</template>

<style lang="scss" scoped>
.ma-home-container {
    @apply flex flex-col items-center gap-8 p-12 px-4 min-h-[80vh] bg-gradient-to-br from-gray-50 to-gray-200;
}

.ma-tool-card {
    @apply w-full max-w-sm transition-all duration-300 ease-in-out;
    
    &:hover {
        @apply -translate-y-1;
    }
    

    .ma-tool-content {
        @apply text-center p-8 flex flex-col justify-center items-center;
    }

    .ma-tool-icon {
        @apply mb-6 text-teal-600;
    }

    .ma-tool-title {
        @apply text-2xl font-semibold text-gray-700 mb-4;
    }

    .ma-tool-desc {
        @apply text-base text-gray-500 mb-8 leading-relaxed;
    }

    .ma-tool-button {
        @apply w-full;
    }
}

@media (min-width: 768px) {
    .ma-home-container {
        @apply flex-row justify-center gap-12 py-16 px-8;
    }
    
    .ma-tool-card {
        @apply max-w-sm;
    }
}
</style>
