<template>
  <div class="ma-keywords-generator">
    <textarea v-model="inputText" placeholder="Please enter the text here"></textarea>
    <button @click="generateNGrams">Generate n-grams</button>
    <div class="generated-keywords">
      <div class="ngram-keywords" v-for="(keywords, i) in nGrams" :key="i">
        <h3>{{i+1}}-gram Keywords:</h3>
        <ul>
          <li v-for="keyword in keywords" :key="keyword">{{keyword}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {filterArr} from "@/cleanupResources";
  const inputText = ref('');
  const nValue =  ref(3);
  const nGrams = ref([]);

  const generateNGrams = () => {
    const allWords = inputText.value.split(' ');
    const filteredWords = allWords.filter((word) => !filterArr.includes(word.toLowerCase()));
    const cleanedWords = [...new Set(filteredWords)];

    nGrams.value = [];

    for (let i = 1; i <= nValue.value; ++i) {
      const keywords = [];
      for (let j = 0; j < cleanedWords.length - i + 1; ++j) {
        keywords.push(cleanedWords.slice(j, j + i).join(' '));
      }
      nGrams.value.push(keywords);
    }
};
</script>

<style scoped>
.ma-keywords-generator {
  max-width: 500px;
  margin: 0 auto;
}
textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
}
button {
  padding: 8px 16px;
}
.generated-keywords {
  margin-top: 16px;
}
.ngram-keywords {
  margin-top: 16px;
}
.ngram-keywords ul {
  list-style: none;
  padding: 0;
}
.ngram-keywords li {
  margin-bottom: 6px;
}
</style>


