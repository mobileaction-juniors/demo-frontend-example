<script setup>
import { ref } from 'vue';
import { generateKeyword } from '@/utils/NGramUtils';
import { MaBadge, MaTextarea, MaButton, MaSelect2 } from '@mobileaction/action-kit';

const inputText = ref('');
const keywords = ref(null);
const error = ref('');

const nGramSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const nGramOptions = nGramSizes.map((size) => ({
    label: `${size}-gram`,
    value: size,
}));
const selectedNGrams = ref([]);

function generate() {
    error.value = '';

    if (!inputText.value.trim()) {
        error.value = 'Enter text!';
        keywords.value = null;
        return;
    }

    if (!selectedNGrams.value.length) {
        error.value = 'Select at least one n-gram size.';
        keywords.value = null;
        return;
    }

    keywords.value = generateKeyword(inputText.value, selectedNGrams.value);

    if (!keywords.value) {
        error.value = 'No keywords could be extracted.';
        keywords.value = null;
    }
}

function resetKeywords(){
    keywords.value = null;
    error.value = '';
    inputText.value = '';
}
</script>

<template>
    <div class="ma-keyword-generator">
        <div class="ma-input-panel">
            <h2>Keyword Generator</h2>
            <MaTextarea v-model="inputText" placeholder="Enter text" :rows="3"/>
            <MaSelect2 multiple :options="nGramOptions" v-model:value="selectedNGrams" placeholder="Select options"/>
            <MaButton color="dark" @click="generate">Generate</MaButton>
            <MaButton variant="stroke" @click="resetKeywords">Reset Keywords</MaButton>
        </div>
        <div class="ma-results-panel">
            <div v-if="keywords">
                <div v-for="group in keywords" :key="group.ngram" class="ma-ngram-group">
                    <strong>{{ group.ngram }}-gram ({{ group.keywords.length }})</strong>
                    <div class="ma-tag-list">
                        <MaBadge v-for="keyword in group.keywords" :key="keyword" size="large" type="secondary" variant="blue">
                            {{ keyword }}</MaBadge>
                    </div>
                </div>
            </div>
            <p v-else-if="error" class="ma-error-text">{{ error }}</p>
            <p v-else>Results will be in here</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.ma-keyword-generator {
    display: flex;
    gap: 40px;
    max-width: 960px;
    margin: 48px auto;
    padding: 0 20px;
    font-family: system-ui, sans-serif;
    color: #2c3e50;

    .ma-input-panel {
        flex: 0 0 400px;
        display: flex;
        flex-direction: column;
        gap: 12px;

        h2 {
            margin: 0;
        }
    }

    .ma-results-panel {
        flex: 1;
        border-left: 1px solid #eee;
        padding-left: 40px;

        strong {
            display: block;
            margin-bottom: 12px;
            font-size: 16px;
        }

        > p {
            color: #bbb;
        }

        .ma-error-text {
            color: red;
        }

        .ma-ngram-group {
            padding: 18px;
            background: #fafafa;
            border-radius: 8px;
            margin-bottom: 20px;

            .ma-tag-list {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
        }
    }
}
</style>
