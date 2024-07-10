<script setup>
import { ref } from 'vue';

const nGrams = ref([]);
const text = ref('');
const maxNValue = 3;

const generateNGram = (keywords, n) => {
  const result = new Set();
  const words = keywords.split(" ");
  for (let i = 0; i <= words.length - n; i++) {
    const nGram = words.slice(i, i + n).join(' ');
    result.add(nGram);
  }
  return Array.from(result);
}

const generateNGrams = () => {
  nGrams.value = [];
  if (!text.value.trim()) { return; }
  for (let i = 1; i <= maxNValue; i++) {
    const nGramList = generateNGram(text.value, i);
    if (nGramList.length) {
      nGrams.value.push({ i, keywords: nGramList });
    }
  }
}
</script>

<template>
  <div class="ma-keywords-generator">
    <div class="ma-header">
      <h3>Keyword Generator</h3>
    </div>
    <div class="ma-body">
      <textarea v-model="text" placeholder="Enter a text here..." class="text-input"></textarea>
      <button class="generate-button" @click="generateNGrams">Generate</button>
    </div>
    <div class="display">
      <h3>Generated Keywords</h3>
      <div v-for="nGram in nGrams" :key="nGram.i">
        <h4> {{ nGram.i }}-gram keywords:</h4>
        <ul>
          <li v-for="(keyword, index) in nGram.keywords" :key="nGram.i+index">{{keyword}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ma-header {
  font-family: Arial;
  font-size: medium;
}

.display {
  font-family: Arial;
  background-color: #cae3ff;
  margin-top: 10px;
  border-style: groove;
  border-color: #000000;
  border-width: thin;
  font-size: small;
  padding-left: 10px;
  border-radius: 4px;
}

.ma-body {
  margin-top: 10px;
}

.text-input {
  font-family: Arial;
  background-color: #cae3ff;
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  border-style: groove;
  border-radius: 4px;
}

.generate-button {
  font-family: Arial;
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: #007BFF;
  border-radius: 4px;
  cursor: pointer;
}

.generate-button:hover {
  background-color: #0056b3;
}
</style>