<script setup>
import { ref } from 'vue';
import { generateKeyword } from '@/utils/NGramUtils';

const inputText = ref('');
const keywords = ref(null);
const error = ref('');

function generate() {
    error.value = '';

    if (!inputText.value.trim()) {
        error.value = 'Enter text!';
        keywords.value = null;
        return;
    }

    keywords.value = generateKeyword(inputText.value, 1, 6);

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
            <textarea v-model="inputText" rows="8"></textarea>
            <button @click="generate">Generate</button>
            <button @click="resetKeywords">Reset Keywords</button>
        </div>
        <div class="ma-results-panel">
            <div v-if="keywords">
                <div v-for="group in keywords" :key="group.ngram" class="ma-ngram-group">
                    <strong>{{ group.ngram }}-gram ({{ group.keywords.length }})</strong>
                    <div class="ma-tag-list">
                        <span v-for="keyword in group.keywords" :key="keyword" class="ma-tag-item">{{ keyword }}</span>
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
    max-width: 960px;
    margin: 48px auto;
    padding: 0 20px;
    font-family: system-ui, sans-serif;
}

.ma-input-panel {
    flex: 0 0 400px;

    textarea {
        width: 100%;
        min-height: 40px;
        padding: 12px;
        border: 1px solid #d0d0d0;
        border-radius: 4px;
        font-family: inherit;
        font-size: 16px;
        resize: vertical;
        box-sizing: border-box;
    }

    button {
        margin: 12px;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        background: #1a1a1a;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
    }
}

.ma-results-panel {
    flex: 1;
    border-left: 1px solid #ddd;
    padding-left: 32px;
    margin-left: 32px;

    strong {
        display: block;
        margin-bottom: 12px;
        font-size: 16px;
    }

    p {
        color: #bbb;
    }

    .ma-error-text {
        color: red;
    }
}

.ma-ngram-group {
    padding: 16px;
    background: #fafafa;
    border-radius: 8px;
    margin-bottom: 20px;
}

.ma-tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.ma-tag-item {
    display: inline-block;
    background: #e4e7ed;
    padding: 4px 12px;
    margin: 4px;
    border-radius: 4px;
    font-size: 12px;
}
</style>
