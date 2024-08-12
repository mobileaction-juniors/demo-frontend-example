<template>
  <div class="ma-keywords-generator">
    <div class="card bg-white rounded-2xl shadow-lg p-8">
      <div class="container flex flex-col md:flex-row justify-center items-start gap-12">
        <div class="input-container flex flex-col gap-4 w-full">
          <div class="ma-header text-center text-2xl font-semibold text-gray-800">
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
          <div class="multi-select-container mt-4">
            <label class="block font-medium text-gray-700">Select N-Grams to Generate:</label>
            <ma-checkbox-group
              v-model:value="selectedNGrams"
              :options="nGramOptions"
              name="ngram-checkboxgroup"
              class="ma-my-checkbox-group"
            />
          </div>
          <index @click="generateNGrams" class="custom-button bg-blue-600 text-white py-2 px-4 rounded-xl font-medium transition duration-300 hover:bg-blue-800 flex items-center justify-center">
            <span class="ml-2">Generate N-Grams</span>
            <ma-icon name="chevrons-right" size="md" />            
          </index>
        </div>
        <div v-if="Object.keys(nGrams).some(key => nGrams[key].length)" class="keywords-output w-full border-gray-200 md:pl-4 max-h-[70vh] overflow-y-auto">
          <div class="ma-header text-center text-2xl font-semibold text-gray-800">
            <span>Generated Tags</span>
          </div>
          <div class="filter-container mt-4">
            <label class="block font-medium text-gray-700">Filter by:</label>
            <ma-checkbox-group
              v-model:value="selectedNGramFilters"
              :options="sortedNGramOptions"
              name="filter-checkboxgroup"
              class="ma-my-checkbox-group"
            />
          </div>
          <div v-for="key in selectedNGramFilters" :key="key" class="mt-4">
            <h4 class="font-semibold text-lg">{{ key }}</h4>
            <div class="tags-container flex flex-wrap gap-2 mt-2">
              <span v-for="(item, index) in nGrams[key]" :key="index" class="tag bg-teal-100 text-teal-800 px-3 py-1 rounded-xl text-sm">
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed} from 'vue';
import { MaInput, MaCheckboxGroup, MaIcon } from "@mobileaction/action-kit";

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
  selectedNGramFilters.value = selectedNGrams.value.map(n => n.toString());
};

</script>
<style>
.ma-keywords-generator {
  @apply max-w-6xl mx-auto p-8;
}
</style>