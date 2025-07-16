<script setup>
import { ref, computed, watch } from 'vue';
import { generateKeywords, getNGramOptions } from '../../utils/keywordGenerator';
import { MaInput, MaButton, MaCheckbox2, MaCard, MaEmpty, MaBadge } from '@mobileaction/action-kit';

const inputText = ref('');
const selectedNGrams = ref([1, 2, 3]);
const generatedKeywords = ref({});
const eliminateUnwanted = ref(true);
const shouldHighlight = ref(false);

// Store last generation state to compare
const lastGenerationState = ref({
    text: '',
    ngrams: [],
    unwanted: true
});

const keywordTags = computed(() => {
    return selectedNGrams.value.reduce((acc, n) => {
        const key = `${n}-gram`;
        acc[key] = generatedKeywords.value[key] || [];
        return acc;
    }, {});
});

const generateKeywordsFromInput = () => {
    const keywords = generateKeywords(inputText.value,
    selectedNGrams.value, eliminateUnwanted.value);
    generatedKeywords.value = keywords;
    shouldHighlight.value = false;
    
    // Update last generation state
    lastGenerationState.value = {
        text: inputText.value,
        ngrams: [...selectedNGrams.value],
        unwanted: eliminateUnwanted.value
    };
  };


const toggleNGram = (n) => {
    const index = selectedNGrams.value.indexOf(n);
    if (index > -1) {
        selectedNGrams.value.splice(index, 1);
    } else {
        selectedNGrams.value.push(n);
        selectedNGrams.value.sort((a, b) => a - b);
    }
    shouldHighlight.value = true;
};

const clearInput = () => {
    inputText.value = '';
    generatedKeywords.value = {};
    shouldHighlight.value = false;
};

watch(inputText, () => {
    shouldHighlight.value = true;
});

watch(eliminateUnwanted, () => {
    const hasChanged = eliminateUnwanted.value !== lastGenerationState.value.unwanted;
    shouldHighlight.value = hasChanged;
});

watch(selectedNGrams, () => {
    const hasChanged = JSON.stringify(selectedNGrams.value.sort()) !== JSON.stringify(lastGenerationState.value.ngrams.sort());
    shouldHighlight.value = hasChanged;
}, { deep: true });
</script>

<template>
    <div class="ma-container">
        <MaCard title="Keyword Generator" description="Enter your text and configure settings to generate n-gram keywords" class="ma-input-card">
            <template #default>
                <MaInput
                    v-model:value="inputText"
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
                        :highlight="shouldHighlight"
                        @click="generateKeywordsFromInput"
                    >
                        Generate Keywords
                    </MaButton>
                    <MaButton 
                        @click="clearInput" 
                        size="medium" 
                        variant="stroke" 
                        color="red"
                    >   
                        Clear
                    </MaButton>
                    <MaCheckbox2
                        v-model:checked="eliminateUnwanted"
                        @update:checked="generateKeywordsFromInput"
                    >
                        Hide unwanted words
                    </MaCheckbox2>
                </div>
                <div class="ma-ngram-grid">
                    <MaButton
                        v-for="n in getNGramOptions()"
                        :key="n"
                        @click="toggleNGram(n)"
                        size="small"
                        :variant="selectedNGrams.includes(n) ? 'filled' : 'stroke'"
                    >
                        {{ n }}-gram
                    </MaButton>
                </div>
            </template>
        </MaCard>
        
        <MaCard title="Generated Keywords" description="Your processed keywords will appear here" class="ma-results-card">
            <template #default>
                <div v-if="Object.keys(generatedKeywords).length > 0" class="ma-results-content">
                    <div v-for="ngram in Object.keys(keywordTags)" :key="ngram" class="ma-ngram-section">
                        <h6 class="ma-ngram-heading">{{ ngram }}</h6>
                        <div v-if="keywordTags[ngram].length" class="ma-keywords-container">
                            <MaBadge
                                v-for="item in keywordTags[ngram]"
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
    @apply mt-4 flex flex-wrap gap-6 p-4;

    .ma-input-card,
    .ma-results-card {
        @apply flex-1 min-w-80;
    }

    .ma-input-card {
        :deep(.ak-card__body) {
            @apply flex flex-col gap-5;
        }

        .ma-controls {
            @apply flex items-center gap-4 flex-wrap justify-start;
        }

        .ma-ngram-grid {
            @apply grid grid-cols-5 gap-2 max-w-96 mt-3;
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
</style>
