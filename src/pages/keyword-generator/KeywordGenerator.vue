<script setup>
</script>
<template>
  <div style="max-width: 800px; margin: 0 auto; padding: 40px; text-align: center; font-family: sans-serif;">
    <h1>N-Gram Creator</h1>
    <div style="display: flex; justify-content: center; gap: 30px; margin-bottom: 20px;">
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <p><strong>Message:</strong> {{ inputText }}</p>
        <input
            v-model="inputText"
            placeholder="n-gram me"
        />
      </div>
    </div>
    <button
        @click="generateNGrams"
        style="margin-bottom: 8px;"
    >
      Generate N-Grams...
    </button>

    <div
        v-for="(words, i) in resultGrams"
        :key="i"
        style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; padding: 6px 10px;"
    >
      <strong style="white-space: nowrap;">{{ i + 1 }}-Gram :</strong>
      <div>
          <span
              v-for="(word, j) in words"
              :key="j"
              style="justify-content: left;display: inline-block; padding: 6px 10px; margin: 4px;background-color: #f0f0f0;"
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
const resultGrams = ref([[]]);

function generateNGrams(){
  resultGrams.value = [];
  const window = [];
  let resultN = new Set();

  let cleanedText = cleanText(inputText.value)
  let wordCount = cleanedText.length;

  //sliding window
  for(let n=1;n<4;n++){
    for(let i=0;i < wordCount; i++){
      window.push(cleanedText[i]);
      if(window.length===n){
        resultN.add(window.join(' '));
        window.shift();
      }
    }
    resultGrams.value.push(Array.from(resultN));
    resultN.clear();
  }


  console.log(resultGrams);

  //clear the inputs
  inputText.value = "";
}

function cleanText(text){
  return text
      .toLowerCase()
      .replace(regex,'')
      .trim()
      .split(/\s+/);
}

</script>


<style>
* {
  color: v-bind(vueColor);
  border-radius: 6px;
}
</style>