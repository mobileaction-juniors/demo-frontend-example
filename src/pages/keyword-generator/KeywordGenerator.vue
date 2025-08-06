<template>
  <div class="container">
    <h1 class="title">N-Gram Creator</h1>

    <div class="input-group">
      <div class="input-column">
        <p><strong>Message:</strong> {{ inputText }}</p>
        <MaInput
            v-model:value="inputText"
            type="textarea"
            title="Input Title"
            size="large"
            placeholder="n-gram me"
            hintText="Write your text to create ngrams"
        />
      </div>
    </div>

    <MaCard class="ma-card" title="N-gram Selection" description="Choose n-gram types to generate (1-10)">
      <div class="ma-ngram-selection-container">
        <MaSelect
            allowClear
            showSearch = "false"
            checkboxPlacement="left"
            dropdownMatchSelectWidth
            mode="multiselect"
            multiSelectOptionType="toggle"
            optionFilterProp="label"
            optionItemRounded
            :options="generateNgramRange(MAX_N)"
            placeholder="Select option..."
            size="small"
            v-model:value="selectedNValues"
        >
        </MaSelect>
        <MaCheckboxCard
            v-model:checked="clearUnwantedSelected"
        >
            <template #title>Remove Stop Words</template>
        </MaCheckboxCard>
      </div>
    </MaCard>

    <button @click="generateNGrams" class="generate-button">
      Generate N-Grams...
    </button>

    <div
        v-for="(words, i) in resultGrams"
        :key="i"
        class="ngram-row"
    >
      <strong class="ngram-title">{{ words.label }} :</strong>
      <div class="word-list">
        <MaBadge
            v-for="(word, j) in words.value"
            :key="j"
            class="word-tag"
        >
          {{ word }}
        </MaBadge>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {cleanDescription, cleanUnwantedWords} from "@/utils/CleanDescription.js";
import { MaSelect as MaSelect, MaCard, MaCheckbox2Card as MaCheckboxCard, MaInput, MaBadge } from '@mobileaction/action-kit'

const MAX_N = 10;
const DEF_N = 3;

const inputText = ref('');
const resultGrams = ref([]);
const selectedNValues = ref(Array.from({ length: DEF_N }, (_, i) => i + 1));
const clearUnwantedSelected = ref(false);

function generateNgramRange(max = 10, start = 1) {
  return Array.from({ length: max - start + 1 }, (_, i) => {
    const value = i + start;
    return {
      label: `${value}-gram`,
      value: value
    };
  });
}

function generateNGrams(){

  if (!inputText.value || inputText.value.trim() === '') {
    return;
  }

  resultGrams.value = [];
  let cleanedText = cleanDescription(inputText.value).split(/\s+/);
  if(clearUnwantedSelected.value){
    cleanedText = cleanUnwantedWords(cleanedText);
  }

  let wordCount = cleanedText.length;

  const sorted = [...selectedNValues.value].sort((a, b) => a - b);
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