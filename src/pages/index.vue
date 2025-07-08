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
        <div class="ma-tools-grid">
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
            transition: all 0.2s ease;

            &:hover {
                transform: translateY(-2px);
            }

            &.ma-tool-card-placeholder {
                opacity: 0.7;

                &:hover {
                    transform: none;
                }
            }

            .ma-tool-content {
                text-align: center;
                padding: 1rem;

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