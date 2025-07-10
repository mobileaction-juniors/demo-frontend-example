<script setup>
import { ref, computed } from 'vue';
import { generateKeywords, getNGramOptions } from '../../utils/keywordGenerator.js';
import TheNav from '../../components/TheNav.vue';
import { MaInput, MaButton, MaCheckbox2, MaCard, MaEmpty } from '@mobileaction/action-kit';

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
    <div class="keyword-generator-container">
        <MaCard title="Keyword Generator" description="Enter your text and configure settings to generate n-gram keywords" class="generator-card">
            <template #default>
                <div class="generator-content">
                    <MaInput
                        v-model:value="inputText"
                        @update:value="generateKeywordsFromInput"
                        type="textarea"
                        placeholder="Paste your app description here..."
                        size="large"
                        rows="10"
                        class="ma-text-input"
                    />
                    <div class="controls">
                        <MaButton @click="clearInput" size="medium" variant="stroke">Clear</MaButton>
                        <MaCheckbox2
                            v-model:checked="eliminateUnwanted"
                            @update:checked="generateKeywordsFromInput"
                        >
                            Hide unwanted words
                        </MaCheckbox2>
                    </div>
                    <div class="ngram-grid">
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
        
        <MaCard title="Generated Keywords" description="Your processed keywords will appear here" class="results-card">
            <template #default>
                <div v-if="Object.keys(generatedKeywords).length > 0" class="results-content">
                    <div v-for="ngram in Object.keys(keywordTags)" :key="ngram" class="ngram-section">
                        <h6 class="ngram-title">{{ ngram }}</h6>
                        <div v-if="keywordTags[ngram].length" class="keyword-tags">
                            <div
                                v-for="item in keywordTags[ngram]"
                                :key="item.keyword"
                                class="keyword-tag"
                            >
                                <span class="keyword-text">{{ item.keyword }}</span>
                                <span class="keyword-count">({{ item.count }})</span>
                            </div>
                        </div>
                        <p v-else class="no-keywords">No keywords found for this n-gram.</p>
                    </div>
                </div>
                <div v-else class="empty-state">
                    <MaEmpty description="Keywords will appear here once generated" animation="no-data-found" size="medium" />
                </div>
            </template>
        </MaCard>
    </div>
</template>

<style lang="scss" scoped>
.keyword-generator-container {
    margin-top: 4rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding: 1rem;
}

.generator-card,
.results-card {
    flex: 1;
    min-width: 320px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.generator-content {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    max-width: 100%;
}

.controls {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
}

.ngram-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
    max-width: 24rem;
}

.results-content {
    width: 100%;
}

.ngram-section {
    margin-bottom: 1rem;
    
    &:last-child {
        margin-bottom: 0;
    }
}

.ngram-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e5e7eb;
}

.keyword-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.keyword-tag {
    display: inline-flex;
    align-items: center;
    background-color: #14b8a6;
    border: 1px solid #14b8a6;
    border-radius: 0.375rem;
    padding: 0.375rem 0.75rem;
    margin: 0.125rem;
    transition: background-color 0.2s;
    
    &:hover {
        background-color: #0d9488;
    }
}

.keyword-text {
    color: white;
    font-weight: 500;
    font-size: 0.875rem;
    margin-right: 0.25rem;
}

.keyword-count {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.75rem;
}

.no-keywords {
    color: #6b7280;
    font-size: 0.875rem;
    font-style: italic;
    padding: 0.5rem 0;
}

.empty-state {
    width: 100%;
    padding: 2rem 0;
}

.ma-text-input :deep(.ak-input__input) {
    resize: none;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
}
</style>