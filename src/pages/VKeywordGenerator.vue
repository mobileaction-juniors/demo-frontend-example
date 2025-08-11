<script setup lang="ts">
import { ref } from 'vue';
import { MaButton, MaCard, MaInput, MaBadge } from '@mobileaction/action-kit';

const inputText = ref('');
const keywords = ref([]);

const generateKeywords = () => {
  if (!inputText.value.trim()) {
    keywords.value = [];
    return;
  }

  const cleanedText = inputText.value.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
  const words = cleanedText.split(' ').filter(word => word.length > 0);
  
  const result = [];
  
  // 1-gram
  const oneGram = [...new Set(words)];
  result.push({ type: '1-gram', keywords: oneGram });
  
  // 2-gram
  const twoGramSet = new Set();
  for (let i = 0; i < words.length - 1; i++) {
    twoGramSet.add(words[i] + ' ' + words[i + 1]);
  }
  result.push({ type: '2-gram', keywords: [...twoGramSet] });
  
  // 3-gram
  const threeGramSet = new Set();
  for (let i = 0; i < words.length - 2; i++) {
    threeGramSet.add(words[i] + ' ' + words[i + 1] + ' ' + words[i + 2]);
  }
  result.push({ type: '3-gram', keywords: [...threeGramSet] });
  
  keywords.value = result;
};
</script>

<template>
  <div class="generator-wrapper">
    <MaCard 
      title="Keyword Generator"
      description="Generate 1-gram, 2-gram, and 3-gram keywords from your text"
      headerIcon="flash"
    >
      <div class="input-section">
        <MaInput
          v-model:value="inputText"
          type="textarea"
          title="Text Input"
          placeholder="Enter your text here..."
          hintText="Paste or type the text you want to analyze for keywords"
        />
        
        <MaButton @click="generateKeywords" type="primary" class="generate-btn">
          Generate Keywords
        </MaButton>
      </div>

      <div v-if="keywords.length > 0" class="results-section">
        <div v-for="group in keywords" :key="group.type" class="keyword-group">
          <h3 class="group-title">{{ group.type }}</h3>
          <div class="keywords-list">
            <MaBadge
              v-for="keyword in group.keywords"
              :key="keyword"
              size="medium"
              type="primary"
              variant="dark"
            >
              {{ keyword }}
            </MaBadge>
          </div>
        </div>
      </div>
    </MaCard>
  </div>
</template>

<style>
@reference "tailwindcss";

.generator-wrapper {
  @apply max-w-4xl mx-auto;
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