<script setup>
import { ref } from 'vue';
import { MaInput, MaButton } from "@mobileaction/action-kit";
import "@/pages/keyword-generator/KeywordGenerator.vue"

const text = ref('');
const totalCharacters = ref(0);
const keywordsArray = ref([]);

const keywordDensity = () => {
  const wordCounts = {};
  const words = text.value.trim().toLowerCase().split(/\s+/);
  words.forEach(word => {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  });

  keywordsArray.value = Object.entries(wordCounts).map(([word, count]) => ({
    word, count, percentage: ((count / words.length) * 100).toFixed(2)}))
      .sort((a, b) => b.count - a.count);

  totalCharacters.value = text.value.length;
};
</script>

<template>
  <h1 class="ml-20 mt-10 text-2xl font-bold text-blue-700">Keyword Density Calculator</h1>
  <div class="max-w-4xl mx-auto mt-5">
    <div class="flex">
      <div class="w-full">
        <div class="bg-gradient-to-r from-white via-blue-100 to-white shadow-md rounded-lg p-8">
          <MaInput
              v-model:value="text"
              type="textarea"
              size="large"
              rows= 5
              placeholder="Enter your text here..."
              class="w-full h-40 p-4 border rounded mb-4"
          ></MaInput>
          <div class=" flex justify-between items-center mb-4">
            <MaButton class="px-4 py-2 rounded " @click="keywordDensity">Count</MaButton>
            <h3 class="text-base text-gray-600">Total characters: {{ totalCharacters }}</h3>
          </div>
        </div>
      </div>
      <div class="flex-none w-full md:w-1/2 ml-4">
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
            <MaButton class="text-white px-4 py-2 rounded">Copy to clipboard</MaButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>