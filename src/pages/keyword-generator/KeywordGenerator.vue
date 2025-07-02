<script setup>
import { ref, computed } from 'vue';
import { cleanDescription } from '../../utils/CleanDescription';

const userInput = ref('');
const generatedKeywords = ref(null);
const activeTab = ref('1-gram');
const selectedKeyword = ref(null);

function generateKeywords() {
    const cleaned = cleanDescription(userInput.value);
    const words = cleaned.split(/\s+/).filter(word => word);

    generatedKeywords.value = {
        '1-gram': generateNGrams(words, 1),
        '2-gram': generateNGrams(words, 2),
        '3-gram': generateNGrams(words, 3),
    };
    selectedKeyword.value = null;
}

function generateNGrams(words, n) {
    const ngrams = new Map();
    for (let i = 0; i <= words.length - n; i++) {
        const ngram = words.slice(i, i + n).join(' ');
        ngrams.set(ngram, (ngrams.get(ngram) || 0) + 1);
    }
    const sortedNgrams = Array.from(ngrams.entries())
        .sort(([, countA], [, countB]) => countB - countA)
        .map(([keyword, count]) => ({ keyword, count }));
    return sortedNgrams;
}

function clearInput() {
    userInput.value = '';
    generatedKeywords.value = null;
    selectedKeyword.value = null;
}

const highlightedDescription = computed(() => {
    if (!userInput.value) return '';
    if (!selectedKeyword.value) {
        return userInput.value.replace(/[&<>"]'`]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '`': '&#x60;' }[char]));
    }

    const words = selectedKeyword.value.split(' ').map(word => word.replace(/[.*+?^${}()|[\]]/g, '\\$&'));
    const regex = new RegExp(`\\b(${words.join('\\W+')})\\b`, 'gi');

    return userInput.value.replace(regex, `<span class="highlight">$1</span>`);
});

const currentKeywords = computed(() => {
    return generatedKeywords.value ? generatedKeywords.value[activeTab.value] : [];
});

const maxCount = computed(() => {
    if (!currentKeywords.value.length) return 0;
    return Math.max(...currentKeywords.value.map(k => k.count));
});

function getKeywordStyle(count) {
    const colors = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#00FFFF', '#0000FF', '#4B0082', '#480048'];
    const size = 1 + (count / maxCount.value) * 0.5;

    let colorIndex = 0;
    if (maxCount.value > 1) {
        colorIndex = Math.round(((count - 1) / (maxCount.value - 1)) * (colors.length - 1));
    }

    return {
        fontSize: `${size}em`,
        color: colors[colorIndex],
    };
}
</script>

<template>
    <div class="container">
        <router-link to="/" class="btn btn-primary home-button">Home</router-link>
        <div class="row">
            <div class="col-left">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Keyword Generator</h5>
                        <p class="card-text">Paste your app description to extract keywords.</p>
                        
                        <div class="description-area-wrapper">
                            <div class="description-area" v-html="highlightedDescription"></div>
                        </div>
                        <textarea v-model="userInput" class="form-control" rows="8" placeholder="Paste your app description here..."></textarea>

                        <div class="buttons">
                            <button @click="generateKeywords" class="btn btn-primary">Generate Keywords</button>
                            <button @click="clearInput" class="btn btn-secondary">Clear</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-right">
                <div v-if="generatedKeywords" class="card">
                    <div class="card-header">
                        <ul class="nav">
                            <li class="nav-item" v-for="(keywords, ngram) in generatedKeywords" :key="ngram">
                                <a class="nav-link" :class="{ active: activeTab === ngram }" @click="activeTab = ngram; selectedKeyword = null;" href="#">
                                    {{ ngram }} ({{ keywords.length }})
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <div v-if="currentKeywords.length">
                            <div class="keywords-container">
                                <span v-for="item in currentKeywords" :key="item.keyword" class="badge" :style="getKeywordStyle(item.count)" @click="selectedKeyword = item.keyword">
                                    {{ item.keyword }} ({{ item.count }})
                                </span>
                            </div>
                        </div>
                        <div v-else>
                            <p class="placeholder-text">No keywords found for this n-gram.</p>
                        </div>
                    </div>
                </div>
                <div v-else class="placeholder">
                    <p class="placeholder-text">Keywords will appear here once generated.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.home-button {
    position: absolute;
    top: 1rem;
    left: 1rem;
    text-decoration: none;
}
.container {
    margin-top: 5rem;
}
.row {
    display: flex;
}
.col-left {
    flex: 5;
}
.col-right {
    flex: 7;
    margin-left: 1rem;
}
.card {
    border: 1px solid #ccc;
    border-radius: 0.25rem;
}
.card-body {
    padding: 1rem;
}
.card-title {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
}
.card-text {
    margin-bottom: 1rem;
}
.description-area-wrapper {
    margin-bottom: 1rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    min-height: 150px;
    padding: 0.375rem 0.75rem;
    white-space: pre-wrap;
    font-family: monospace;
    font-size: 0.875em;
}
.description-area {
    white-space: pre-wrap;
}
.form-control {
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
}
.buttons {
    margin-top: 1rem;
}
.btn {
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
.btn-primary {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    margin-right: 0.5rem;
}
.btn-secondary {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
}
.card-header {
    padding: 0.75rem 1.25rem;
    margin-bottom: 0;
    background-color: rgba(0,0,0,.03);
    border-bottom: 1px solid rgba(0,0,0,.125);
}
.nav {
    display: flex;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
}
.nav-item {
    margin-bottom: -1px;
}
.nav-link {
    display: block;
    padding: 0.5rem 1rem;
    cursor: pointer;
}
.nav-link.active {
    font-weight: bold;
}
.keywords-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.badge {
    display: inline-block;
    padding: 0.25em 0.4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
    margin: 0.1rem;
    cursor: pointer;
    border: 1px solid transparent;
}
.badge:hover {
    transform: scale(1.05);
    border: 1px solid #ccc;
}
.placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.placeholder-text {
    color: #6c757d;
}
.description-area :deep(.highlight) {
    background-color: #ffc107;
    font-weight: bold;
    color: #343a40;
    border-radius: 3px;
    padding: 1px 3px;
    transition: all 0.3s ease;
}
</style>
