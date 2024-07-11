<script setup>
import { ref } from 'vue';
import { MaButton } from "@mobileaction/action-kit";
import { MaInput } from "@mobileaction/action-kit";
import { MaSelect } from "@mobileaction/action-kit";
import { MaBadge } from "@mobileaction/action-kit";

const nGrams = ref([]);
const text = ref('');
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
  const words = text.split(" ");
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
  const inputText = text.value.trim();
  if (!inputText) return;
  const filteredText = shouldRemoveCommonWords ? removeUnwantedWords(inputText) : inputText;
  const generatedNGrams = selectedNgrams.value.map(n => ({
    n, keywords: generateKeywordsForNValue(filteredText, n) }))
      .filter(nGram => nGram.keywords.length);
  nGrams.value = generatedNGrams;
};
</script>

<template>
  <div class="ma-keywords-generator">
    <h3 class="text-xl m-2">Keyword Generator</h3>
    <div class="ma-body">
      <MaInput
          v-model:value="text"
          type="textarea"
          placeholder="Enter a text to generate associated keywords."
      ></MaInput>
      <div class="flex justify-between m-1">
        <MaSelect
            v-model:value="selectedNgrams"
            class="ma-select"
            :options="options"
            size="small"
            allow-clear
            option-filter-prop="label"
            show-search
            mode="multiselect"
            dropdown-match-select-width>
          <template #prefixIcon>"N"</template>
        </MaSelect>
        <MaButton class="flex-1 justify-center m-1" @click="generateAllNGrams(false)" icon="brain">Generate</MaButton>
        <MaButton class="flex-1 justify-center m-1" @click="generateAllNGrams(true)" icon="brain">Generate Without 'Is, A, An, The'</MaButton>
      </div>
    </div>
    <div class="font-sans bg-[#cae3ff] mt-4 border border-black border-solid p-4 text-sm pl-2 rounded-md">
      <h3 class="text-xl">Generated Keywords</h3>
      <div v-for="nGram in nGrams" :key="nGram.n">
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
  </div>
</template>
