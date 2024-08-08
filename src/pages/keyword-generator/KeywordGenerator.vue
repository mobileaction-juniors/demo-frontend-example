<template>
  <div class="ma-keywords-generator">
    <div class="card">
      <div class="container">
        <div class="input-container">
          <div class="ma-header">
            <span>Keyword Generator</span>
          </div>
          <MaInput
            v-model:value="inputValue"
            type="textarea"            
            size="large"
            placeholder="Enter text here..."            
            rows="6"
          >
            <template #title>Your Text</template>
          </MaInput>          
          <MaInput
            v-model:value="excludedWords"
            type="textarea"            
            size="large"
            placeholder="Enter words to exclude (space-separated)..."
            hint-text="You may want to exclude 'is', 'a', 'an', 'the'."
            rows="3"
          >

            <template #title>Exclude Words</template>
          </MaInput>
          <div class="multi-select-container">
            <label>Select N-Grams to Generate:</label>
            <div class="checkbox-group">
              <div v-for="n in MAX_N_GRAMS_COUNT" :key="n">
                <input type="checkbox" :id="'ngram-' + n" :value="n" v-model="selectedNGrams" />
                <label :for="'ngram-' + n">{{ n }}-gram</label>
              </div>
            </div>
          </div>
          <button @click="generateNGrams" class="custom-button">Generate N-Grams</button>
        </div>
        <div v-if="Object.keys(nGrams).some(key => nGrams[key].length)" class="keywords-output">
          <div class="ma-header">
            <span>Generated Tags</span>
          </div>
          <div class="filter-container">
            <label>Filter by:</label>
            <div class="checkbox-group">
              <div v-for="(value, key) in sortedNGrams" :key="key">
                <input type="checkbox" :id="'filter-' + key" :value="key" v-model="selectedNGramFilters" />
                <label :for="'filter-' + key">{{ key }}</label>
              </div>
            </div>
          </div>
          <div v-for="key in sortedNGramFilters" :key="key">
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
import { ref, computed } from 'vue';
import { MaInput } from "@mobileaction/action-kit";
import "@mobileaction/action-kit/dist/style.css"

const inputValue = ref('');
const excludedWords = ref('');
const nGrams = ref({});
const selectedNGrams = ref([]);
const selectedNGramFilters = ref([]);
const MAX_N_GRAMS_COUNT = 10;

const generateNGrams = () => {
  const words = cleanText(inputValue.value).split(/\s+/);
  selectedNGrams.value.forEach(n => {
    nGrams.value[`${n}-grams`] = getNGrams(words, n);
  });
  selectedNGramFilters.value = selectedNGrams.value.map(n => `${n}-grams`);
};

const cleanText = (text) => {
  const unwantedWords = excludedWords.value.split(' ');
  return text
    .replace(/[^\w\s]|_/g, "")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .split(' ')
    .filter(word => !unwantedWords.includes(word))
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

const sortedNGramFilters = computed(() => {
  return selectedNGramFilters.value.sort((a, b) => {
    const aNum = parseInt(a.split('-')[0], 10);
    const bNum = parseInt(b.split('-')[0], 10);
    return aNum - bNum;
  });
});
const sortedNGrams = computed(() => {
  // Sort nGrams by key
  return Object.keys(nGrams.value)
    .sort((a, b) => {
      const aNum = parseInt(a.split('-')[0], 10);
      const bNum = parseInt(b.split('-')[0], 10);
      return aNum - bNum;
    })
    .reduce((sorted, key) => {
      sorted[key] = nGrams.value[key];
      return sorted;
    }, {});
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

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
}

.checkbox-group label {
  cursor: pointer;
}

.checkbox-group input[type="checkbox"] {
  margin-right: 0.5em;
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

.input-textarea {
  width: 100%;
  padding: 1em;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 1em;
  line-height: 1.6;
  resize: none;
  min-height: 6em;
  max-height: 50vh;
  overflow-y: auto;
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
  .input-textarea {
    padding: 0px;
  }
}
</style>