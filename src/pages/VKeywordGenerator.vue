<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { MaButton, MaCard, MaInput, MaBadge, MaCheckboxGroup, MaCheckbox } from '@mobileaction/action-kit';
import { filterArr } from '../cleanupResources';

const MAX_NGRAM = 10;

const inputText = ref('');
const keywords = ref({});
const selectedNGrams = ref([1, 2, 3]);

const getKeywords = (n) => keywords.value[n] || [];

const cleanAndTokenizeText = (text: string): string[] => {
  const cleanedText = text.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
  let words = cleanedText.split(' ').filter(word => word.length > 0);
  words = words.filter(word => !filterArr.includes(word));
  return words;
};

const generateNGrams = (words: string[], n: number): string[] => {  
  const nGramSet = new Set<string>();
  for (let i = 0; i <= words.length - n; i++) {
    const gram = words.slice(i, i + n).join(' ');
    nGramSet.add(gram);
  }
  return [...nGramSet];
};

const clearKeywords = (): void => {
  keywords.value = {};
};

const generateKeywords = (): void => {
  if (!inputText.value.trim()) {
    clearKeywords();
    return;
  }
  
  const words = cleanAndTokenizeText(inputText.value);
  keywords.value = {};
  
  selectedNGrams.value.forEach(n => {
    keywords.value[n] = generateNGrams(words, n);
  });
};

watch([selectedNGrams, inputText], () => {
  generateKeywords();
});

const isResultVisible = computed(() => {
  return Object.values(keywords.value).some(arr => arr.length > 0);
});
</script>

<template>
  <div class="generator-wrapper">
    <ma-card 
      title="Keyword Generator"
      description="Generate n-grams (1-10) keywords from your text with automatic stop word removal"
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

        <div class="ngram-selection">
          <h4 class="selection-title">Select N-grams to generate:</h4>
          <ma-checkbox-group v-model:value="selectedNGrams" class="ngram-checkboxes">
            <ma-checkbox v-for="n in MAX_NGRAM" :key="n" :value="n">{{ n }}-gram</ma-checkbox>
          </ma-checkbox-group>
        </div>
      </div>

      <div v-if="isResultVisible" class="results-section">
        <div v-for="n in selectedNGrams" :key="n" class="keyword-group">
          <h3 class="group-title">{{ n }}-gram</h3>
          <div class="keywords-list">
            <ma-badge
              v-for="keyword in getKeywords(n)"
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

.ngram-selection {
  @apply mt-4 mb-4;
}

.selection-title {
  @apply text-base font-medium mb-3;
}

.ngram-checkboxes {
  @apply grid grid-cols-5 gap-3 p-4 bg-gray-50 rounded-lg border;
}
</style>