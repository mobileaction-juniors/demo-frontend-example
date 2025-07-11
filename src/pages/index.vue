<script setup>
import { MaButton, MaCard, MaLinkButton, MaIcon } from '@mobileaction/action-kit';
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
        
        <MaCard class="ma-tool-card ma-tool-card-placeholder">
            <template #default>
                <div class="ma-tool-content">
                    <MaIcon name="chart-bar" size="xl" class="ma-tool-icon" />
                    <h3 class="ma-tool-title">Keyword Density</h3>
                    <p class="ma-tool-desc">Analyze keyword density in your content</p>
                    <MaButton 
                        size="small"
                        variant="stroke"
                        class="ma-tool-button"
                        disabled
                    >
                        Coming Soon
                    </MaButton>
                </div>
            </template>
        </MaCard>
    </div>
</template>

<style lang="scss" scoped>
.ma-home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 3rem 1rem;
    min-height: 80vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.ma-tool-card {
    width: 100%;
    max-width: 400px;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-4px);
    }
    
    &.ma-tool-card-placeholder {
        opacity: 0.7;
        
        &:hover {
            transform: translateY(-2px);
            opacity: 0.8;
        }
    }

    .ma-tool-content {
        text-align: center;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .ma-tool-icon {
        margin-bottom: 1.5rem;
        color: #14b8a6;
    }

    .ma-tool-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #2d3748;
        margin-bottom: 1rem;
    }

    .ma-tool-desc {
        font-size: 1rem;
        color: #718096;
        margin-bottom: 2rem;
        line-height: 1.5;
    }

    .ma-tool-button {
        width: 100%;
    }
}

@media (min-width: 768px) {
    .ma-home-container {
        flex-direction: row;
        justify-content: center;
        gap: 3rem;
        padding: 4rem 2rem;
    }
    
    .ma-tool-card {
        max-width: 350px;
    }
}
</style>
