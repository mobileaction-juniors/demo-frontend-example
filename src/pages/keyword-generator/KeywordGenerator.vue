<script setup>
import { ref, computed } from 'vue';
import Card from '@/components/Card.vue';
import TextInput from '@/components/TextInput.vue';
import Button from '@/components/Button.vue';
import { ArrowPathIcon } from '@heroicons/vue/24/outline';
import Badge from '@/components/Badge.vue';

const input = ref('');
const n_grams = ref([1, 2, 3]);

function getNGrams(words, n) {
  if (words.length < n) return [];
  const result = [];
  for (let i = 0; i <= words.length - n; i++) {
    result.push(words.slice(i, i + n).join(' '));
  }
  return result;
}

const ngramsResult = computed(() => {
  let words = input.value
    .split(/\s+/)
    .map(w => w.trim().toLowerCase())
    .filter(Boolean);

  words = words.filter((w, i, arr) => i === 0 || w !== arr[i - 1]);
  return n_grams.value.map(n => ({
    n,
    keywords: getNGrams(words, n)
  }));
});

const filteredNgramsResult = computed(() => ngramsResult.value.filter(ngram => ngram.keywords.length > 0));

const clearAll = () => {
    input.value = '';
}
</script>
<template>
    <div class="ma-keywords-generator">
        <div class="ma-header">
            <h1 class="ma-title">Keyword Generator</h1>
            <p class="ma-description">Generate n-gram keywords from your text. Perfect for app descriptions, and ASO analysis.</p>
        </div>
        <Card title="Text Input" description="Enter your text to generate keywords. For example, paste an app description from the App Store.">
            <div class="ma-text-input-container">
                <TextInput v-model="input"/>
            </div>
            <div class="ma-button-container">
                <div class="ma-description-count">{{ input.length }} characters, {{ input.split(/\s+/).length }} words</div>
                <Button label="Clear All" :icon="ArrowPathIcon" @click="clearAll" />
            </div>
        </Card>
        <Card title="Keywords" description="Generated keywords from your text.">
            <div v-if="!input.trim()" class="text-gray-400 text-base italic py-4">Waiting for your input</div>
            <div v-else class="ma-ngram-container">
                <div class="ma-ngram-item" v-for="ngram in filteredNgramsResult" :key="ngram.n">
                    <div class="ma-ngram-item-title">
                        {{ ngram.n }}-gram <span class="ma-ngram-item-title-count">{{ ngram.keywords.length }}</span>
                    </div>
                    <div class="ma-ngram-item-keywords">
                        <div class="ma-ngram-item-keyword" v-for="keyword in ngram.keywords" :key="keyword">
                            <Badge :text="keyword" />
                        </div>
                    </div>
                    <div class="ma-divider"/>
                </div>
            </div>
        </Card>
    </div>
</template>
<style scoped>
.ma-keywords-generator {
    @apply w-full h-full bg-white p-6 flex flex-col gap-4;
}
.ma-header {
    @apply w-full h-full bg-white flex flex-col items-start justify-center gap-2;
}
.ma-title {
    @apply text-4xl font-bold;
}
.ma-text-input-container {
    @apply w-full h-[150px] flex flex-col gap-2;
}  
.ma-description {
    @apply text-lg text-gray-500;
}
.ma-description-count {
    @apply text-gray-500 text-sm;
}
.ma-button-container {
    @apply w-full h-full flex justify-between;
}
.ma-ngram-container {
    @apply w-full h-full flex flex-col gap-2;
}
.ma-ngram-item {
    @apply w-full h-full flex flex-col gap-2;
}
.ma-ngram-item-title {
    @apply text-lg font-bold;
}
.ma-ngram-item-title-count {
    @apply bg-gray-100 text-black text-sm px-2 py-1 rounded-full;
}
.ma-ngram-item-keywords {
    @apply w-full flex flex-row flex-wrap gap-2;
}   
.ma-ngram-item-keyword {
    @apply text-sm text-gray-500;
}
.ma-divider {
    @apply w-full h-[1px] bg-gray-200;
}
</style>