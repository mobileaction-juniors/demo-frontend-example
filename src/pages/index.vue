<script setup>
import { useRouter } from 'vue-router';
import TheNav from '../components/TheNav.vue';
import { MaButton, MaCard } from '@mobileaction/action-kit';

const router = useRouter();

const goToKeywordGenerator = () => {
    router.push('/keyword-generator');
};
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
                    <MaButton 
                        @click="goToKeywordGenerator"
                        size="medium"
                        variant="primary"
                        class="ma-tool-button"
                    >
                        Open Tool
                    </MaButton>
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
