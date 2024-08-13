<template>
    <div class="ma-keyword-counter">
      <div class="card">
        <div class="container">
          <div :class="{'input-output-container': true, 'center-content': !keywordStats.length}">
            <div class="input-container">
              <div class="ma-header">
                <span>Keyword Counter</span>
              </div>
              <ma-input
                v-model:value="userInput"
                type="textarea"
                size="large"
                :placeholder="placeholderText"
                rows="16"
              >
                <template #title>Your Text</template>
              </ma-input>
              <div class="char-count">
                Total characters: {{ charCount }}
              </div>
              <ma-input
                v-model:value="excludedWordsInputValue"
                type="textarea"
                size="large"
                placeholder="Enter words to exclude (space-separated)..."
                rows="1"
              >
                <template #title>Exclude Words</template>
              </ma-input>
              <index @click="countKeywords" class="custom-button">
                <span class="ml-2">Count</span>
                <ma-icon name="chevrons-right" size="md" />
              </index>
            </div>
            <div v-if="groupedKeywordStats.length" class="keywords-output">
              <div class="ma-header">
                <span>Keyword Count & Density</span>
              </div>
              <div class="table-container">
                <table class="min-w-full">
                  <thead>
                    <tr>
                      <th class="px-4 py-2">Keywords</th>
                      <th class="px-4 py-2">Count</th>
                      <th class="px-4 py-2">Density</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(group, index) in groupedKeywordStats" :key="index">
                      <td class="border px-4 py-2">{{ group.keywords.join(', ') }}</td>
                      <td class="border px-4 py-2">{{ group.count }}</td>
                      <td class="border px-4 py-2">{{ group.density }}%</td>
                    </tr>
                  </tbody>
                </table>
                <button @click="copyTable" class="copy-button">Copy to Clipboard</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { MaInput, MaIcon } from "@mobileaction/action-kit";

const userInput = ref('');
const excludedWordsInputValue = ref('');
const placeholderText = ref('Enter your text here...');
const keywordStats = ref([]);
const groupedKeywordStats = ref([]);

onBeforeMount(() => {
  userInput.value = localStorage.getItem('inputValue') || ''
});

const charCount = computed(() => userInput.value.length);

const countKeywords = () => {
  const words = cleanText(userInput.value).split(/\s+/);
  const totalWords = words.length;
  const keywordMap = {};

  words.forEach((word) => {
    keywordMap[word] = (keywordMap[word] || 0) + 1;
  });

  const keywordArray = Object.keys(keywordMap).map((keyword) => ({
    keyword,
    count: keywordMap[keyword],
    density: ((keywordMap[keyword] / totalWords) * 100).toFixed(1),
  }));

  groupAndSortKeywords(keywordArray);
};

const groupAndSortKeywords = (keywordArray) => {
  const groups = {};

  keywordArray.forEach((item) => {
    if (!groups[item.count]) {
      groups[item.count] = {
        count: item.count,
        keywords: [],
        density: 0,
      };
    }
    groups[item.count].keywords.push(item.keyword);
    groups[item.count].density += parseFloat(item.density);
  });

  groupedKeywordStats.value = Object.values(groups)
    .map((group) => {
      return {
        ...group,
        density: (group.density / group.keywords.length).toFixed(1),
      };
    })
    .sort((a, b) => b.density - a.density);
};

const cleanText = (text) => {
  const excludedWords = excludedWordsInputValue.value.split(' ').map(word => word.trim().toLowerCase());
  return text
    .replace(/[^\w\s]|_/g, "")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .split(' ')
    .filter(word => word && !excludedWords.includes(word))
    .join(' ');
};

const copyTable = () => {
  const table = document.querySelector('.table-container table');
  const rows = Array.from(table.querySelectorAll('tbody tr'))
    .map(row => Array.from(row.querySelectorAll('td'))
      .map(cell => cell.innerText)
      .join(' : ')
    )
    .join('\n');

  navigator.clipboard.writeText(rows)
    .then(() => console.log('Table copied to clipboard'))
    .catch(err => console.error('Failed to copy table: ', err));
};
</script>
  
<style scoped>
.ma-keyword-counter {
  @apply max-w-6xl mx-auto p-4 md:p-8;
}

.card {
  @apply bg-white rounded-2xl shadow-lg p-4 md:p-8;
}

.container {
  @apply flex flex-col gap-6 md:gap-12;
}

.input-output-container {
  @apply flex flex-col md:flex-row gap-4 md:gap-8 w-full;
  align-items: flex-start; /* Align at the top */
}

.input-container,
.keywords-output {
  @apply flex flex-col gap-4 w-full;
  flex: 1;
}

.keywords-output {
  @apply border-gray-200 max-h-[70vh] overflow-y-auto;
}

.ma-header {
  @apply text-center text-xl md:text-2xl font-semibold text-gray-800;
}

.custom-button {
  @apply bg-blue-600 text-white py-2 px-4 rounded-xl font-medium transition duration-300 hover:bg-blue-800 flex items-center justify-center;
}

.table-container {
  @apply w-full overflow-x-auto mt-6;
}

table {
  @apply w-full border-collapse;
}

th {
  @apply bg-gray-200 text-left font-medium;
}

td, th {
  @apply px-4 py-2 border;
}

/* Alternate row colors */
tbody tr:nth-child(odd) {
  @apply bg-white;
}

tbody tr:nth-child(even) {
  @apply bg-gray-100;
}

.char-count {
  @apply text-right text-xs text-gray-600 mt-0;
}

.copy-button {
  @apply bg-blue-600 text-white py-1 px-2 rounded-xl font-medium transition duration-300 hover:bg-blue-800 mt-4;
}
</style>