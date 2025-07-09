<script setup>
import TheNav from '../components/TheNav.vue';
import { MaButton, MaCard, MaLinkButton } from '@mobileaction/action-kit';
</script>

<template>
    <TheNav />
    <div class="ma-home-container">
        <MaCard class="ma-tool-card">
            <template #default>
                <div class="ma-tool-content">
                    <div class="ma-tool-icon">🔤</div>
                    <h3 class="ma-tool-title">Keyword Generator</h3>
                    <p class="ma-tool-desc">Generate n-gram keywords from text</p>
                    <MaLinkButton 
                        href="/keyword-generator"
                        size="medium"
                        variant="primary"
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
                    <div class="ma-tool-icon">📊</div>
                    <h3 class="ma-tool-title">Keyword Density</h3>
                    <p class="ma-tool-desc">Analyze keyword density in your content</p>
                    <MaButton 
                        size="medium"
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
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
    }
    
    &.ma-tool-card-placeholder {
        opacity: 0.7;
        
        &:hover {
            transform: translateY(-2px);
            opacity: 0.8;
        }
    }
}

.ma-tool-content {
    text-align: center;
    padding: 2rem;
}

.ma-tool-icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    display: block;
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
    border-radius: 12px;
    font-weight: 600;
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
