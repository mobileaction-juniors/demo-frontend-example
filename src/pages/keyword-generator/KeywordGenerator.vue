<script setup>
import { ref, computed } from 'vue';
import { cleanDescription } from '../../utils/CleanDescription';
import { filterArr } from '../../cleanupResources';

const userInput = ref('');
const generatedKeywords = ref(null);
const activeTab = ref('1-gram');
const selectedKeyword = ref(null);

function generateKeywords() {
    const cleaned = cleanDescription(userInput.value);
    const words = cleaned.split(/\s+/).filter(word => word && !filterArr.includes(word));

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
        return userInput.value.replace(/[&<>"'`]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '`': '&#x60;' }[char]));
    }

    // Handle punctuations
    const words = selectedKeyword.value.split(' ').map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${words.join('\\W+')})`, 'gi');

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
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Keyword Generator</h5>
                        <p class="card-text">Paste your app description to extract keywords.</p>
                        
                        <div v-if="generatedKeywords" class="description-area" v-html="highlightedDescription"></div>
                        <textarea v-else v-model="userInput" class="form-control" rows="8" placeholder="Paste your app description here..."></textarea>

                        <div class="mt-3">
                            <button @click="generateKeywords" class="btn btn-primary me-2">Generate Keywords</button>
                            <button @click="clearInput" class="btn btn-secondary">Clear</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-7">
                <div v-if="generatedKeywords" class="card">
                    <div class="card-header">
                        <ul class="nav nav-tabs card-header-tabs">
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
                                <span v-for="item in currentKeywords" :key="item.keyword" class="badge m-1 p-2" :style="getKeywordStyle(item.count)" @click="selectedKeyword = item.keyword">
                                    {{ item.keyword }} ({{ item.count }})
                                </span>
                            </div>
                        </div>
                        <div v-else>
                            <p class="text-center text-muted">No keywords found for this n-gram.</p>
                        </div>
                    </div>
                </div>
                <div v-else class="d-flex justify-content-center align-items-center h-100">
                    <p class="text-muted">Keywords will appear here once generated.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.keywords-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.badge {
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    border: 1px solid transparent;
}
.badge:hover {
    transform: scale(1.05);
    border: 1px solid #ccc;
}
.nav-link {
    cursor: pointer;
}
.description-area {
    white-space: pre-wrap;
    padding: 0.375rem 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    margin-bottom: 1rem;
    min-height: 150px;
    font-family: monospace;
    font-size: 0.875em;
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