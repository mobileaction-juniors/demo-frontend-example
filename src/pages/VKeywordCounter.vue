<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { MaCard, MaInput, MaButton } from '@mobileaction/action-kit';

interface Props {
  text?: string;
}

const props = withDefaults(defineProps<Props>(), {
  text: ''
});

const inputText = ref('');
const keywordStats = ref<{ keyword: string; count: number; percentage: number }[]>([]);
const totalWords = ref(0);

const processText = (text: string) => {
  if (!text.trim()) return [];
  
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(word => word.length > 0);
};

const updateWordCount = () => {
  const words = processText(inputText.value);
  totalWords.value = words.length;
};

onMounted(() => {
  if (props.text) {
    inputText.value = props.text;
    updateWordCount();
  }
});

watch(inputText, updateWordCount);

const countWords = (words: string[]) => {
  const wordCount: { [key: string]: number } = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  return wordCount;
};

const calculatePercentage = (count: number, total: number) => {
  return Math.round((count / total) * 100 * 100) / 100;
};

const formatKeywordStats = (wordCount: { [key: string]: number }, totalWords: number) => {
  return Object.entries(wordCount)
    .map(([keyword, count]) => ({
      keyword,
      count,
      percentage: calculatePercentage(count, totalWords)
    }))
    .sort((a, b) => b.count - a.count);
};

const analyzeKeywords = () => {
  if (totalWords.value === 0) {
    keywordStats.value = [];
    return;
  }

  const words = processText(inputText.value);
  const wordCount = countWords(words);
  keywordStats.value = formatKeywordStats(wordCount, totalWords.value);
};

const hasResults = computed(() => keywordStats.value.length > 0);
</script>

<template>
  <div class="keyword-counter-wrapper">
    <div class="main-container">
      <!-- Input Section -->
      <div class="input-container">
        <ma-card 
          title="Keyword Counter"
          description="Analyze keyword frequency and percentages in your text"
          headerIcon="chart-bar"
          class="h-full"
        >
          <div class="input-section">
            <ma-input
              v-model:value="inputText"
              type="textarea"
              title="Text Input"
              placeholder="Enter your text here..."
              hintText="Paste or type the text you want to analyze for keyword frequency"
              class="mb-4"
            />
            
            <ma-button 
              type="primary" 
              size="medium"
              @click="analyzeKeywords"
              class="w-full sm:w-auto"
            >
              Count Keywords
            </ma-button>
            
            <div v-if="inputText.trim()" class="word-count-display">
              <span class="word-count-label">Total Words:</span>
              <span class="word-count-value">{{ totalWords }}</span>
            </div>
          </div>
        </ma-card>
      </div>

      <!-- Results Table Section -->
      <div class="table-container">
        <div v-if="hasResults" class="results-container">
          <h3 class="results-title">Keyword Frequency Results</h3>
          <div class="table-wrapper">
            <table class="keyword-table">
              <thead>
                <tr>
                  <th class="keyword-header">Keyword</th>
                  <th class="count-header">Count</th>
                  <th class="percentage-header">Percentage</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in keywordStats" :key="item.keyword" class="table-row">
                  <td class="keyword-cell">{{ item.keyword }}</td>
                  <td class="count-cell">{{ item.count }}</td>
                  <td class="percentage-cell">{{ item.percentage }}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else class="no-results">
          <p class="no-results-text">Enter text and click "Count Keywords" to see frequency analysis</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@reference "tailwindcss";

.keyword-counter-wrapper {
  @apply max-w-7xl mx-auto pt-8 px-4;
}

.main-container {
  @apply flex flex-col lg:flex-row gap-6 h-full;
}

.input-container {
  @apply flex-1;
}

.table-container {
  @apply flex-1;
}

.input-section {
  @apply space-y-4;
}

.results-container {
  @apply bg-white rounded-lg border border-gray-200 shadow-sm p-6;
}

.results-title {
  @apply text-xl font-semibold text-gray-800 mb-4;
}

.word-count-display {
  @apply bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium mt-3 text-center;
}

.word-count-label {
  @apply mr-1;
}

.word-count-value {
  @apply font-bold;
}

.table-wrapper {
  @apply overflow-x-auto;
}

.keyword-table {
  @apply w-full table-auto border-collapse;
}

.keyword-table thead tr {
  @apply bg-gray-50 border-b-2 border-gray-200;
}

.keyword-header,
.count-header,
.percentage-header {
  @apply px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider;
}

.count-header,
.percentage-header {
  @apply text-center;
}

.table-row {
  @apply border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150;
}

.table-row:last-child {
  @apply border-b-0;
}

.keyword-cell,
.count-cell,
.percentage-cell {
  @apply px-4 py-3 text-sm;
}

.keyword-cell {
  @apply font-medium text-gray-900;
}

.count-cell,
.percentage-cell {
  @apply text-gray-700 text-center;
}

.percentage-cell {
  @apply font-medium;
}

.no-results {
  @apply bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center;
}

.no-results-text {
  @apply text-gray-500 text-sm;
}

/* Mobile responsiveness */
@media (max-width: 1024px) {
  .keyword-counter-wrapper {
    @apply flex-col;
  }
}

@media (max-width: 640px) {
  .keyword-header,
  .count-header,
  .percentage-header,
  .keyword-cell,
  .count-cell,
  .percentage-cell {
    @apply px-2 py-2 text-xs;
  }
  
  .results-title {
    @apply text-lg;
  }
  
  .results-container {
    @apply p-4;
  }
}
</style>