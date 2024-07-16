<script setup>
import { ref } from 'vue';
import { MaInput, MaButton } from "@mobileaction/action-kit";
import "@/pages/keyword-generator/KeywordGenerator.vue"
import router from "@/router/index.js";

const text = ref('');
const totalCharacters = ref(0);
const keywordsArray = ref([]);

const keywordDensity = () => {
  const words = text.value.trim().toLowerCase().split(/\s+/);
  const wordCounts = words.reduce((counts, word) => { counts[word] = (counts[word] || 0) + 1;
    return counts; },{});

  keywordsArray.value = Object.entries(wordCounts)
      .map(([word, count]) => ({ word, count, percentage: ((count / words.length) * 100).toFixed(2),}))
      .sort((a, b) => b.count - a.count);
  totalCharacters.value = text.value.length;
};


const copyClipboard = () => {
  const tableContent = keywordsArray.value.map(keyword => `${keyword.word}, ${keyword.count}, ${keyword.percentage}`).join('\n');
  navigator.clipboard.writeText(tableContent);
};
const goToKeywordGenerator = () => {
  router.push('/');
}
</script>

<template>
  <h1 class="ml-4 mt-10 text-2xl font-bold text-blue-700 md:ml-20">Keyword Density Calculator</h1>
  <div class="max-w-4xl mx-auto mt-5 px-4">
    <div class="flex flex-col md:flex-row">
      <div class="w-full md:w-1/2">
        <div class="bg-gradient-to-r from-white via-blue-100 to-white shadow-md rounded-lg p-8">
          <MaInput
              v-model:value="text"
              type="textarea"
              size="large"
              rows=5
              placeholder="Enter your text here..."
              class="w-full h-40 p-4 border rounded mb-4"
          ></MaInput>
          <div class="flex justify-between items-center mb-4">
            <MaButton class="px-4 py-2 rounded" @click="keywordDensity">Count</MaButton>
            <h3 class="text-base text-gray-600">Total characters: {{ totalCharacters }}</h3>
          </div>
        </div>
      </div>
      <div class="w-full mt-4 md:mt-0 md:ml-4 md:w-1/2">
        <div class="bg-gradient-to-r from-white via-blue-100 to-white shadow-md rounded-lg p-8">
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white border-collapse border">
              <thead>
              <tr>
                <th class="py-2 px-4 border border-white bg-blue-700 text-white rounded-lg">Keyword</th>
                <th class="py-2 px-4 border border-white bg-blue-700 text-white rounded-lg">Count</th>
                <th class="py-2 px-4 border border-white bg-blue-700 text-white rounded-lg">Density</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="keyword in keywordsArray" :key="keyword.word">
                <td class="py-2 px-4 border border-gray-300">{{ keyword.word }}</td>
                <td class="py-2 px-4 border border-gray-300">{{ keyword.count }}</td>
                <td class="py-2 px-4 border border-gray-300">{{ keyword.percentage }}%</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-4">
            <MaButton class="text-white px-4 py-2 rounded" @click="copyClipboard">Copy to clipboard</MaButton>
          </div>
        </div>
      </div>
    </div>
  </div>
  <MaButton highlight class="ml-4 mt-10 text-white px-4 py-2 rounded md:ml-20" @click="goToKeywordGenerator">Go Back To Keyword Generator</MaButton>
</template>
