<script setup>
import { ref } from 'vue';
import { MaButton} from "@mobileaction/action-kit";
import { MaInput } from "@mobileaction/action-kit";
import { MaSelect } from "@mobileaction/action-kit";
import { MaBadge } from "@mobileaction/action-kit";
import { MaSteps, MaStep } from "@mobileaction/action-kit";
import router from "@/router/index.js";
import {useTextStore} from "@/stores/useTextStore.js";

const activeStep = ref(1);
const store = useTextStore()
const nGrams = ref([]);
const selectedNgrams = ref([]);
const options = [
  { label: '1-gram', value: 1 },
  { label: '2-gram', value: 2 },
  { label: '3-gram', value: 3 },
  { label: '4-gram', value: 4 },
  { label: '5-gram', value: 5 },
  { label: '6-gram', value: 6 },
  { label: '7-gram', value: 7 },
  { label: '8-gram', value: 8 },
  { label: '9-gram', value: 9 },
  { label: '10-gram', value: 10 },
];

const generateKeywordsForNValue = (text, n) => {
  const result = new Set();
  const removedSpecialCharacters = text.replace(/[^\w\s]/gi, '');
  const words = removedSpecialCharacters.split(" ");
  for (let i = 0; i <= words.length - n; i++) {
    const nGram = words.slice(i, i + n).join(' ');
    result.add(nGram);
  }
  return Array.from(result);
};

const removeUnwantedWords = (inputText) => {
  const unwantedWords = new Set(['a', 'an', 'the', 'is']);
  return inputText.split(' ').filter(word => !unwantedWords.has(word.toLowerCase())).join(' ');
};

const generateAllNGrams = (shouldRemoveCommonWords) => {
  const inputText = store.userInputText.trim();
  if (!inputText) return;
  const filteredText = shouldRemoveCommonWords ? removeUnwantedWords(inputText) : inputText;
  const generatedNGrams = selectedNgrams.value.map(n => ({
    n, keywords: generateKeywordsForNValue(filteredText, n) }))
      .filter(nGram => nGram.keywords.length);
  nGrams.value = generatedNGrams;
};

const goToKeywordDensity = () => {
  router.push('/keyword-density');
}

const returnToHomePage = () => {
  router.push('/');
}
</script>

<template>
  <MaButton highlight class="flex-1 justify-center m-8" @click="goToKeywordDensity" >Go to Keyword Density Calculator</MaButton>
  <div class="ma-keywords-generator">
    <h3 class=" ml-10 mt-2 text-2xl font-bold text-blue-700 ">Keyword Generator</h3>
    <div class="ma-body">
      <MaInput
          v-model:value="store.userInputText"
          type="textarea"
          placeholder="Enter a text to generate associated keywords."
          class = "m-4"
      ></MaInput>
      <div class="flex justify-between m-4 shadow-md rounded-lg">
        <MaSelect
            v-model:value="selectedNgrams"
            class="ma-select"
            size="large"
            placeholder="Select a nGram"
            :options="options"
            allow-clear
            option-filter-prop="label"
            show-search
            mode="multiselect"
            prefix-icon="search-normal"
            dropdown-match-select-width>
        </MaSelect>
        <MaButton class="flex-1 justify-center m-1" @click="generateAllNGrams(false)" icon="brain">Generate</MaButton>
        <MaButton class="flex-1 justify-center m-1" @click="generateAllNGrams(true)" icon="brain">Generate Without 'Is, A, An, The'</MaButton>
      </div>
    </div>
    <div class="font-sans bg-gradient-to-r from-white via-blue-100 to-white shadow-md rounded-lg m-4 p-4 max-w-full">
      <h3 class="mt-2 text-xl font-bold text-blue-700">Generated Keywords</h3>
      <div class="mt-3" v-for="nGram in nGrams" :key="nGram.n">
        <h4 class = "text-lg">{{ nGram.n }}-gram keywords:</h4>
        <div class="flex gap-2">
          <MaBadge
              v-for="keyword in nGram.keywords"
              :key="index"
              :variant="'dark'"
              :size="'large'"
              :type="'primary'"
          >{{ keyword }}</MaBadge>
        </div>
      </div>
    </div>
    <div class="m-8 max-w-full">
      <MaSteps v-model:current="activeStep">
        <MaStep title="Step 1" description="Open Application" />
        <MaStep title="Step 2" description="Enter a text to generate associated keywords"/>
        <MaStep title="Step 3" description="Analyze keyword data" disabled="disabled" />
      </MaSteps>
      <MaButton highlight class="mt-12 text-white px-4 py-2 rounded" @click="returnToHomePage">Return To Home Page</MaButton>
    </div>
  </div>
</template>

