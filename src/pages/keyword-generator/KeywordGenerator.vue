<template>
  <div class="ma-keywords-generator">
    <div class="card">
      <div class="container">
        <div class="input-container">
          <div class="ma-header">
            <span>Keyword Generator</span>
          </div>
          <textarea v-model="inputValue" placeholder="Enter text here..." rows="6" class="input-textarea"></textarea>
          <button @click="generateNGrams" class="custom-button">Generate N-Grams</button>
        </div>
        <div v-if="Object.keys(nGrams).some(key => nGrams[key].length)" class="keywords-output">
          <div class="ma-header">
            <span>Generated Keywords</span>
          </div>
          <div class="filter-container">
            <label for="ngram-filter">Filter by:</label>
            <select id="ngram-filter" v-model="selectedNGram" @change="filterKeywords" class="custom-select">
              <option v-for="(value, key) in nGrams" :key="key" :value="key">{{ key }}</option>
            </select>
          </div>
          <div>
            <h4>{{selectedNGram}}</h4>
            <ul class="custom-list">
              <li v-for="(item, index) in filteredKeywords" :key="index" class="custom-list-item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const inputValue = ref('');
const nGrams = ref({});
const selectedNGram = ref('');
const MAX_N_GRAMS_COUNT = 3;

const generateNGrams = () => {
  const words = cleanText(inputValue.value).split(/\s+/);
  for (let n = 1; n <= MAX_N_GRAMS_COUNT; n++) {
    nGrams.value[`${n}-grams`] = getNGrams(words, n);
  }
  selectedNGram.value = '1-grams';
};

const cleanText = (text) => {
  return text.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").toLowerCase();
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

const filteredKeywords = computed(() => {
  return nGrams.value[selectedNGram.value] || [];
});
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
  justify-content: center; /* Center the content horizontally */
  align-items: flex-start;
  gap: 3em;
  width: 100%;
}

.input-container, .keywords-output {
  flex: 1;
  width: 100%; /* Ensure both sections take full width */
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 1em;
  transition: transform 0.3s ease, width 0.3s ease;
}

.keywords-output {
  padding-left: 1em;
  border-left: 2px solid #e0e0e0;
  max-height: 50vh;
  overflow-y: auto;
}

.ma-header {
  font-size: 1.75em;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin: 0;
}

.input-textarea {
  width: 100%;
  padding: 1em;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 1em;
  line-height: 1.6;
  resize: none;
  min-height: 6em; /* Minimum height */
  max-height: 50vh; /* Maximum height before scrolling */
  overflow-y: auto; /* Scroll when content exceeds max-height */
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

.filter-container {
  margin-bottom: 1em;
}

.filter-container label {
  font-size: 1em;
  margin-right: 0.5em;
}

.custom-select {
  padding: 0.5em;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  font-size: 1em;
  line-height: 1.6;
}

.custom-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.custom-list-item {
  margin-bottom: 0.5em;
  font-size: 1em;
  color: #555;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 0.5em;
}

.custom-list-item:last-child {
  margin: 1px;
  padding: 1px;
  padding-left: 12px;
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
  .input-textarea {
    padding: 0px;
  }
}
</style>