<script setup>
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { MaInput, MaButton, MaCheckbox2, MaCard, MaEmpty, MaBadge } from '@mobileaction/action-kit';
import { useKeywordGeneratorStore } from '../../stores/keywordGenerator';

const keywordGeneratorStore = useKeywordGeneratorStore();
const router = useRouter();

const generateKeywordsFromInput = keywordGeneratorStore.generateKeywordsFromInput;

const toggleNGram = (n) => {
    keywordGeneratorStore.toggleNGram(n);
    keywordGeneratorStore.setShouldHighlight(keywordGeneratorStore.inputText.trim() != '');
};

const clearInput = keywordGeneratorStore.clearAll;

const analyzeDensity = () => {
    if (!keywordGeneratorStore.inputText.trim()) return;
    
    router.push({
        path: '/keyword-density',
        query: { text: keywordGeneratorStore.inputText }
    });
};


watch(() => keywordGeneratorStore.inputText, () => {
    keywordGeneratorStore.setShouldHighlight(keywordGeneratorStore.inputText.trim() != '');
});

watch(() => keywordGeneratorStore.eliminateUnwanted, () => {
    const hasChanged = keywordGeneratorStore.eliminateUnwanted != keywordGeneratorStore.lastGenerationState.unwanted;
    keywordGeneratorStore.setShouldHighlight(hasChanged && keywordGeneratorStore.inputText.trim() != '');
});

watch(() => keywordGeneratorStore.selectedNGrams, () => {
    const current = [...keywordGeneratorStore.selectedNGrams].sort();
    const last = [...keywordGeneratorStore.lastGenerationState.ngrams].sort();
    const hasChanged = current.length != last.length || current.some((val, i) => val != last[i]);
    keywordGeneratorStore.setShouldHighlight(hasChanged && keywordGeneratorStore.inputText.trim() != '');
}, { deep: true });
</script>

<template>
    <div class="ma-container">
        <MaCard title="Keyword Generator" description="Enter your text and configure settings to generate n-gram keywords" class="ma-input-card">
            <template #default>
                <MaInput
                    v-model:value="keywordGeneratorStore.inputText"
                    type="textarea"
                    placeholder="Paste your app description here..."
                    size="large"
                    rows="10"
                    class="ma-text-input"
                />
                <div class="ma-controls">
                    <MaButton 
                        color="green"
                        size="medium" 
                        variant="stroke"
                        icon="rocket-bulk"
                        :highlight="keywordGeneratorStore.shouldHighlight"
                        :disabled="keywordGeneratorStore.isGenerating || !keywordGeneratorStore.inputText.trim()"
                        @click="generateKeywordsFromInput"
                    >
                        {{ keywordGeneratorStore.isGenerating ? 'Generating...' : 'Generate Keywords' }}
                    </MaButton>
                    <MaButton 
                        size="medium" 
                        variant="stroke" 
                        color="red"
                        :disabled="!keywordGeneratorStore.inputText.trim()"
                        @click="clearInput" 
                    >   
                        Clear
                    </MaButton>
                    <MaButton
                        size="medium"
                        variant="stroke"
                        color="blue"
                        icon="angle-double-right"
                        :disabled="!keywordGeneratorStore.inputText.trim()"
                        @click="analyzeDensity"
                    >
                        Analyze Density
                    </MaButton>
                </div>
                <div class="ma-checkbox-wrapper">
                    <MaCheckbox2
                        v-model:checked="keywordGeneratorStore.eliminateUnwanted"
                    >
                        Hide unwanted words
                    </MaCheckbox2>
                </div>
                <div class="ma-ngram-grid">
                    <MaButton
                        v-for="n in keywordGeneratorStore.getNGramOptionsList()"
                        :key="n"
                        size="small"
                        :variant="keywordGeneratorStore.selectedNGrams.includes(n) ? 'filled' : 'stroke'"
                        @click="toggleNGram(n)"
                    >
                        {{ n }}-gram
                    </MaButton>
                </div>
            </template>
        </MaCard>
        
        <MaCard title="Generated Keywords" description="Your processed keywords will appear here" class="ma-results-card">
            <template #default>
                <div v-if="Object.keys(keywordGeneratorStore.generatedKeywords).length > 0" class="ma-results-content">
                    <div v-for="ngram in Object.keys(keywordGeneratorStore.keywordTags)" :key="ngram" class="ma-ngram-section">
                        <h6 class="ma-ngram-heading">{{ ngram }}</h6>
                        <div v-if="keywordGeneratorStore.keywordTags[ngram].length" class="ma-keywords-container">
                            <MaBadge
                                v-for="item in keywordGeneratorStore.keywordTags[ngram]"
                                :key="item.keyword"
                                type="primary"
                                variant="dark"
                                size="large"
                                icon="tag"
                                class="ma-keyword-badge"
                            >
                                {{ item.keyword }} ({{ item.count }})
                            </MaBadge>
                        </div>
                        <p v-else class="ma-placeholder-text">No keywords found for this n-gram.</p>
                    </div>
                </div>
                <div v-else class="ma-empty-state">
                    <MaEmpty description="Keywords will appear here once generated" animation="no-data-found" size="medium" />
                </div>
            </template>
        </MaCard>
    </div>
</template>

<style lang="scss" scoped>
.ma-container {
    @apply mt-4 flex flex-wrap gap-6 p-4 lg:flex-nowrap;

    .ma-input-card,
    .ma-results-card {
        @apply flex-1 min-w-0 md:min-w-80;
    }

    .ma-input-card {
        :deep(.ak-card__body) {
            @apply flex flex-col gap-5;
        }

        .ma-controls {
            @apply flex items-center gap-4 flex-wrap justify-start py-2;
        }

        .ma-ngram-grid {
            @apply grid grid-cols-3 gap-2 max-w-96 mt-3 sm:grid-cols-4 md:grid-cols-5;
        }
    }

    .ma-results-card {
        .ma-results-content {
            @apply w-full;
        }

        .ma-ngram-section {
            @apply mb-4;
            
            &:last-child {
                @apply mb-0;
            }
        }

        .ma-ngram-heading {
            @apply text-lg font-semibold mb-3 pb-2 border-b border-gray-200;
        }

        .ma-keywords-container {
            @apply flex flex-wrap gap-2;
        }

        .ma-keyword-badge {
            @apply m-0.5;
        }

        .ma-placeholder-text {
            @apply text-gray-500 text-sm italic py-2;
        }

        .ma-empty-state {
            @apply w-full py-8;
        }
    }

    .ma-text-input {
        @apply w-full;
    }

}

@media (max-width: 640px) {
    .ma-container {
        @apply flex-col gap-4 p-2;
        
        .ma-input-card,
        .ma-results-card {
            @apply w-full min-w-0;
        }
    }
}
</style>
