<script setup>
import { useRouter } from 'vue-router';
import TheNav from '../components/TheNav.vue';
import { MaButton } from '@mobileaction/action-kit';

const router = useRouter();

const goToKeywordGenerator = () => {
    router.push('/keyword-generator');
};
</script>

<template>
    <TheNav />
    <div class="ma-home-container">
        <div class="ma-tools-grid">
            <div class="ma-tool-card">
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
            
            <div class="ma-tool-card ma-tool-card-placeholder">
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
        </div>
    </div>
</template>

<style lang="scss" scoped>
.ma-home-container {
    min-height: 100vh;
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    margin-top: 4rem;

    .ma-tools-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        max-width: 500px;

        .ma-tool-card {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 0.75rem;
            padding: 2rem 1.5rem;
            text-align: center;
            transition: all 0.2s ease;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                border-color: #cbd5e0;
            }

            &.ma-tool-card-placeholder {
                opacity: 0.7;

                &:hover {
                    transform: none;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                }
            }

            .ma-tool-icon {
                font-size: 2.5rem;
                margin-bottom: 1rem;
            }

            .ma-tool-title {
                font-size: 1.25rem;
                font-weight: 600;
                color: #2d3748;
                margin-bottom: 0.5rem;
            }

            .ma-tool-desc {
                font-size: 0.875rem;
                color: #718096;
                margin-bottom: 1.5rem;
                line-height: 1.4;
            }

            .ma-tool-button {
                width: 100%;
                max-width: 160px;
            }
        }
    }
}

@media (max-width: 768px) {
    .ma-home-container {
        padding: 1rem;
        
        .ma-tools-grid {
            grid-template-columns: 1fr;
            max-width: 300px;
        }
    }
}
</style>