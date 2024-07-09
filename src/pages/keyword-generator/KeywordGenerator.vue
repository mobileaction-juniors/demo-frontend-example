<script setup>
import { ref, computed } from 'vue';
import { MaButton, MaSelect } from "@mobileaction/action-kit"
import "@mobileaction/action-kit/dist/style.css"
import { cleanDescription, filterUnwantedWords } from '../../utils/CleanDescription.js';

const message = ref('');
const selectedNgram = ref(1);

const ngramGenerate = (keywords, n) => {
  const res = new Set();

  //Finds all possible n-gram words
  for(let i = 0; i <= keywords.length - n; i++) {
    const ngram = keywords.slice(i, i+n).join(" ");
    // Add keyword to the list if it is not an empty string
    if(ngram.trim().length > 0) {
      res.add(ngram);
    }
  }
  return Array.from(res);
};

const singleWords = computed(() => {
    const inputText = message.value;

    // Replaces non-alphanumeric characters and multiple spaces with a single space
    const cleanedText = cleanDescription(message.value);

    // Splits the cleaned text into single words based on whitespace
    const keywords = cleanedText.split(/\s+/);

    const filteredKeywords = filterUnwantedWords(keywords);
    
    return filteredKeywords;
});

// Computed property to generate n-grams based on selected n value
const computedNgrams = computed(() => {
  return ngramGenerate(singleWords.value, Number(selectedNgram.value));
});
</script>

<template>
  <div class="flex bg-gray-100 justify-center">
    <div class="flex flex-col ml-2 mr-4">
      <div class="justify-center">
        <h1 class="text-4xl font-bold text-center text-indigo-600 mt-6">Keyword Generator</h1>
      </div>
      <div class="flex justify-end mb-1">
        <ma-select
          :options='[
            {"value":1,"label":"1-Gram"}, 
            {"value":2,"label":"2-Gram"}, 
            {"value":3,"label":"3-Gram"}, 
            {"value":4,"label":"4-Gram"}, 
            {"value":5,"label":"5-Gram"}, 
            {"value":6,"label":"6-Gram"}, 
            {"value":7,"label":"7-Gram"}, 
            {"value":8,"label":"8-Gram"}, 
            {"value":9,"label":"9-Gram"}, 
            {"value":10,"label":"10-Gram"}
          ]'
          size="small" v-model:value="selectedNgram" option-filter-prop="label" dropdown-match-select-width defaultActiveFirstOption>
        </ma-select>
      </div>
      <textarea class="borderborder-gray-300 rounded-md p-2 mb-4" v-model="message" id="keywordgen" name="keywordgen" rows="12" cols="80" placeholder="Type your description here..."></textarea>
    </div>
  </div>
  <div v-if="computedNgrams.length > 0" class="mt-4">
    <div class="flex text-3xl justify-center bg-indigo-100 font-bold p-1">Generated {{ selectedNgram }}-Gram Keywords</div>
    <div class="mb-5 text-center border-gray-300 rounded-md p-4 break-words w-full">
      <ul class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2">
        <li v-for="ngram in computedNgrams" :key="ngram" class="border rounded-md mt-1 p-1 bg-indigo-100">{{ ngram }}</li>
      </ul>
    </div>
  </div>
  <div v-else-if="selectedNgram !== '' && message != ''">
    <div class="flex text-lg justify-center text-red-500 mb-4 p-1">
      <span>Can't generate any {{ selectedNgram }}-Gram keywords. The word count you entered is not enough. Enter more words!</span>
    </div>
  </div>
</template>