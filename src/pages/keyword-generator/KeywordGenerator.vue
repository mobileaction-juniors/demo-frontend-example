<template>
  <div class="container">
    <h1 class="title">N-Gram Creator</h1>

    <InputTextPlace v-model="inputText" />

    <NGramsControl
        :maxN="MAX_N"
        v-model:selectedNRange="selectedNRange"
        v-model:clearUnwantedSelected="clearUnwantedSelected"
    />

    <MaButton @click="generateNGrams" class="generate-button"
              variant="lighter" icon="glass-bulk">
      Generate N-Grams...
    </MaButton>

    <NGramsResult :results="resultGrams" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import {cleanDescription, cleanUnwantedWords} from "@/utils/CleanDescription.js";
import {MaNotification, MaButton} from '@mobileaction/action-kit'
import NGramsResult from "@/components/NGramsResult.vue";
import NGramsControl from "@/components/NGramsControl.vue";
import InputTextPlace from "@/components/InputTextPlace.vue";

const MAX_N = 10;
const DEF_N = 3;
const MIN_N = 1;

const inputText = ref('');
const resultGrams = ref([]);
const selectedNRange = ref([MIN_N,DEF_N]);
const clearUnwantedSelected = ref(false);

function generateNgramRange(max = MAX_N, start = MIN_N) {
  return Array.from({ length: max - start + 1 }, (_, i) => i + start);
}

function generateNGrams(){

  if (!inputText.value || inputText.value.trim() === '') {
    MaNotification.warning({"size":"large","variant":"filled",
      "title":"Empty message!",
      "description":"Your message is empty!",
      "type":"warning"
    })
    return;
  }

  resultGrams.value = [];
  let cleanedText = cleanDescription(inputText.value).split(/\s+/);
  if(clearUnwantedSelected.value){
    cleanedText = cleanUnwantedWords(cleanedText);
  }

  let wordCount = cleanedText.length;

  if(wordCount < selectedNRange.value[0]){
    MaNotification.warning({"size":"large","variant":"filled",
      "title":"Range fault!",
      "description":"Your range doesn't cover your input message!",
      "type":"warning"
    });
    return;
  }
  const sorted = generateNgramRange(selectedNRange.value[1],selectedNRange.value[0]);
  //sliding window
  for(let n of sorted){
    const window = [];
    let resultN = new Set();

    for(let i=0;i < wordCount; i++){
      window.push(cleanedText[i]);
      if(window.length===n){
        resultN.add(window.join(' '));
        window.shift();
      }
    }

    if(resultN.size > 0){
      resultGrams.value.push({
            label: `${n}-Gram`,
            value: Array.from(resultN)
          }
      );
    }
  }
}

</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  font-family: sans-serif;
  text-align: center;
}

.title {
  font-size: 2em;
  margin-bottom: 20px;
}

.generate-button {
  padding: 10px 20px;
  font-size: 1em;
  margin-bottom: 20px;
  cursor: pointer;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.generate-button:hover {
  background-color: #0056b3;
}

.ngram-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 10px 14px;
  background-color: #f9f9f9;
  border-radius: 6px;
}

.ngram-title {
  white-space: nowrap;
  font-weight: bold;
}

.word-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 8px;
}

.ma-ngram-selection-container{
  display: flex;
  justify-content: space-around;
  gap: 8px;
}

.ma-ngram-selection-container > * {
  flex: 1;
}

.ma-card{
  text-align: center;
  justify-content: space-around;
}

.ak-card__header{
  justify-self:center;
}

.word-tag {
  padding: 6px 10px;
  background-color: #0056b3;
  border-radius: 6px;
  font-size: 0.95em;
}
</style>