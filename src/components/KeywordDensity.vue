<template>
  <div class="p-4">
    <div class="mb-4">
      <div class="mb-2 text-xl font-semibold">Keyword Density Calculator</div>
      <button @click="calculateKeywords" class="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Calculate Keywords
      </button>
    </div>
    <div v-if="showTable" class="mt-4">
      <div class="mb-2 text-lg font-semibold">Keyword Density Table</div>
      <table class="w-full border">
        <thead>
        <tr>
          <th class="border px-4 py-2">Keyword</th>
          <th class="border px-4 py-2">Count</th>
          <th class="border px-4 py-2">Percentage</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(keywords, count) in groupedKeywordCounts" :key="count">
          <td class="border px-4 py-2">{{ keywords.join(', ') }}</td>
          <td class="border px-4 py-2">{{ count }}</td>
          <td class="border px-4 py-2">{{ calculatePercentage(count) }}%</td>
        </tr>
        </tbody>
      </table>
      <button @click="copyToClipboard" class="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Copy Grouped Keywords to Clipboard
      </button>
    </div>
    <button @click="resetData" class="mt-2 bg-blue-500 hover:bg-red-400-600 text-white px-4 py-2 rounded">
      Reset Data
    </button>
    <div>
      <h1>Go to Homepage</h1>
      <router-link to="/">Go back to Keyword Generator</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const textInput = ref(localStorage.getItem('savedText') || '');
const showTable = ref(false);

const groupedKeywordCounts = computed(() => {
  const counts = {};
  const words = textInput.value.split(' ').map(word => word.toLowerCase().trim());

  words.forEach(word => {
    if (counts[word]) {
      counts[word].count++;
    } else {
      counts[word] = {
        count: 1,
        percentage: 0,
      };
    }
  });

  const groupedCounts = {};

  Object.keys(counts).forEach(keyword => {
    const count = counts[keyword].count;
    if (!groupedCounts[count]) {
      groupedCounts[count] = [];
    }
    groupedCounts[count].push(keyword);
  });

  return groupedCounts;
});

const calculatePercentage = count => {
  const totalWords = textInput.value.split(' ').length;
  return ((count / totalWords) * 100).toFixed(2);
};

const calculateKeywords = () => {
  showTable.value = true;
};

const resetData = () => {
  localStorage.removeItem('savedText');
  showTable.value = false;
  refreshPage();
};

const refreshPage = () => {
  window.location.reload();
};

const copyToClipboard = () => {
  const groupedKeywordsText = JSON.stringify(groupedKeywordCounts.value, null, 2);
  navigator.clipboard.writeText(groupedKeywordsText).then(() => {
    alert('Grouped keywords copied to clipboard!');
  });
};
</script>
