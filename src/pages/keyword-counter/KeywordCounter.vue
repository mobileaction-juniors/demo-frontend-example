<template>
  <div class="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 p-4 w-full max-w-screen-xl mx-auto h-[34vh]">
    <!-- Left Column -->
    <div class="w-full md:w-1/2 flex flex-col space-y-4 h-full">
      <InputTextPlace v-model="inputText" class="flex-1"/>
      <div class="flex items-center justify-between">
        <MaButton @click="countNGrams"
                  class="generate-button"
                  variant="lighter"
                  icon="glass-bulk"
                  :highlight="highlightSubmit">
          Generate N-Grams...
        </MaButton>
        <p class="text-sm text-gray-500">
          Total characters: <span class="font-bold">{{ inputText.length }}</span>
        </p>

      </div>


    </div>



    <!-- Right Column -->
    <div class="w-full md:w-1/2 flex flex-col space-y-4 h-full">
      <MaCard class="flex-1 overflow-auto border border-gray-300">
        <table class="w-full border-collapse">
          <thead>
          <tr>
            <th v-for="header in headers" :key="header">{{ header }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(row, index) in resultGrams" :key="index">
            <td class="text-left w-1/2">{{ row.word }}</td>
            <td class="text-center w-1/4">{{ row.count }}</td>
            <td class="text-center w-1/4">{{ row.density }}%</td>
          </tr>
          </tbody>
        </table>
      </MaCard>
      <div class="flex items-center justify-between">

      </div>
      <MaButton @click="copyToClipboard"
                class="generate-button self-end"
                variant="lighter"
                icon="copy"
                :highlight="!highlightSubmit">
        Copy to clipboard
      </MaButton>
    </div>
  </div>
  <NGramsControl
      :maxN="MAX_N"
      v-model:selectedNRange="selectedNRange"
      v-model:clearUnwantedSelected="clearUnwantedSelected"
  />

</template>

<script setup>
import {ref, watch} from 'vue'
import {cleanDescription, cleanUnwantedWords} from "@/utils/CleanDescription.js";
import {MaButton, MaCard} from '@mobileaction/action-kit'
import NGramsControl from "@/components/NGramsControl.vue";
import InputTextPlace from "@/components/InputTextPlace.vue";
import {nthGram} from "@/utils/NGram.js";
import {giveNotification} from "@/utils/GiveNotification.js";

const headers = ref(['Keyword', 'Count', 'Density'])


const MAX_N = 10;
const DEF_N = 3;
const MIN_N = 1;

const inputText = ref('');
const submittedText = ref('');
const highlightSubmit = ref(false);
const resultGrams = ref([]);
const selectedNRange = ref([MIN_N,DEF_N]);
const clearUnwantedSelected = ref(false);

function generateNgramRange(max = MAX_N, start = MIN_N) {
  return Array.from({ length: max - start + 1 }, (_, i) => i + start);
}

function countNGrams(){
  if (!inputText.value || inputText.value.trim() === '') {

    giveNotification("Empty message!","Your message is empty!", "warning");
    return;
  }
  resultGrams.value = [];

  let cleanedText = cleanDescription(inputText.value).split(/\s+/);
  if(clearUnwantedSelected.value){
    cleanedText = cleanUnwantedWords(cleanedText);
  }
  let wordCount = cleanedText.length;

  if(wordCount < selectedNRange.value[0]){

    giveNotification("Range fault!","Your range doesn't cover your input message!","warning");
    return;
  }
  submittedText.value = inputText.value;
  highlightSubmit.value = false;

  const sorted = generateNgramRange(selectedNRange.value[1],selectedNRange.value[0]);
  //sliding window
  for(let n of sorted){
    const resultN = nthGram(n, wordCount, cleanedText);

    if(resultN.size > 0){
      for (const [ngram, count] of resultN.entries()) {
        resultGrams.value.push({
          word: ngram,
          count: count,
          density: count/wordCount *100
        });
      }
    }
  }
  resultGrams.value.sort((a, b) => b.count - a.count);
}

function copyToClipboard() {
  const text = resultGrams.value
      .map(item => `${item.word}: ${item.count} (${item.density.toFixed(2)}%)`)
      .join('\n');

  navigator.clipboard.writeText(text)
      .then(() => {
        giveNotification("Success", "Copied to Clipboard", "success")
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
}

watch(inputText, (newVal) => {
  if(newVal !== submittedText.value){
    highlightSubmit.value = true;
  }
})

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