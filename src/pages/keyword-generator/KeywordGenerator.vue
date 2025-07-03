<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { cleanDescription } from '../../utils/CleanDescription';

const userInput = ref('');
const generatedKeywords = ref(null);
const activeTab = ref('1-gram');

const textareaRef = ref(null);
function autoResize() {
    nextTick(() => {
        if (textareaRef.value) {
            textareaRef.value.style.height = 'auto';
            textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px';
        }
    });
}

onMounted(autoResize);
watch(userInput, autoResize);

function generateKeywords() {
    const cleaned = cleanDescription(userInput.value);
    const words = cleaned.split(/\s+/).filter(word => word);

    generatedKeywords.value = {
        '1-gram': generateNGrams(words, 1),
        '2-gram': generateNGrams(words, 2),
        '3-gram': generateNGrams(words, 3),
    };
}

function generateNGrams(words, n) {
    const ngrams = new Map();
    for (let i = 0; i <= words.length - n; i++) {
        const ngram = words.slice(i, i + n).join(' ');
        ngrams.set(ngram, (ngrams.get(ngram) || 0) + 1);
    }
    return Array.from(ngrams.entries())
        .sort(([, countA], [, countB]) => countB - countA)
        .map(([keyword, count]) => ({ keyword, count }));
}

function clearInput() {
    userInput.value = '';
    generatedKeywords.value = null;
}

const currentKeywords = computed(() => {
    return generatedKeywords.value ? generatedKeywords.value[activeTab.value] : [];
});

</script>

<template>
    <div class="ma-container">
        <router-link to="/" class="ma-btn ma-btn-primary ma-home-button">Home</router-link>
        <div class="ma-row">
            <div class="ma-col-left">
                <div class="ma-card">
                    <div class="ma-card-body">
                        <h5 class="ma-card-title">Keyword Generator</h5>
                        <textarea
                            v-model="userInput"
                            class="ma-textarea"
                            rows="2"
                            placeholder="Paste your app description here..."
                            ref="textareaRef"
                            @input="autoResize"
                            style="resize:none;"
                        ></textarea>
                        <div class="ma-buttons">
                            <button @click="generateKeywords" class="ma-btn ma-btn-primary">Generate Keywords</button>
                            <button @click="clearInput" class="ma-btn ma-btn-secondary">Clear</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ma-col-right">
                <div v-if="generatedKeywords" class="ma-card">
                    <div class="ma-card-header">
                        <ul class="ma-nav">
                            <li class="ma-nav-item" v-for="(keywords, ngram) in generatedKeywords" :key="ngram">
                                <a class="ma-nav-link" :class="{ active: activeTab === ngram }" @click="activeTab = ngram" href="#">
                                    {{ ngram }} ({{ keywords.length }})
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="ma-card-body">
                        <div v-if="currentKeywords.length">
                            <div class="ma-keywords-container">
                                <span v-for="item in currentKeywords" :key="item.keyword" class="ma-badge">
                                    {{ item.keyword }} ({{ item.count }})
                                </span>
                            </div>
                        </div>
                        <div v-else>
                            <p class="ma-placeholder-text">No keywords found for this n-gram.</p>
                        </div>
                    </div>
                </div>
                <div v-else class="ma-placeholder">
                    <p class="ma-placeholder-text">Keywords will appear here once generated.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.ma-home-button {
    position: absolute;
    top: 1rem;
    left: 1rem;
    text-decoration: none;
}
.ma-container {
    margin-top: 5rem;
    max-width: 100vw;
    overflow-x: hidden;
}
.ma-row {
    display: flex;
    flex-wrap: wrap;
    max-width: 100vw;
}
.ma-col-left, .ma-col-right {
    min-width: 0;
    box-sizing: border-box;
}
.ma-col-left {
    flex: 5;
    max-width: 100%;
}
.ma-col-right {
    flex: 7;
    margin-left: 1rem;
    max-width: calc(100% - 1rem);
    overflow-x: auto;
}
.ma-card {
    border: 1px solid #ccc;
    border-radius: 0.25rem;
}
.ma-card-body {
    padding: 1rem;
}
.ma-card-title {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
}
.ma-card-text {
    margin-bottom: 1rem;
}
.ma-textarea {
    min-height: 2.5em;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    font-size: 1rem;
    padding: 0.375rem 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
}
.ma-buttons {
    margin-top: 1rem;
}
.ma-btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    cursor: pointer;
}
.ma-btn-primary {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    margin-right: 0.5rem;
}
.ma-btn-secondary {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
}
.ma-card-header {
    padding: 0.75rem 1.25rem;
    margin-bottom: 0;
    background-color: rgba(0,0,0,.03);
    border-bottom: 1px solid rgba(0,0,0,.125);
}
.ma-nav {
    display: flex;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
}
.ma-nav-item {
    margin-bottom: -1px;
}
.ma-nav-link {
    display: block;
    padding: 0.5rem 1rem;
    cursor: pointer;
}
.ma-nav-link.active {
    font-weight: bold;
}
.ma-keywords-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.3em;
}
.ma-badge {
    display: inline-block;
    padding: 0.25em 0.4em;
    font-size: 0.95em;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
    margin: 0.1rem;
    border: 1px solid #e0e0e0;
    background: #f8f9fa;
    color: #333;
}
.ma-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.ma-placeholder-text {
    color: #6c757d;
}
</style>