<script setup>
import { ref, computed, watch } from 'vue';
import { cleanDescription } from '../../utils/CleanDescription.js';
import TheNav from '../../components/TheNav.vue';

const userInput = ref('');
const generatedKeywords = ref(null);
const activeTab = ref('1-gram');

const currentKeywords = computed(() => {
    return generatedKeywords.value ? generatedKeywords.value[activeTab.value] : [];
});

function generateKeywords() {
    const words = getCleanedWords(userInput.value);
    const ngramSizes = [1, 2, 3];
    const ngramMaps = generateNgramMaps(words, ngramSizes);
    generatedKeywords.value = formatNgramResults(ngramMaps, ngramSizes);
}

function getCleanedWords(input) {
    const cleaned = cleanDescription(input);
    return cleaned.split(/\s+/).filter(word => word);
}

function generateNgramMaps(words, ngramSizes) {
    const ngramMaps = {};
    ngramSizes.forEach(n => ngramMaps[n + '-gram'] = new Map());
    for (let n of ngramSizes) {
        for (let i = 0; i <= words.length - n; i++) {
            const ngram = words.slice(i, i + n).join(' ');
            const map = ngramMaps[n + '-gram'];
            map.set(ngram, (map.get(ngram) || 0) + 1);
        }
    }
    return ngramMaps;
}

function formatNgramResults(ngramMaps, ngramSizes) {
    const result = {};
    for (let n of ngramSizes) {
        result[n + '-gram'] = Array.from(ngramMaps[n + '-gram'].entries())
            .sort(([, countA], [, countB]) => countB - countA)
            .map(([keyword, count]) => ({ keyword, count }));
    }
    return result;
}

function clearInput() {
    userInput.value = '';
    generatedKeywords.value = null;
}

watch(userInput, generateKeywords);

</script>

<template>
    <TheNav />
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
                <button @click="clearInput" class="ma-btn ma-btn-secondary">Clear</button>
            </div>
        </div>
        <div class="ma-card-content">
            <template v-if="generatedKeywords">
                <div class="ma-card-header">
                    <ul class="ma-tabs">
                        <li class="ma-tab-item" v-for="(keywords, ngram) in generatedKeywords" :key="ngram">
                            <button class="ma-tab" :class="{ active: activeTab === ngram }" @click="activeTab = ngram">
                                {{ ngram }} ({{ keywords.length }})
                            </button>
                        </li>
                    </ul>
                </div>
                <div v-if="currentKeywords.length">
                    <span v-for="item in currentKeywords" :key="item.keyword" class="ma-badge">
                        {{ item.keyword }} ({{ item.count }})
                    </span>
                </div>
                <p v-else class="ma-placeholder-text">No keywords found for this n-gram.</p>
            </template>
            <template v-else>
                <p class="ma-placeholder-text">Keywords will appear here once generated.</p>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.ma-btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    cursor: pointer;
    text-decoration: none;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
}

.ma-btn-secondary {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
}

.ma-container {
    margin-top: 5rem;
    max-width: 100vw;
    overflow-x: hidden;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
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
        .ma-textarea {
            min-height: 100px;
            max-height: 300px;
            overflow-y: auto;
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
        .ma-card-header {
            padding: 0.75rem 1.25rem;
            margin-bottom: 0;
            background-color: rgba(0,0,0,.03);
            border-bottom: 1px solid rgba(0,0,0,.125);
            .ma-tabs {
                display: flex;
                padding-left: 0;
                margin-bottom: 0;
                list-style: none;
                .ma-tab-item {
                    margin-bottom: -1px;
                    .ma-tab {
                        background: #5d6069;
                        border: 1px solid #e0e0e0;
                        border-radius: 0.25rem;
                        color: #ffffff;
                        padding: 0.5rem 1rem;
                        cursor: pointer;
                        transition: background 0.2s, color 0.2s;
                        margin-right: 0.5rem;
                    }
                    .ma-tab:hover,
                    .ma-tab.active {
                        background: #224bc9;
                        color: #ffffff;
                        text-decoration: none;
                    }
                }
            }
        }
        .ma-badge {
            display: inline-block;
            padding: 0.25em 0.4em;
            font-size: 0.95em;
            font-weight: 600;
            line-height: 1;
            text-align: center;
            white-space: nowrap;
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
            .ma-placeholder-text {
                color: #6c757d;
            }
        }
        .ma-placeholder-text {
            color: #6c757d;
        }
    }
}
</style>