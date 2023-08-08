<template>
  <div>
    <textarea v-model="textInput" placeholder="Enter your text"></textarea>
    <button @click="generateKey" >Generate Keywords</button>

    <div v-for="(keywords, index) in generatedKeywords" :key="index">
      <h3>{{ index }}-Gram Keywords:</h3>
      <ul>
        <li v-for="keyword in keywords" :key="keyword">{{ keyword }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const textInput = ref('');
const generatedKeywords = reactive({
  "1": [],
  "2": [],
  "3": [],
});

function generateKey() {
  //slice empty space
  const words = textInput.value.split(/\s+/);
  console.log(words);

  //generated words according to increased. I slice before space and I categorize 3 part according to number of words.
  for (let n = 1; n <= 3; n++) {
    const nGramKeywords = [];
    for (let i = 0; i <= words.length - n; i++) {
      const nGram = words.slice(i, i + n).join(" ");
      nGramKeywords.push(nGram);
    }
    generatedKeywords[n] = nGramKeywords;
  }
}
</script>
