<script setup>
import { ref, computed } from 'vue';
import {MaInput, MaButton, MaStep, MaSteps} from "@mobileaction/action-kit";
import "@/pages/keyword-generator/KeywordGenerator.vue"
import router from "@/router/index.js";
import {useTextStore} from "@/stores/useTextStore.js";

const activeStep = ref(2);
const store = useTextStore();
const totalCharacters = computed(() => store.userInputText.length);
const keywordsArray = ref([]);
const defaultText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
    "Phasellus aliquam eros ullamcorper orci tempor facilisis. In viverra tristique " +
    "eros, et vestibulum odio vestibulum non. Nullam tincidunt metus in accumsan " +
    "accumsan. Phasellus efficitur id neque ut malesuada. Phasellus volutpat eleifend " +
    "felis pellentesque posuere. Donec velit dui, suscipit eget condimentum vitae," +
    " mollis ultrices orci. Nam blandit turpis neque, ac hendrerit sem vehicula et. " +
    "Quisque et nisl lorem. Nunc in pulvinar sapien. Nam dignissim ipsum diam, at " +
    "efficitur libero maximus quis.";

const keywordDensity = (isDefault) => {
  let removedSpecialCharacters = store.userInputText.replace(/[^\w\s]/gi, '');
   if(isDefault) {
     store.userInputText = defaultText;
    removedSpecialCharacters = defaultText.replace(/[^\w\s]/gi, '');
  }
  if(!store.userInputText.length) {
    return;
  }
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

  totalCharacters.value = store.userInputText.length;
};

const resetValues = () => {
  store.userInputText = "";
  totalCharacters.value = 0;
  keywordsArray.value = null;
}

const copyClipboard = () => {
  const tableContent = keywordsArray.value.map(keyword => `${keyword.word} : ${keyword.count} time(s) : ${keyword.percentage}%`).join('\n');
  navigator.clipboard.writeText(tableContent);
};

const goToKeywordGenerator = () => {
  router.push('/keyword-generator');
}
const returnToHomePage = () => {
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
              v-model:value="store.userInputText"
              type="textarea"
              size="large"
              rows=5
              placeholder="Enter your text here..."
              class="w-full h-40 p-4 border rounded mb-4"
          ></MaInput>
          <div class="flex justify-between items-left mb-4">
            <MaButton class="w-full m-2" @click="keywordDensity(false)">Count</MaButton>
            <MaButton class="w-full m-2" @click="resetValues">Reset</MaButton>
            <MaButton class="w-full m-2" @click="keywordDensity(true)">Use Default Text</MaButton>
          </div>
          <h3 class="text-base text-gray-600 text-center">Total characters: {{ totalCharacters }}</h3>
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
    <div class="m-8 max-w-full">
      <MaSteps v-model:current="activeStep">
        <MaStep title="Step 1" description="Open Application" />
        <MaStep title="Step 2" description="Enter a text to generate associated keywords"/>
        <MaStep title="Step 3" description="Analyze keyword data"/>
      </MaSteps>
      <MaButton highlight class="mt-12 text-white px-4 py-2 rounded md:ml-16" @click="returnToHomePage">Return To Home Page</MaButton>
    </div>
  </div>
</template>