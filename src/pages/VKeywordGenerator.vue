<script setup lang="ts">
import { ref, computed } from 'vue';
import { MaButton, MaCard, MaInput, MaBadge } from '@mobileaction/action-kit';

const inputText = ref('');
const oneGramKeywords = ref([]);
const twoGramKeywords = ref([]);
const threeGramKeywords = ref([]);

const cleanAndTokenizeText = (text: string): string[] => {
  const cleanedText = text.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
  return cleanedText.split(' ').filter(word => word.length > 0);
};

const generateOneGrams = (words: string[]): string[] => {
  return [...new Set(words)];
};

const generateTwoGrams = (words: string[]): string[] => {
  const twoGramSet = new Set<string>();
  for (let i = 0; i < words.length - 1; i++) {
    twoGramSet.add(`${words[i]} ${words[i + 1]}`);
  }
  return [...twoGramSet];
};

const generateThreeGrams = (words: string[]): string[] => {
  const threeGramSet = new Set<string>();
  for (let i = 0; i < words.length - 2; i++) {
    threeGramSet.add(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
  }
  return [...threeGramSet];
};

const clearKeywords = (): void => {
  oneGramKeywords.value = [];
  twoGramKeywords.value = [];
  threeGramKeywords.value = [];
};

const generateKeywords = (): void => {
  if (!inputText.value.trim()) {
    clearKeywords();
    return;
  }

  const words = cleanAndTokenizeText(inputText.value);
  
  oneGramKeywords.value = generateOneGrams(words);
  twoGramKeywords.value = generateTwoGrams(words);
  threeGramKeywords.value = generateThreeGrams(words);
};

const isResultVisible = computed(() => {
  return oneGramKeywords.value.length > 0 || twoGramKeywords.value.length > 0 || threeGramKeywords.value.length > 0;
});
</script>

<template>
  <div class="generator-wrapper">
    <ma-card 
      title="Keyword Generator"
      description="Generate 1-gram, 2-gram, and 3-gram keywords from your text"
      headerIcon="flash"
    >
      <div class="input-section">
        <ma-input
          v-model:value="inputText"
          type="textarea"
          title="Text Input"
          placeholder="Enter your text here..."
          hintText="Paste or type the text you want to analyze for keywords"
        />
        
        <ma-button @click="generateKeywords" type="primary" class="generate-btn">
          Generate Keywords
        </ma-button>
      </div>

      <div v-if="isResultVisible" class="results-section">
        <div v-if="oneGramKeywords.length > 0" class="keyword-group">
          <h3 class="group-title">1-gram</h3>
          <div class="keywords-list">
            <ma-badge
              v-for="keyword in oneGramKeywords"
              :key="keyword"
              size="medium"
              type="primary"
              variant="dark"
            >
              {{ keyword }}
            </ma-badge>
          </div>
        </div>

        <div v-if="twoGramKeywords.length > 0" class="keyword-group">
          <h3 class="group-title">2-gram</h3>
          <div class="keywords-list">
            <ma-badge
              v-for="keyword in twoGramKeywords"
              :key="keyword"
              size="medium"
              type="primary"
              variant="dark"
            >
              {{ keyword }}
            </ma-badge>
          </div>
        </div>

        <div v-if="threeGramKeywords.length > 0" class="keyword-group">
          <h3 class="group-title">3-gram</h3>
          <div class="keywords-list">
            <ma-badge
              v-for="keyword in threeGramKeywords"
              :key="keyword"
              size="medium"
              type="primary"
              variant="dark"
            >
              {{ keyword }}
            </ma-badge>
          </div>
        </div>
      </div>
    </ma-card>
  </div>
</template>

<style>
@reference "tailwindcss";

.generator-wrapper {
  @apply max-w-4xl mx-auto pt-8;
}

.input-section {
  @apply mb-5;
}

.generate-btn {
  @apply mt-4;
}

.results-section {
  @apply mt-5;
}

.keyword-group {
  @apply mb-5;
}

.group-title {
  @apply text-lg font-semibold mb-3;
}

.keywords-list {
  @apply flex flex-wrap gap-2;
}
</style>