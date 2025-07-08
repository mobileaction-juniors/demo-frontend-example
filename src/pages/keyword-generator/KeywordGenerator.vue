<script setup>
import { ref, computed } from 'vue';
import { generateKeywords, getNGramOptions } from '../../utils/keywordGenerator.js';
import TheNav from '../../components/TheNav.vue';
import { MaInput, MaButton, MaCheckbox, MaBadge } from '@mobileaction/action-kit';

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
        <div class="ma-card-content">
            <h5 class="ma-card-title">Keyword Generator</h5>
            <MaInput
                v-model:value="inputText"
                @update:value="generateKeywordsFromInput"
                type="textarea"
                placeholder="Paste your app description here..."
                size="large"
                rows="10"
                class="ma-text-input"
            />
            <MaButton @click="clearInput" size="medium" variant="stroke">Clear</MaButton>
            <div class="ma-eliminate-toggle-row">
                <MaCheckbox
                    v-model:checked="eliminateUnwanted"
                    @update:checked="generateKeywordsFromInput"
                >
                    Hide unwanted words
                </MaCheckbox>
            </div>
            <div class="ma-ngram-grid">
                <MaButton
                    v-for="n in nGramOptions"
                    :key="n"
                    class="ma-ngram-btn"
                    @click="toggleNGram(n)"
                    size="small"
                    :style="selectedNGrams.includes(n) ? 'background: #7fc0b7; border-color: #7fc0b7; color: white;' : 'background: transparent; border-color: #7fc0b7; color: #7fc0b7;'"
                >
                    {{ n }}-gram
                </MaButton>
            </div>
        </div>
        <div class="ma-card-content">
            <template v-if="Object.keys(keywordTags).length && selectedNGrams.length">
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
            </template>
            <template v-else>
                <p class="ma-placeholder-text">Keywords will appear here once generated.</p>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.ma-container {
    margin-top: 3.5rem;
    max-width: 100%;
    width: 100%;
    overflow-x: hidden;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    box-sizing: border-box;
    .ma-card-content {
        border: 1px solid #ccc;
        border-radius: 0.25rem;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        min-width: 250px;
        flex: 1 1 0;
        .ma-card-title {
            font-size: 1.25rem;
            font-weight: 500;
            margin-bottom: 0.5rem;
        }
        .ma-text-input {
            width: 100%;
            max-width: 100%;
            min-height: 200px;
            box-sizing: border-box;
        }
        
        .ma-text-input :deep(.ak-input) {
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box;
        }
        
        .ma-text-input :deep(.ak-input__input) {
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box;
            resize: none;
            min-height: 150px;
        }
        .ma-ngram-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-template-rows: repeat(2, auto);
            gap: 0.5rem;
            margin: 0.5rem 0 0.5rem 0;
            width: 100%;
            max-width: 400px;
            align-self: flex-start;
        }
        .ma-ngram-btn {
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
        }
        .ma-ngram-section {
            margin-bottom: 1.5rem;
        }
        .ma-ngram-heading {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            margin-top: 0.5rem;
        }
        .ma-keywords-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            width: 100%;
        }
        
        .ma-keyword-item {
            display: inline-flex;
            align-items: center;
            background: #7fc0b7;
            border: 1px solid #7fc0b7;
            border-radius: 0.375rem;
            padding: 0.375rem 0.75rem;
            margin: 0.125rem;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
            transition: all 0.2s ease;
        }
        
        .ma-keyword-item:hover {
            background: #6fa8a1;
            border-color: #6fa8a1;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .ma-keyword-text {
            color: white;
            font-weight: 500;
            font-size: 0.875rem;
            margin-right: 0.25rem;
        }
        
        .ma-keyword-count {
            color: rgba(255, 255, 255, 0.8);
            font-weight: 400;
            font-size: 0.75rem;
        }
        .ma-placeholder-text {
            color: #6c757d;
        }
        .ma-eliminate-toggle-row {
            margin: 0.5rem 0;
            display: flex;
            align-items: center;
        }
    }
}

</style>