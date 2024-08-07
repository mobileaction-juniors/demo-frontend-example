<template>
  <div class="ma-keywords-generator">
    <div class="card">
      <div class="container">
        <div :class="['input-container', { 'centered': Object.keys(keywords).some(key => keywords[key].length) }]">
          <div class="ma-header">
            <span>Keyword Generator</span>
          </div>
          <textarea ref="textarea" v-model="inputValue" placeholder="Enter text here..." rows="6" class="input-textarea"></textarea>
          <button @click="generateKeywords">Generate Keywords</button>
        </div>
        <div v-if="Object.keys(keywords).some(key => keywords[key].length)" class="keywords-output">
          <div class="ma-header">
            <span>Generated Keywords</span>
          </div>
          <div class="filter-container">
            <label for="ngram-filter">Filter by:</label>
            <select id="ngram-filter" v-model="selectedNGram" @change="filterKeywords">
              <option v-for="(value, key) in keywords" :key="key" :value="key">{{ key }}</option>
            </select>
          </div>
          <div>
            <h4>{{ getNGramLabel() }}</h4>
            <ul>
              <li v-for="(item, index) in filteredKeywords" :key="index">{{ item }}</li>
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
const keywords = ref({});
const selectedNGram = ref('');

const generateKeywords = () => {
  const words = cleanText(inputValue.value).split(/\s+/);
  const maxNGram = 3; // Can be changed to any n value for n-grams
  for (let n = 1; n <= maxNGram; n++) {
    keywords.value[`${n}-grams`] = getNGrams(words, n);
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

const getNGramLabel = () => {
  return selectedNGram.value;
};

const filteredKeywords = computed(() => {
  return keywords.value[selectedNGram.value] || [];
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

.input-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
  transition: transform 0.3s ease, width 0.3s ease;
  transform: translateX(0);
}

.input-container.centered {
  transform: translateX(0); /* Remove the translateX to keep it centered */
}

.keywords-output {
  flex: 1;
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

button {
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

button:hover {
  background-color: #0051a8;
}

button:active {
  transform: scale(0.98);
}

.filter-container {
  margin-bottom: 1em;
}

.filter-container label {
  font-size: 1em;
  margin-right: 0.5em;
}

select {
  padding: 0.5em;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  font-size: 1em;
  line-height: 1.6;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 0.5em;
  font-size: 1em;
  color: #555;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 0.5em;
}
</style>