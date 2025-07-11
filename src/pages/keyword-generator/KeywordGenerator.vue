<script setup>
import { ref, computed } from 'vue';
import { generateKeywords, getNGramOptions } from '../../utils/keywordGenerator';
import { MaInput, MaButton, MaCheckbox2, MaCard, MaEmpty, MaBadge } from '@mobileaction/action-kit';

const inputText = ref('');
const selectedNGrams = ref([1, 2, 3]);
const generatedKeywords = ref({});
const eliminateUnwanted = ref(true);

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
  };


const toggleNGram = (n) => {
    const index = selectedNGrams.value.indexOf(n);
    if (index > -1) {
        selectedNGrams.value.splice(index, 1);
    } else {
        selectedNGrams.value.push(n);
        selectedNGrams.value.sort((a, b) => a - b);
    }
    generateKeywordsFromInput();
};

const clearInput = () => {
    inputText.value = '';
    generatedKeywords.value = {};
};
</script>

<template>
    <div class="ma-container">
        <MaCard title="Keyword Generator" description="Enter your text and configure settings to generate n-gram keywords" class="ma-input-card">
            <template #default>
                <MaInput
                    v-model:value="inputText"
                    @update:value="generateKeywordsFromInput"
                    type="textarea"
                    placeholder="Paste your app description here..."
                    size="large"
                    rows="10"
                    class="ma-text-input"
                />
                <div class="ma-controls">
                    <MaButton @click="clearInput" size="medium" variant="stroke">Clear</MaButton>
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
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding: 1rem;

    .ma-input-card,
    .ma-results-card {
        flex: 1;
        min-width: 320px;
    }

    .ma-input-card {
        :deep(.ak-card__body) {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
        }

        .ma-controls {
            display: flex;
            align-items: center;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .ma-ngram-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 0.5rem;
            max-width: 24rem;
            margin-top: 0.75rem;
        }
    }

    .ma-results-card {
        .ma-results-content {
            width: 100%;
        }

        .ma-ngram-section {
            margin-bottom: 1rem;
            
            &:last-child {
                margin-bottom: 0;
            }
        }

        .ma-ngram-heading {
            font-size: 1.125rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #e5e7eb;
        }

        .ma-keywords-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .ma-keyword-badge {
            margin: 0.125rem;
        }

        .ma-placeholder-text {
            color: #6b7280;
            font-size: 0.875rem;
            font-style: italic;
            padding: 0.5rem 0;
        }

        .ma-empty-state {
            width: 100%;
            padding: 2rem 0;
        }
    }

    .ma-text-input {
        width: 100%;
    }
}
</style>
