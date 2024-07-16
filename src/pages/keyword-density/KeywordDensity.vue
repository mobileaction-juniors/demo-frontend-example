<script setup>
import { ref } from 'vue';
import { MaInput, MaButton } from "@mobileaction/action-kit";
import "@/pages/keyword-generator/KeywordGenerator.vue"
import router from "@/router/index.js";
import {textStore} from "@/stores/textStore.js";
import {storeToRefs} from "pinia";

const store = textStore()
const text = storeToRefs((store)).userInputText;
const totalCharacters = ref(text.value.length);
const keywordsArray = ref([]);

const keywordDensity = () => {
  const removedSpecialCharacters = text.value.replace(/[^\w\s]/gi, '');
  const words = removedSpecialCharacters.trim().toLowerCase().split(/\s+/);
  const wordCount = words.length;
  const wordCountsArray = words.reduce((counts, word) => {
    counts[word] = (counts[word] || 0) + 1;
    return counts;
  }, {});

  const sameCountWords = {};
  for (const [word, count] of Object.entries(wordCountsArray)) {
    if (!sameCountWords[count]) {
      sameCountWords[count] = [];
    }
    sameCountWords[count].push(word);
  }

  keywordsArray.value = Object.entries(sameCountWords)
      .map(([count, words]) => {
        const joinedWords = words.join(', ');
        return { word: joinedWords, count: parseInt(count), percentage: ((parseInt(count) / wordCount) * 100).toFixed(2) };
      })
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
  <div class="max-w-8xl mx-auto mt-5 px-4">
    <div class="mr-5">
      <MaButton highlight class="ml-3 mt-3 text-white px-4 py-2 rounded md:ml-20" @click="goToKeywordGenerator">Go Back To Keyword Generator</MaButton>
    </div>
    <h1 class="ml-4 mt-10 text-2xl font-bold text-blue-700 md:ml-20">Keyword Density Calculator</h1>
    <div class="flex flex-col md:flex-row mt-5">
      <div class="w-full md:w-1/2 mb-4 md:mb-0">
        <div class="bg-gradient-to-r from-white via-blue-100 to-white shadow-md rounded-lg p-8 ml-5 mr-5">
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
      <div class="w-full md:w-1/2">
        <div class="bg-gradient-to-r from-white via-blue-100 to-white shadow-md rounded-lg p-8 ml-5 mr-5">
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white border-collapse border">
              <thead>
              <tr>
                <th class="py-2 px-4 border border-white bg-blue-700 text-white rounded-lg">Keyword</th>
                <th class="py-2 px-4 border border-white bg-blue-700 text-white rounded-lg">Count</th>
                <th class="py-2 px-4 border border-white bg-blue-700 text-white rounded-lg">Percentage</th>
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
</template>

