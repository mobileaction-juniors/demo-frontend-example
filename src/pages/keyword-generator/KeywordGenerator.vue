<template>
  <div class="ma-keywords-generator">
    <div class="card">
      <div class="container">
        <div class="input-container">
          <div class="ma-header">
            <span>Keyword Generator</span>
          </div>
          <ma-input
            v-model:value="inputValue"
            type="textarea"
            size="large"
            placeholder="Enter text here..."
            rows="6"
          >
            <template #title>Your Text</template>
          </ma-input>
          <ma-input
            v-model:value="excludedWordsInputValue"
            type="textarea"
            size="large"
            placeholder="Enter words to exclude (space-separated)..."
            hint-text="You may want to exclude 'is', 'a', 'an', 'the'."
            rows="3"
          >
            <template #title>Exclude Words</template>
          </ma-input>
          <div class="multi-select-container">
            <label>Select N-Grams to Generate:</label>
            <ma-checkbox-group
              v-model:value="selectedNGrams"
              :options="nGramOptions"
              name="ngram-checkboxgroup"
              class="ma-my-checkbox-group"
            />
          </div>
          <button @click="generateNGrams" class="custom-button">Generate N-Grams</button>
        </div>
        <div v-if="Object.keys(nGrams).some(key => nGrams[key].length)" class="keywords-output">
          <div class="ma-header">
            <span>Generated Tags</span>
          </div>
          <div class="filter-container">
            <label>Filter by:</label>
            <ma-checkbox-group
              v-model:value="selectedNGramFilters"
              :options="sortedNGramOptions"
              name="filter-checkboxgroup"
              class="ma-my-checkbox-group"
            />
          </div>
          <div v-for="key in selectedNGramFilters" :key="key">
            <h4>{{ key }}</h4>
            <div class="tags-container">
              <span v-for="(item, index) in nGrams[key]" :key="index" class="tag">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { MaInput, MaCheckboxGroup } from "@mobileaction/action-kit";

const inputValue = ref('');
const excludedWordsInputValue = ref('');
const nGrams = ref({});
const selectedNGrams = ref([]);
const selectedNGramFilters = ref([]);
const MAX_N_GRAMS_COUNT = 10;

const nGramOptions = Array.from({ length: MAX_N_GRAMS_COUNT }, (_, i) => `${i + 1}-gram`);

const generateNGrams = () => {
  nGrams.value = {}; // Clear existing n-grams
  const words = cleanText(inputValue.value).split(/\s+/);
  selectedNGrams.value.forEach(n => {
    const nGramKey = `${n}`;
    nGrams.value[nGramKey] = getNGrams(words, parseInt(n));
  });
  updateSelectedNGramFilters();
};

const cleanText = (text) => {
  const unwantedWords = excludedWordsInputValue.value.split(' ').map(word => word.trim().toLowerCase());
  return text
    .replace(/[^\w\s]|_/g, "")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .split(' ')
    .filter(word => word && !unwantedWords.includes(word))
    .join(' ');
};

const getNGrams = (words, n) => {
  const nGrams = [];
  for (let i = 0; i <= words.length - n; i++) {
    const nGram = words.slice(i, i + n).join(' ');
    if (!nGrams.includes(nGram)) {
      nGrams.push(nGram);
    }
  }
  return nGrams;
};

const sortedNGramOptions = computed(() => {
  return Array.from(new Set(Object.keys(nGrams.value)))
    .sort(sortNGramsByKey);
});

const sortNGramsByKey = (a, b) => {
  const aNum = parseInt(a.split('-')[0], 10);
  const bNum = parseInt(b.split('-')[0], 10);
  return aNum - bNum;
};

const updateSelectedNGramFilters = () => {
  selectedNGramFilters.value = selectedNGrams.value.map(n => `${n}`);
};

watch(selectedNGrams, updateSelectedNGramFilters);
</script>

<style scoped>
.ma-keywords-generator {
  max-width: 1200px;
  margin: auto;
  padding: 2em;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial, sans-serif;
}

.card {
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2em;
}

.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 3em;
  width: 100%;
}

.input-container, .keywords-output {
  flex: 1;
  width: 100%;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 1em;
  transition: transform 0.3s ease, width 0.3s ease;
}

.multi-select-container, .filter-container {
  margin-top: 1em;
}

.keywords-output {
  padding-left: 1em;
  border-left: 2px solid #e0e0e0;
  max-height: 70vh;
  overflow-y: auto;
}

.ma-header {
  font-size: 1.75em;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin: 0;
}

.custom-button {
  padding: 0.75em 1.5em;
  border: none;
  border-radius: 12px;
  background-color: #007aff;
  color: #ffffff;
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.custom-button:hover {
  background-color: #0051a8;
}

.custom-button:active {
  transform: scale(0.98);
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
}

.tag {
  background-color: #e0f7fa;
  color: #00796b;
  padding: 0.5em 1em;
  border-radius: 12px;
  font-size: 0.875em;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    gap: 1em;
  }

  .keywords-output {
    padding-left: 0;
    border-left: none;
    border-top: 2px solid #e0e0e0;
    padding-top: 1em;
  }
}

.ma-my-checkbox-group :deep(.antd-checkbox-inner)::after {
  border-style: none;
}
</style>
