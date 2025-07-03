<script setup>
import { ref, computed } from 'vue';
import { regex, splitRegex, filterArr } from '../../cleanupResources.js';
const userInput = ref('');
const generatedKeywords = ref(null);
const activeTab = ref('1-gram');

const currentKeywords = computed(() => {
    return generatedKeywords.value ? generatedKeywords.value[activeTab.value] : [];
});

function generateKeywords() {
    const cleaned = cleanDescription(userInput.value);
    const words = cleaned.split(/\s+/).filter(word => word);
    const ngramSizes = [1, 2, 3];
    const ngramMaps = {};
    ngramSizes.forEach(n => ngramMaps[n + '-gram'] = new Map());
    for (let n of ngramSizes) {
        for (let i = 0; i <= words.length - n; i++) {
            const ngram = words.slice(i, i + n).join(' ');
            const map = ngramMaps[n + '-gram'];
            map.set(ngram, (map.get(ngram) || 0) + 1);
        }
    }
    const result = {};
    for (let n of ngramSizes) {
        result[n + '-gram'] = Array.from(ngramMaps[n + '-gram'].entries())
            .sort(([, countA], [, countB]) => countB - countA)
            .map(([keyword, count]) => ({ keyword, count }));
    }
    generatedKeywords.value = result;
}

function clearInput() {
    userInput.value = '';
    generatedKeywords.value = null;
}

function cleanDescription(description) {
    return description.replace(regex, '').replace(splitRegex, ' ').trim().replaceAll('İ', 'i').toLowerCase();
}

</script>

<template>
    <router-link to="/" class="ma-btn ma-btn-primary ma-home-button">Home</router-link>
    <div class="ma-container">
        <div class="ma-card-content">
            <h5 class="ma-card-title">Keyword Generator</h5>
            <textarea
                v-model="userInput"
                class="ma-textarea"
                rows="5"
                placeholder="Paste your app description here..."
            ></textarea>
            <div class="ma-buttons">
                <button @click="generateKeywords" class="ma-btn ma-btn-primary">Generate Keywords</button>
                <button @click="clearInput" class="ma-btn ma-btn-secondary">Clear</button>
            </div>
        </div>
        <div class="ma-card-content">
            <template v-if="generatedKeywords">
                <div class="ma-card-header">
                    <ul class="ma-nav">
                        <li class="ma-nav-item" v-for="(keywords, ngram) in generatedKeywords" :key="ngram">
                            <button class="ma-nav-link" :class="{ active: activeTab === ngram }" @click="activeTab = ngram">
                                {{ ngram }} ({{ keywords.length }})
                            </button>
                        </li>
                    </ul>
                </div>
                <div>
                    <span v-for="item in currentKeywords" :key="item.keyword" class="ma-badge" v-if="currentKeywords.length">
                        {{ item.keyword }} ({{ item.count }})
                    </span>
                    <p v-else class="ma-placeholder-text">No keywords found for this n-gram.</p>
                </div>
            </template>
            <template v-else>
                <div class="ma-placeholder">
                    <p class="ma-placeholder-text">Keywords will appear here once generated.</p>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped>
.ma-home-button { position: fixed; top: 1rem; left: 1rem; z-index: 1000; text-decoration: none; }
.ma-container { margin-top: 5rem; max-width: 100vw; overflow-x: hidden; display: flex; flex-wrap: wrap; gap: 1rem; }
.ma-card-content { border: 1px solid #ccc; border-radius: 0.25rem; padding: 1rem; display: flex; flex-direction: column; gap: 1rem; min-width: 250px; flex: 1 1 0; }
.ma-card-title { font-size: 1.25rem; font-weight: 500; margin-bottom: 0.5rem; }
.ma-textarea { min-height: 100px; max-height: 300px; overflow-y: auto; width: 100%; max-width: 100%; box-sizing: border-box; font-size: 1rem; padding: 0.375rem 0.75rem; border: 1px solid #ced4da; border-radius: 0.25rem; line-height: 1.5; color: #495057; background-color: #fff; }
.ma-buttons { margin-top: 1rem; }
.ma-btn { display: inline-block; font-weight: 400; text-align: center; white-space: nowrap; vertical-align: middle; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; border: 1px solid transparent; padding: 0.375rem 0.75rem; font-size: 1rem; line-height: 1.5; border-radius: 0.25rem; cursor: pointer; }
.ma-btn-primary { color: #fff; background-color: #007bff; border-color: #007bff; margin-right: 0.5rem; }
.ma-btn-secondary { color: #fff; background-color: #6c757d; border-color: #6c757d; }
.ma-card-header { padding: 0.75rem 1.25rem; margin-bottom: 0; background-color: rgba(0,0,0,.03); border-bottom: 1px solid rgba(0,0,0,.125); }
.ma-nav { display: flex; padding-left: 0; margin-bottom: 0; list-style: none; }
.ma-nav-item { margin-bottom: -1px; }
.ma-nav-link { display: block; padding: 0.5rem 1rem; cursor: pointer; }
.ma-nav-link.active { font-weight: bold; }
.ma-badge { display: inline-block; padding: 0.25em 0.4em; font-size: 0.95em; font-weight: 600; line-height: 1; text-align: center; white-space: nowrap; border-radius: 0.25rem; margin: 0.1rem; border: 1px solid #e0e0e0; background: #f8f9fa; color: #333; }
.ma-placeholder { display: flex; justify-content: center; align-items: center; height: 100%; }
.ma-placeholder-text { color: #6c757d; }
</style>