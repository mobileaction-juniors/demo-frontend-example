<script setup>
import { ref, computed } from 'vue';
import { generateKeywords, getNGramOptions } from '../../utils/keywordGenerator.js';
import TheNav from '../../components/TheNav.vue';
import { MaInput, MaButton, MaCheckbox2, MaCard } from '@mobileaction/action-kit';

const inputText = ref('');
const selectedNGrams = ref([1, 2, 3]);
const generatedKeywords = ref({});
const eliminateUnwanted = ref(true);

const nGramOptions = getNGramOptions();

const keywordTags = computed(() => {
    return selectedNGrams.value.reduce((acc, n) => {
        const key = `${n}-gram`;
        acc[key] = generatedKeywords.value[key] || [];
        return acc;
    }, {});
});

const generateKeywordsFromInput = () => {
    const keywords = generateKeywords(inputText.value, selectedNGrams.value, eliminateUnwanted.value);
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
    <TheNav />
    <div class="ma-container">
        <MaCard title="Keyword Generator" class="ma-input-card">
            <template #default>
                <div class="ma-input-section">
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
                            v-for="n in nGramOptions"
                            :key="n"
                            @click="toggleNGram(n)"
                            size="small"
                            :variant="selectedNGrams.includes(n) ? 'filled' : 'stroke'"
                        >
                            {{ n }}-gram
                        </MaButton>
                    </div>
                </div>
            </template>
        </MaCard>
        
        <MaCard title="Generated Keywords" class="ma-results-card">
            <template #default>
                <div v-if="Object.keys(keywordTags).length && selectedNGrams.length" class="ma-results-content">
                    <div v-for="ngram in Object.keys(keywordTags)" :key="ngram" class="ma-ngram-section">
                        <h6 class="ma-ngram-heading">{{ ngram }}</h6>
                        <div v-if="keywordTags[ngram].length" class="ma-keywords-container">
                            <div
                                v-for="item in keywordTags[ngram]"
                                :key="item.keyword"
                                class="ma-keyword-item"
                            >
                                <span class="ma-keyword-text">{{ item.keyword }}</span>
                                <span class="ma-keyword-count">({{ item.count }})</span>
                            </div>
                        </div>
                        <p v-else class="ma-placeholder-text">No keywords found for this n-gram.</p>
                    </div>
                </div>
                <div v-else class="ma-empty-state">
                    <p class="ma-placeholder-text">Keywords will appear here once generated.</p>
                </div>
            </template>
        </MaCard>
    </div>
</template>

<style lang="scss" scoped>
.ma-container {
    margin-top: 3.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    .ma-input-card,
    .ma-results-card {
        flex: 1 1 0;
        min-width: 250px;
    }

    .ma-input-section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: calc(100% - 2rem);
        padding-right: 1rem;

        .ma-text-input {
            :deep(.ak-input__input) {
                resize: none;
                width: 100%;
                max-width: 100%;
                box-sizing: border-box;
            }
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
            max-width: 400px;
        }
    }

    .ma-keyword-item {
        display: inline-flex;
        align-items: center;
        background: #7fc0b7;
        border: 1px solid #7fc0b7;
        border-radius: 0.375rem;
        padding: 0.375rem 0.75rem;
        margin: 2px;
        transition: background 0.2s ease;

        &:hover {
            background: #6fa8a1;
        }

        .ma-keyword-text {
            color: white;
            font-weight: 500;
            font-size: 0.875rem;
            margin-right: 0.25rem;
        }

        .ma-keyword-count {
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.75rem;
        }
    }

    .ma-keywords-container {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
}

</style>