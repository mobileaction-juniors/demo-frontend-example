<template>
  <div class="container">
    <h1 class="title">N-Gram Creator</h1>

    <div class="input-group">
      <div class="input-column">
        <p><strong>Message:</strong> {{ inputText }}</p>
        <input v-model="inputText" placeholder="n-gram me" class="input-box" />
      </div>
    </div>

    <button @click="generateNGrams" class="generate-button">
      Generate N-Grams...
    </button>

    <div
        v-for="(words, i) in resultGrams"
        :key="i"
        class="ngram-row"
    >
      <strong class="ngram-title">{{ i + 1 }}-Gram :</strong>
      <div class="word-list">
        <span
            v-for="(word, j) in words"
            :key="j"
            class="word-tag"
        >
          {{ word }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {regex} from "@/cleanupResources.js";

const inputText = ref('');
const resultGrams = ref([]);
const MAX_N = 3;

function generateNGrams(){

  if (!inputText.value || inputText.value.trim() === '') {
    return;
  }

  resultGrams.value = [];
  let cleanedText = getCleanedWords(inputText.value)
  let wordCount = cleanedText.length;

  //sliding window
  for(let n=1; n<= MAX_N; n++){
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
      resultGrams.value.push(Array.from(resultN));
    }
  }
}

function getCleanedWords(text){
  return text
      .toLowerCase()
      .replace(regex,'')
      .trim()
      .split(/\s+/);
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

.input-group {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
}

.input-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.input-box {
  padding: 10px;
  font-size: 1em;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
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

.word-tag {
  padding: 6px 10px;
  background-color: #e0e0e0;
  border-radius: 4px;
  font-size: 0.95em;
}
</style>